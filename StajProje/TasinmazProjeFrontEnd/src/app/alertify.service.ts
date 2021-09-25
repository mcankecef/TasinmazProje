import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  success(messsage:string){
    alertify.success(messsage);
  }
  error(message:string){
    alertify.error(message);
  }

  warning(message:string){
    alertify.warning(message);
  }
}
