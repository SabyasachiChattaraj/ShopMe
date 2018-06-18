import { Observable } from 'rxjs/Observable';
import { ProductService } from './../product.service';
import { CommonUtilityService } from './../common-utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewOrderRequest, ViewOrderResponse, PlaceOrderData, IProduct } from './../common-model';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers:[OrderService,ProductService]
})
export class MyOrdersComponent implements OnInit {

  myOrders:PlaceOrderData[]=null;
  orderedProducts:IProduct[]=null;
  loadingVisible: boolean=false;
  pdLoadingVisible: boolean=false;
  constructor(private _orderService:OrderService, private _commonUtilityService:CommonUtilityService,private _productService:ProductService) { }

  ngOnInit() {
    this.viewMyOrders();
  }

  viewMyOrders():void{
    this.showLoader();
    let userid:string=this._commonUtilityService.getLoggedInUserId();
    let viewOrderRequest:ViewOrderRequest=new ViewOrderRequest(userid);
    this._orderService.viewUserOrders(viewOrderRequest)
        .subscribe(
            (response:ViewOrderResponse)=>{
                if(response.code=="200"){
                    this.myOrders=response.data;                   
                }else{
                  notify("View User Order Error "+response.message, "error", 800);
                }
            },
            (error:HttpErrorResponse)=>{
              notify("View User Order Error "+error.message, "error", 800);
            },
            ()=>{
              this.hideLoader(); 
            }
        );
  }

  loadProductDetails(e):void{
    this.showPDLoader();
    this.selectionChanged(e);
    let currentOrder:PlaceOrderData=e.key;      
    let observableBatch = [];
    currentOrder.productidlist.forEach(( eachProductId, key ) => {
      observableBatch.push( this._productService.getProduct(eachProductId) );
    });
    Observable.forkJoin(observableBatch)
          .subscribe(
            (data:any)=>{
              if(data){
                this.orderedProducts=data.map((eachData)=>{
                    return eachData.data[0];
                });
              }else{
                notify("Order Details Error ", "error", 800);
              }
            },
            (error:HttpErrorResponse)=>{
              notify("Order Details Error "+error.message, "error", 800);
            },
            ()=>{
              this.hidePDLoader();
            }
          );
  }

  selectionChanged(e) {
    e.component.collapseAll(-1);
    //e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  showLoader(): void {
    this.loadingVisible = true;
  }
  hideLoader(): void {
    this.loadingVisible = false;
  }

  showPDLoader(): void {
    this.pdLoadingVisible = true;
  }
  hidePDLoader(): void {
    this.pdLoadingVisible = false;
  }
}
