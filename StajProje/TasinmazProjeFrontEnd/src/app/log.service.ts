import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log, Model, PageRequest, Pagination } from './Model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl:string = "https://localhost:5001/";
  baseUrl3:string = "https://localhost:5001/log/list";
  model = new Model();


  constructor(private http : HttpClient) {

  }
  getLog() : Observable<Log[]>{
    return this.http.get<Log[]>(this.baseUrl + 'log');
   }
   getLogList(searchText:string,pagination:Pagination):Observable<PageRequest<Log>>{
    return this.http.get<PageRequest<Log>>(`${this.baseUrl}?searchText=${searchText}&&page=${pagination.page}&&pageSize=${pagination.pageSize}`);
  }
  filterLog(searchTerm :string):Observable<Log[]>{
    return this.http.get<Log[]>(this.baseUrl+'log/api/'+searchTerm);
  }
}
