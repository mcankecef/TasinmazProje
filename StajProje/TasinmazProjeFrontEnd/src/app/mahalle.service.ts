import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, Mahalle } from './Model';

@Injectable({
  providedIn: 'root'
})
export class MahalleService {

  baseUrl:string = "https://localhost:5001/";
  model = new Model();

  constructor(private http : HttpClient) { }

   getMahalle():Observable<Mahalle[]>{
    return this.http.get<Mahalle[]>(this.baseUrl + 'mahalle');
  }
}
