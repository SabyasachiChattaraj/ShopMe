import { DataStorageService } from './../data-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddToCartRequest, AddToCartResponse, User, IProduct } from './../common-model';
import { CartService } from './../cart.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  loadingVisible:boolean=false;
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
  constructor(private _cartService:CartService,private _router: Router, private _dataStorageService:DataStorageService) { }

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
    let loggedInUser:User=<User>this._dataStorageService.getLoggedInUser();
    if(loggedInUser!=null){
        let quantity:number=this.quantityNumberBox.instance.option("value");
        let loggedInUser:User=(<User>JSON.parse(localStorage.getItem("user")))
        let userId=loggedInUser.given_name+loggedInUser.family_name;
        let addToCartRequest:AddToCartRequest=new AddToCartRequest(userId,this.product.productId, quantity);
        this.showLoader();
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
            
    }else{
      this._router.navigate(["/Login"]);
    }      
  }

  showLoader(): void {
    this.loadingVisible = true;
  }
  hideLoader(): void {
    this.loadingVisible = false;
  }

  proceedToBuy():void{
    let loggedInUser:User=<User>this._dataStorageService.getLoggedInUser();
    if(loggedInUser!=null){
      let productTobeBought:IProduct[]=new Array<IProduct>();
      let quantity:number=this.quantityNumberBox.instance.option("value");
      let onlyProductTobeBought=this.product;
      onlyProductTobeBought.quantity=quantity;
      productTobeBought.push(onlyProductTobeBought);
      if(productTobeBought!=null&&productTobeBought!=undefined&&productTobeBought.length>0){
        this._dataStorageService.storeProductsToBought(productTobeBought);
        this._router.navigate(["/Order"]);
      }else{
        notify("Invalid Product !","error", 600);
      }
    }else{
      this._router.navigate(["/Login"]);
    }
    
  }
}
