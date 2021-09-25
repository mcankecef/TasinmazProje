import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Kullanici } from './Model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string = "https://localhost:5001/kullanici/login";
  constructor(private http : HttpClient) { }

  postLogin(kullanici : Kullanici){
    return this.http.post<Kullanici>(this.baseUrl,kullanici)
    .pipe(map((res : Kullanici) =>{
    return res; }))
  }
  login(eMail:string, sifre:string ) {
    return this.http.post<Kullanici>(this.baseUrl, {eMail, sifre})
    .pipe(map((res : Kullanici) =>{
      return res; }))
}
}
