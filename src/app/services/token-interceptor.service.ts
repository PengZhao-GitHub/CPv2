import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  PASAPIToken = localStorage.getItem('PAS.API.Token');

  constructor() { }

  intercept(req, next) {
    
    console.log(req);
    console.log('TokenInterceptorService:', this.PASAPIToken);

    //Attached the API token for PAS API only 
    if (req.url.indexOf("5000") >= 0) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.PASAPIToken
        }
      })
      return next.handle(tokenizedReq);
    } else {
      return next.handle(req);
    }
  }

}
