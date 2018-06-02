import { AddToCartRequest, AddToCartResponse, FetchAllCartByUserRequest, FetchAllCartByUserResponse, DeleteCartByUserProductRequest, CartQuantityUpdateRequest, CartQuantityUpdateResponse } from './common-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CartService {
  private BASE_URL="http://shopmecartservices-env-1.rjk3iskpme.ap-south-1.elasticbeanstalk.com/api/cart";
  private readonly ADD_TO_CART_URL=this.BASE_URL+"/addtocart";
  private readonly FETCH_ALLCART_BYUSER_URL=this.BASE_URL+"/allcartbyuser";
  private readonly DELETECART_BYUSERPRODUCT_URL=this.BASE_URL+"/deleteitem";
  private readonly UPDATE_CARTQUANTITY_URL=this.BASE_URL+"/updatecart";

  constructor(private _http:HttpClient) { }

  addToCart(addToCartRequest:AddToCartRequest):Observable<AddToCartResponse>{
      return this._http.post<AddToCartResponse>(this.ADD_TO_CART_URL,addToCartRequest);
  }

  fetchAllCartByUser(fetchAllCartByUserRequest:FetchAllCartByUserRequest):Observable<FetchAllCartByUserResponse>{
      return this._http.post<FetchAllCartByUserResponse>(this.FETCH_ALLCART_BYUSER_URL,fetchAllCartByUserRequest);
  }

  deleteCartByUserProduct(deleteCartByUserProductRequest:DeleteCartByUserProductRequest):Observable<FetchAllCartByUserResponse>{
    return this._http.post<FetchAllCartByUserResponse>(this.DELETECART_BYUSERPRODUCT_URL,deleteCartByUserProductRequest);  
  }

  updateCartQuantity(cartQuantityUpdateRequest:CartQuantityUpdateRequest):Observable<CartQuantityUpdateResponse>{
    return this._http.post<FetchAllCartByUserResponse>(this.UPDATE_CARTQUANTITY_URL,cartQuantityUpdateRequest);  
  }

}
