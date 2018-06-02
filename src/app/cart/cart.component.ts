import { DataStorageService } from './../data-storage.service';
import { SmquantityComponent } from './../smquantity/smquantity.component';
import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchAllCartByUserRequest, FetchAllCartByUserResponse, AddToCartData, DeleteCartByUserProductRequest, FetchProductResponse, IProduct, CartQuantityUpdateRequest, CartQuantityUpdateResponse } from './../common-model';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import {DxListModule,DxButtonModule, DxLoadPanelModule, DxListComponent } from 'devextreme-angular';
import { CartService } from '../cart.service';
import { User } from '../common-model';
import notify from 'devextreme/ui/notify';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/forkJoin'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[CartService,ProductService]
})
export class CartComponent implements OnInit {

  loadingVisible: boolean; 
  cartItems:AddToCartData[]=null; 
  cartProducts:IProduct[]=null;
  cartProductsArray:IProduct[]=new Array();
  cartTotalItems:number=0;
  cartTotalPrice:number=0;
  @ViewChild("smCartListComponent") smCartListComponent: DxListComponent;

  constructor(private _cartService:CartService,private _router: Router,route:ActivatedRoute, private _productService:ProductService,private zone: NgZone,private _dataStorageService:DataStorageService) {
  
  }

  ngOnInit() {
    this.fetchAllCartByUser();
  }

  fetchAllCartByUser():void{
    let loggedInUser:User=(<User>JSON.parse(localStorage.getItem("user")));
    let userId=loggedInUser.given_name+loggedInUser.family_name;
    let fetchAllCartByUserRequest:FetchAllCartByUserRequest=new FetchAllCartByUserRequest(userId);
    this.showLoader();
    this._cartService.fetchAllCartByUser(fetchAllCartByUserRequest)
      .subscribe(
          (response:FetchAllCartByUserResponse) => {
              if(response.code=="200"){
                this.cartItems=response.data;
                
                let observableBatch = [];

                response.data.forEach(( cartItem, key ) => {
                  observableBatch.push( this._productService.getProduct(cartItem.productid) );
                });

               Observable.forkJoin(observableBatch)
               .subscribe(
                (data:any)=>{
                  this.cartProductsArray=data.map((eachData)=>{
                      return eachData.data[0];
                  });
                  let cartTotalItems:number=0;
                  let cartTotalPrice:number=0;
                  this.cartProductsArray.forEach((eachCartProduct)=>{
                    let cartItem=response.data.find((eachCartItem) => eachCartItem.productid === eachCartProduct.productId);
                    eachCartProduct.quantity=cartItem.quantity;
                    cartTotalItems=cartTotalItems+eachCartProduct.quantity;
                    cartTotalPrice=cartTotalPrice+eachCartProduct.productPriceToShow*eachCartProduct.quantity;
                  });
                  this.cartTotalItems=cartTotalItems;
                  this.cartTotalPrice=cartTotalPrice;
                },
                (error:HttpErrorResponse)=>{

                },
                ()=>{
                  this.cartProducts=this.cartProductsArray;
                  this.hideLoader();
                }
            );
                
                /*
                response.data.forEach((cartItem)=>{
                  this._productService.getProduct(cartItem.productid)
                      .subscribe(
                          (fetchProductResponse:FetchProductResponse)=>{
                            this.cartProductsArray.push(fetchProductResponse.data[0]);
                            let cartTotalItems:number=0;
                            let cartTotalPrice:number=0;
                            this.cartProductsArray.forEach((eachCartProduct)=>{
                              cartTotalItems=cartTotalItems+eachCartProduct.quantity;
                              cartTotalPrice=cartTotalPrice+eachCartProduct.productPriceToShow;
                            });
                            this.cartTotalItems=cartTotalItems;
                            this.cartTotalPrice=cartTotalPrice;
                          },
                          (error:HttpErrorResponse)=>{

                          },
                          ()=>{

                          }
                      );
                });*/
                //this.hideLoader();
              }else{
                notify("fetchAllCartByUser Error : "+response.message, "error", 600);
                this.hideLoader();
              }
          },
          (error:HttpErrorResponse)=>{
            notify("fetchAllCartByUser : "+error.message, "error", 600);
            this.hideLoader();
          },
          ()=>{
           
          }
      );  
  }

  deleteCartByUserProduct(productid):void{
    let loggedInUser:User=(<User>JSON.parse(localStorage.getItem("user")));
    let userId=loggedInUser.given_name+loggedInUser.family_name;
    let deleteCartByUserProductRequest:DeleteCartByUserProductRequest=new DeleteCartByUserProductRequest(userId,productid);
    this._cartService.deleteCartByUserProduct(deleteCartByUserProductRequest)
        .subscribe(
            (response:FetchAllCartByUserResponse) => {
                if(response.code=="200"){
                
                    this.fetchAllCartByUser();
                  
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
  
  quantityChange(event,quantity,productId):void {
    let loggedInUser:User=(<User>JSON.parse(localStorage.getItem("user")));
    let userId=loggedInUser.given_name+loggedInUser.family_name;
    let updateQuantity=event-quantity;
    console.log(updateQuantity);
    let cartQuantityUpdateRequest:CartQuantityUpdateRequest=new CartQuantityUpdateRequest(userId,productId,updateQuantity);
    this._cartService.updateCartQuantity(cartQuantityUpdateRequest)
        .subscribe(
            (response:CartQuantityUpdateResponse) => {
                if(response.code=="200"){  
                  this.fetchAllCartByUser();
                  
                }else{
                  notify("updateCartQuantity Error : "+response.message, "error", 600);
                }
            },
            (error:HttpErrorResponse)=>{
              notify("updateCartQuantity : "+error.message, "error", 600);
            },
            ()=>{
            
            }
        );  
  }

  proceedToBuy():void{
    let productTobeBought:IProduct[]=<IProduct[]>this.smCartListComponent.instance.option("selectedItems");
    if(productTobeBought!=null&&productTobeBought!=undefined&&productTobeBought.length>0){
      this._dataStorageService.storeProductsToBought(productTobeBought);
      this._router.navigate(["/Order"]);
    }else{
      notify("Please select atleast one item !","error", 600);
    }
  }
}
