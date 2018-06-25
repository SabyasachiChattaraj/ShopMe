import { environment } from './../environments/environment';
import { AddToCartRequest, AddToCartResponse, FetchAllCartByUserRequest, FetchAllCartByUserResponse, DeleteCartByUserProductRequest, CartQuantityUpdateRequest, CartQuantityUpdateResponse } from './common-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CartService {
  private readonly CART_MGMT_URL=environment.CART_MGMT_URL;
  
  constructor(private _http:HttpClient) { }

  addToCart(addToCartRequest:AddToCartRequest):Observable<AddToCartResponse>{
      addToCartRequest.operationName="ADDTOCART";
      return this._http.post<AddToCartResponse>(this.CART_MGMT_URL,addToCartRequest);
  }

  fetchAllCartByUser(fetchAllCartByUserRequest:FetchAllCartByUserRequest):Observable<FetchAllCartByUserResponse>{
      fetchAllCartByUserRequest.operationName="ALLCARTSBYUSER";
      return this._http.post<FetchAllCartByUserResponse>(this.CART_MGMT_URL,fetchAllCartByUserRequest);
  }

  deleteCartByUserProduct(deleteCartByUserProductRequest:DeleteCartByUserProductRequest):Observable<FetchAllCartByUserResponse>{
    deleteCartByUserProductRequest.operationName="DELETECARTBYUSERANDPRODUCT";
    return this._http.post<FetchAllCartByUserResponse>(this.CART_MGMT_URL,deleteCartByUserProductRequest);  
  }

  updateCartQuantity(cartQuantityUpdateRequest:CartQuantityUpdateRequest):Observable<CartQuantityUpdateResponse>{
    cartQuantityUpdateRequest.operationName="UPDATECARTBYQUANTITY";
    return this._http.post<FetchAllCartByUserResponse>(this.CART_MGMT_URL,cartQuantityUpdateRequest);  
  }

}
