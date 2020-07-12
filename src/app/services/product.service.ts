import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string = 'http://localhost:5000/pas/api';
  productapi:string = '/product/';
  quoteapi:string = '/quote';

  constructor(private http: HttpClient) { }

  getProduct(product_id):Observable<any[]>{
    console.log(product_id);
    return this.http.get<any[]>(`${this.baseUrl}${this.productapi}${product_id}`);
  }

  getQuote(selectedCoverage):Observable<any[]>{
    console.log("params", selectedCoverage);
    return this.http.get<any[]>(`${this.baseUrl}${this.quoteapi}`);
  }

}
