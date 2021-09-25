import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilce } from './Model';

@Injectable({
  providedIn: 'root'
})
export class IlceService {

  baseUrl :string = "https://localhost:5001/";
  constructor(private http : HttpClient) { }

  getIlce() : Observable<Ilce[]>{
    return this.http.get<Ilce[]>(this.baseUrl+'ilce');
  }
}
