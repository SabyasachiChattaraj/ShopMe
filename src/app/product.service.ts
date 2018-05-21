import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { IProduct } from './iproduct';
@Injectable()
export class ProductService {

  private _producturl='app/products.json';
  constructor(private _http: Http){}

  /*
  getproducts(): Observable<IProduct[]> {
    return this._http.get(this._producturl)
    .map((response: Response) => <IProduct[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
 }*/

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

 }

}
