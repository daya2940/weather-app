import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getData(cityName): Observable<any> {
    return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=34755c6c384ea156d82b9350f9e2b4cc`);
  }
}
