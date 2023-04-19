import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  private UrlApi = 'https://rickandmortyapi.com/api'

  public getData(option: string): Observable<any> {
    return this.http.get<any>(`${this.UrlApi}/${option}`)
  }
}
