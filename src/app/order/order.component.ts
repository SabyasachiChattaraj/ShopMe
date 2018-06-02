import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from './../order.service';
import { IProduct, User, PlaceOrderRequest, PlaceOrderResponse } from './../common-model';
import { DataStorageService } from './../data-storage.service';
import { DxDataGridModule, DxListComponent } from 'devextreme-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[OrderService]
})
export class OrderComponent implements OnInit {
  isOrderPlaced:boolean=false;
  productsToBought:IProduct[];
  paymentOptions:string[]= ["COD","Bill Desk","Net Banking"];
  loggedInUser:User=null;
  @ViewChild("smPaymentModeListComponent") smPaymentModeListComponent: DxListComponent;
  loadingVisible:boolean=false;
  placedOrderId:number=-1;
  selectedPaymentOption:string="COD";
  constructor(private _dataStorageService:DataStorageService,private _orderService:OrderService,private _router: Router) {
    
   }

  ngOnInit() {
    this.loggedInUser=this._dataStorageService.getLoggedInUser();
    this.isOrderPlaced=false;
    this.productsToBought=this._dataStorageService.retrieveProductsToBought();
  }

  calculateAmount(rowData):string{
    return (parseFloat(rowData.quantity) * parseFloat(rowData.productPriceToShow)).toString();
  }

  calculateDeliveryCharge(e){
    if (e.summaryProcess == 'finalize') {
      e.totalValue = 50;
    }
  }

  placeOrder():void{
    let paymentMode=this.smPaymentModeListComponent.instance.option("selectedItems");
    this.selectedPaymentOption=paymentMode;
    if(paymentMode!=null){
      let productlist=this.productsToBought.map((eachProduct)=>{return eachProduct.productId;});
      let quantity=0;
      let amount=50;
      this.productsToBought.forEach((eachProduct)=>{
        quantity=quantity+eachProduct.quantity;
        amount=amount + (eachProduct.quantity*eachProduct.productPriceToShow);

      });      
      let placeOrderRequest:PlaceOrderRequest=new PlaceOrderRequest(productlist,quantity,amount.toString(),this.loggedInUser.given_name+this.loggedInUser.family_name,"BUYPRODUCTS");
      this.showLoader();
      this._orderService.placeOrder(placeOrderRequest)
        .subscribe(
          (placeOrderResponse:PlaceOrderResponse) => {
            if(placeOrderResponse.code=="200"){
              this.placedOrderId=placeOrderResponse.data.orderid;
              this.isOrderPlaced=true;
            }else{
              notify("Place Order Error ", "error", 800);
            }
          },
          (error:HttpErrorResponse) =>{
            console.log(error);
            notify("Place Order Error "+error.message, "error", 800);
          },
          ()=>{
            this.hideLoader();
            
          }
        );
    }else{
      notify("Currently we are accepting only COD Orders !","error", 600);
    }
  }

  showLoader(): void {
    this.loadingVisible = true;
  }
  hideLoader(): void {
    this.loadingVisible = false;
  }

  continueShopping():void{
    this._router.navigate(["/Products"]);
  }
}
