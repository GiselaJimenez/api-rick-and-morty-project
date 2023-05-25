import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APiService {

  results!: any[];

  constructor(private http: HttpClient) { }

  //API's url
  private UrlApi = 'https://rickandmortyapi.com/api'

  //this method is for get the data from the API
  public getData(option: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.UrlApi}/${option}/?page=${page}`)
  }

  //this method is for get the character details that uses the id of the character for getting the info.
  public getDetails(id: number) {
    return this.http.get<any>(`${this.UrlApi}/character/${id}`)
  }

  //method used for get all the episodes without pagination
  public getAllEpisodes(){
    //get all the episodes from the API and save them in different variables
    const page1 = this.http.get('https://rickandmortyapi.com/api/episode?page=1');
    const page2 = this.http.get('https://rickandmortyapi.com/api/episode?page=2');
    const page3 = this.http.get('https://rickandmortyapi.com/api/episode?page=3');

    //join them with fork join and then we save the results in eh variable "flatResults"
    return forkJoin([page1, page2, page3]).pipe(map((results: any[]) => {

      const flatResults = [
        ...results[0]['results'],
        ...results[1]['results'],
        ...results[2]['results'],
      ]

      //this function returns flatResults but with a new attribute "season"
      return flatResults.map((e) => {
        return { ...e, season: e['episode'].split("E")[0] };
      });
    }));
  }
}
