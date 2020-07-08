import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({
    'context-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductLinesService {

  productLinesUrl:string = 'http://localhost:1337/product-lines';

  constructor(private http: HttpClient) { }

  getProductLines():Observable<any[]>{
    console.log('getProductLines');
    return this.http.get<any[]>(this.productLinesUrl);

  }
}
