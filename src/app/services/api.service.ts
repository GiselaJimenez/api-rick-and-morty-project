import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APiService {

  results!: any[];

  constructor(private http: HttpClient) { }

  private UrlApi = 'https://rickandmortyapi.com/api'

  public getData(option: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.UrlApi}/${option}/?page=${page}`)
  }

  public getDetails(id: number) {
    return this.http.get<any>(`${this.UrlApi}/character/${id}`)
  }

  public getAllEpisodes(){
    const page1 = this.http.get('https://rickandmortyapi.com/api/episode?page=1');
    const page2 = this.http.get('https://rickandmortyapi.com/api/episode?page=2');
    const page3 = this.http.get('https://rickandmortyapi.com/api/episode?page=3');

    forkJoin([page1, page2, page3]).subscribe((results: any[]) => {
      // Aquí podemos hacer algo con los resultados de los tres llamados
      console.log('Resultados:', results);

      this.results = [
        ...results[0]['results'],
        ...results[1]['results'],
        ...results[2]['results'],
      ]

      return this.results.map((e) => {
        return { ...e, season: e['episode'].split("E")[0] };
      });
    });
  }
}
