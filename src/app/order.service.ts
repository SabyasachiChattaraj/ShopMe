import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PlaceOrderRequest, PlaceOrderResponse, ViewOrderRequest, ViewOrderResponse } from './common-model';

@Injectable()
export class OrderService {

  private readonly ORDER_MGMT_URL="https://d2yanpnifh.execute-api.ap-south-1.amazonaws.com/prod/buyproducts";
  
  constructor(private _http:HttpClient) { }

  public placeOrder(placeOrderRequest:PlaceOrderRequest): Observable<PlaceOrderResponse> {
    return this._http.post<PlaceOrderResponse>(this.ORDER_MGMT_URL,JSON.stringify(placeOrderRequest));
  } 

  public viewUserOrders(viewOrderRequest:ViewOrderRequest):Observable<ViewOrderResponse>{
    viewOrderRequest.operationName="ALLBUYDETAILSBYUSER"; 
    return this._http.post<ViewOrderResponse>(this.ORDER_MGMT_URL,JSON.stringify(viewOrderRequest));
  }

}
