import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model, Il, Mahalle } from './Model';

@Injectable({
  providedIn: 'root'
})
export class IlService {

  baseUrl : string = "https://localhost:5001/";
  model = new Model();
  constructor(private http :HttpClient) { }

  getIl() : Observable<Il[]>{
    return this.http.get<Il[]>(this.baseUrl + 'il');
  }
  getIlId(id:number):Observable<Il[]>{
    return this.http.get<Il[]>(this.baseUrl+'il'+id);
  }
  getIlceByIl(ilId:number){
    return this.http.get(this.baseUrl+'ilce/'+ilId)
  }
  getMahalleByIlce(ilceId:number){
    return this.http.get(this.baseUrl+'mahalle/'+ilceId)
  }
}
