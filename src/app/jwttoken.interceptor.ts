
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth:string=localStorage.getItem('token');
    let header:any=null;
    if(auth!=null){
        header={
             Authorization: `${auth}`,
             'Content-Type': 'application/json'
           }
    }else{
        header={
        /*  Authorization: `${this.auth}`, */
            'Content-Type': 'application/json'
        }
    }


    request = request.clone({
      setHeaders: header
    });
    return next.handle(request);
  }
}