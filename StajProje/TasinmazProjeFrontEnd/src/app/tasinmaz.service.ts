import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model, PageRequest, Pagination, PutTasinmaz, Tasinmaz, TasinmazGet } from './Model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasinmazService {

  baseUrl:string = "https://localhost:5001/";
  baseUrl2:string = "https://localhost:5001/";
  baseUrl3:string = "https://localhost:5001/tasinmaz/page/List"
  baseUrl4:string ="https://localhost:5001/tasinmaz/api/";
  model = new Model();

  constructor(private http : HttpClient) { }
  getTasinmazList(searchText:string,pagination:Pagination):Observable<PageRequest<Tasinmaz>>{
    return this.http.get<PageRequest<Tasinmaz>>(`${this.baseUrl+'tasinmaz/'+'page'}?searchText=${searchText}&&page=${pagination.page}&&pageSize=${pagination.pageSize}`);
  }

  getTasinmaz():Observable<TasinmazGet[]>{
    return this.http.get<TasinmazGet[]>(this.baseUrl + 'tasinmaz');
  }
  deleteTasinmaz(id:number){
    return this.http.delete<any>("https://localhost:5001/"+'tasinmaz/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postTasinmaz(tasinmaz : TasinmazGet){
    return this.http.post<TasinmazGet>("https://localhost:5001/tasinmaz",tasinmaz)
    .pipe(map((res : TasinmazGet) =>{
    return res; }))
  }
  updateTasinmaz(id:number,tasinmaz:TasinmazGet){
    return this.http.put<TasinmazGet>("https://localhost:5001/tasinmaz/"+id,tasinmaz)
    .pipe(map((res:TasinmazGet)=>{
      return res;
    }))
}
filterTasinmaz(searchTerm :string):Observable<TasinmazGet[]>{
  return this.http.get<TasinmazGet[]>(this.baseUrl4+searchTerm);
}
}
