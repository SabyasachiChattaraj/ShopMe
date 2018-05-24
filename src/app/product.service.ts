
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IProduct, FetchProductRequest, FetchProductResponse } from './iproduct';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class ProductService {

  private _producturl='https://cors-anywhere.herokuapp.com/https://ufvhhtm3s5.execute-api.us-east-2.amazonaws.com/Stage';
  private readonly newProperty = this;

  constructor(private _http: HttpClient){}

  
  getProducts(): Observable<FetchProductResponse> {
    return this.searchProducts(" ");
 }

  searchProducts(category:string): Observable<FetchProductResponse> {
    let fetchProductRequest : FetchProductRequest=new FetchProductRequest();
    fetchProductRequest.category=category;
   
    


    return this._http.post<FetchProductResponse>(this._producturl,JSON.stringify(fetchProductRequest));
      
      
       
  }  

 
 /*
 getProducts(): IProduct[]{

    return [
      {
        productId: "1",
        productName: "Arrow Collar Shirt",
        productCategory: "Shirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Arrow"
      },
      {
        productId: "2",
        productName: "Pari Knee Level Skirt",
        productCategory: "Skirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Pari"
      },
      {
        productId: "3",
        productName: "Puma Running Shoes",
        productCategory: "Shoes",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Puma"
      },
      {
        productId: "4",
        productName: "Fasttrack Smart Watch",
        productCategory: "Watch",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Fasttrack"
      },
      {
        productId: "1",
        productName: "Arrow Collar Shirt",
        productCategory: "Shirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Arrow"
      },
      {
        productId: "2",
        productName: "Pari Knee Level Skirt",
        productCategory: "Skirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Pari"
      },
      {
        productId: "3",
        productName: "Puma Running Shoes",
        productCategory: "Shoes",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Puma"
      },
      {
        productId: "4",
        productName: "Fasttrack Smart Watch",
        productCategory: "Watch",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Fasttrack"
      },
      {
        productId: "1",
        productName: "Arrow Collar Shirt",
        productCategory: "Shirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Arrow"
      },
      {
        productId: "2",
        productName: "Pari Knee Level Skirt",
        productCategory: "Skirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Pari"
      },
      {
        productId: "3",
        productName: "Puma Running Shoes",
        productCategory: "Shoes",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Puma"
      },
      {
        productId: "4",
        productName: "Fasttrack Smart Watch",
        productCategory: "Watch",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Fasttrack"
      },
      {
        productId: "1",
        productName: "Arrow Collar Shirt",
        productCategory: "Shirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Arrow"
      },
      {
        productId: "2",
        productName: "Pari Knee Level Skirt",
        productCategory: "Skirt",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Pari"
      },
      {
        productId: "3",
        productName: "Puma Running Shoes",
        productCategory: "Shoes",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Puma"
      },
      {
        productId: "4",
        productName: "Fasttrack Smart Watch",
        productCategory: "Watch",
        productMrp: 1200.00,
        productDisc: 700.00,
        productPriceToShow: 1200.00,
        productImagePath: "http://placehold.it/300x200",
        quantity: 1,
        manufacturedBy: "Fasttrack"
      }
    ]

 }*/

}
