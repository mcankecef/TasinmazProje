import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, Kullanici, Pagination, PageRequest } from './Model';
import {debounceTime, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class KullaniciService {

  baseUrl:string = "https://localhost:5001/";
  baseUrl2:string = "https://localhost:5001/kullanici";
  baseUrl3:string = "https://localhost:5001/kullanici/list";
  baseUrl4:string = "https://localhost:5001/kullanici/page/list";
  model = new Model();

  constructor(private http : HttpClient) { }
  getKullaniciList(searchText:string,pagination:Pagination):Observable<PageRequest<Kullanici>>{
    return this.http.get<PageRequest<Kullanici>>(`${this.baseUrl}?searchText=${searchText}&&page=${pagination.page}&&pageSize=${pagination.pageSize}`);
  }
  login(value:any){
    return this.http.post(this.baseUrl2,value);
  }
  getKullanici() : Observable<Kullanici[]>{
   return this.http.get<Kullanici[]>(this.baseUrl + 'kullanici');
  }
  postKullanici(kullanici : Kullanici){
    return this.http.post<Kullanici>("https://localhost:5001/kullanici",kullanici)
    .pipe(map((res : Kullanici) =>{
    return res; }))
  }
  deleteKullanici(id :number){
    return this.http.delete<any>("https://localhost:5001/kullanici/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateKullanici(kullanici:Kullanici,id:number){
    return this.http.put<Kullanici>("https://localhost:5001/kullanici/"+id,kullanici)
    .pipe(map((res:Kullanici)=>{
      return res;
    }))
  }
  filterKullanici(searchTerm :string):Observable<Kullanici[]>{
    return this.http.get<Kullanici[]>(this.baseUrl+'kullanici/api/'+searchTerm);
  }

}
