import { HttpErrorResponse } from '@angular/common/http';
import { AddToCartRequest, AddToCartResponse, User } from './../common-model';
import { CartService } from './../cart.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IProduct } from '../iproduct';
import { DxSelectBoxModule,DxNumberBoxModule, DxNumberBoxComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers:[CartService]
})
export class ProductDetailComponent implements OnInit {
  
  @ViewChild("quantityNumberBox") quantityNumberBox: DxNumberBoxComponent;

  sizeArray: any[] = [
    { "ID": "S", "name": "Small" },
    { "ID": "M", "name": "Medium" },
    { "ID": "L", "name": "Large" },
    { "ID": "XL", "name": "Extra Large" },
    { "ID": "XXL", "name": "Extra Extra Large" }];

  colorArray: any[] = [
    { "ID": "R", "name": "Red" },
    { "ID": "W", "name": "White" },
    { "ID": "G", "name": "Green" },
    { "ID": "B", "name": "Blue" },
    { "ID": "Y", "name": "Yellow" }];

 
  @Input()
  product:IProduct;
  constructor(private _cartService:CartService,private _router: Router) { }

  ngOnInit() {
  }

  quantityIncrement(type:string):void{
    let currentValue:number=this.quantityNumberBox.instance.option("value");
    if(type=='+'){
      if(currentValue<5){
        this.quantityNumberBox.instance.option("value", currentValue+1);
      }
    }else{
      if(currentValue>0){
         this.quantityNumberBox.instance.option("value", currentValue-1);
      }
    }
  }

  addToCart():void{
    let quantity:number=this.quantityNumberBox.instance.option("value");
    let userid:string=(<User>JSON.parse(localStorage.getItem("user"))).userId.toString();
    let addToCartRequest:AddToCartRequest=new AddToCartRequest(userid,this.product.productId, quantity);
    
    this._cartService.addToCart(addToCartRequest)
        .subscribe(
            (response:AddToCartResponse) => {
                if(response.code=="200"){
                  this._router.navigate(['/Cart']); 
                }else{
                  notify("Add To Cart Error : "+response.message, "error", 600);
                }
            },
            (error:HttpErrorResponse)=>{
              notify("Add To Cart Error : "+error.message, "error", 600);
            },
            ()=>{
              
            }
        );  
  }
}
