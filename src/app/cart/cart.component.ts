import { Router } from '@angular/router';
import { FetchAllCartByUserRequest, FetchAllCartByUserResponse, AddToCartData, DeleteCartByUserProductRequest } from './../common-model';
import { Component, OnInit } from '@angular/core';
import {DxListModule,DxButtonModule, DxLoadPanelModule } from 'devextreme-angular';
import { CartService } from '../cart.service';
import { User } from '../common-model';
import notify from 'devextreme/ui/notify';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[CartService]
})
export class CartComponent implements OnInit {

  loadingVisible: boolean; 
  cartItems:AddToCartData[]=null; 

  constructor(private _cartService:CartService,private _router: Router) { }

  ngOnInit() {
    this.fetchAllCartByUser();
  }

  fetchAllCartByUser():void{
    let userid:string=(<User>JSON.parse(localStorage.getItem("user"))).userId.toString();
    let fetchAllCartByUserRequest:FetchAllCartByUserRequest=new FetchAllCartByUserRequest(userid);
    this.showLoader();
    this._cartService.fetchAllCartByUser(fetchAllCartByUserRequest)
    .subscribe(
        (response:FetchAllCartByUserResponse) => {
            if(response.code=="200"){
              this.cartItems=response.data;
            }else{
              notify("fetchAllCartByUser Error : "+response.message, "error", 600);
            }
        },
        (error:HttpErrorResponse)=>{
          notify("fetchAllCartByUser : "+error.message, "error", 600);
        },
        ()=>{
          this.hideLoader();
        }
    );  
  }

  deleteCartByUserProduct(productid):void{
    let userid:string=(<User>JSON.parse(localStorage.getItem("user"))).userId.toString();
    let deleteCartByUserProductRequest:DeleteCartByUserProductRequest=new DeleteCartByUserProductRequest(userid,productid);
    this._cartService.deleteCartByUserProduct(deleteCartByUserProductRequest)
    .subscribe(
        (response:FetchAllCartByUserResponse) => {
            if(response.code=="200"){
              this._router.navigate(['/Cart']);
            }else{
              notify("deleteCartByUserProduct Error : "+response.message, "error", 600);
            }
        },
        (error:HttpErrorResponse)=>{
          notify("deleteCartByUserProduct : "+error.message, "error", 600);
        },
        ()=>{
         
        }
    );  
  }


  showLoader(): void {
    this.loadingVisible = true;
  }
  hideLoader(): void {
    this.loadingVisible = false;
  }

   
}
