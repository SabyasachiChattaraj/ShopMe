
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IProduct, FetchProductRequest, FetchProductResponse } from './common-model';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class ProductService {
  private readonly FETCH_PRODUCTS_URL='https://ufvhhtm3s5.execute-api.us-east-2.amazonaws.com/Stage';

  constructor(private _http: HttpClient){}
  
  getProduct(productId:string): Observable<FetchProductResponse> {
    let fetchProductRequest : FetchProductRequest=new FetchProductRequest("productId",productId);
    return this.fetchProducts(fetchProductRequest); 
  }

  getProducts(): Observable<FetchProductResponse> {
    let fetchProductRequest : FetchProductRequest=new FetchProductRequest("","");
    return this.fetchProducts(fetchProductRequest); 
  }

  searchProducts(category:string): Observable<FetchProductResponse> {
    let fetchProductRequest : FetchProductRequest=new FetchProductRequest("productCategory",category);
    return this.fetchProducts(fetchProductRequest); 
  }  

  fetchProducts(fetchProductRequest:FetchProductRequest): Observable<FetchProductResponse> {
    return this._http.post<FetchProductResponse>(this.FETCH_PRODUCTS_URL,JSON.stringify(fetchProductRequest));  
  }
}
