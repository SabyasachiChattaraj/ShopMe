import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PlaceOrderRequest, PlaceOrderResponse } from './common-model';

@Injectable()
export class OrderService {

  private readonly PLACE_ORDER_URL="https://cors-anywhere.herokuapp.com/https://d2yanpnifh.execute-api.ap-south-1.amazonaws.com/prod/buyproducts";

  constructor(private _http:HttpClient) { }

  public placeOrder(placeOrderRequest:PlaceOrderRequest): Observable<PlaceOrderResponse> {
    return this._http.post<PlaceOrderResponse>(this.PLACE_ORDER_URL,JSON.stringify(placeOrderRequest));
  } 

}
