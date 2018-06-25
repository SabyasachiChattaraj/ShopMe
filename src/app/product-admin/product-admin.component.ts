import notify from 'devextreme/ui/notify';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct, FetchProductResponse } from './../common-model';
import { Component, OnInit } from '@angular/core';
import { DxFormModule,DxFileUploaderModule,DxDataGridModule,DxPopupModule} from 'devextreme-angular';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
  providers:[ProductService]
})
export class ProductAdminComponent implements OnInit {

  product:IProduct;
  loadingVisible:boolean=false;
  productsMaster:IProduct[];

  constructor(private _productService:ProductService) { }

  ngOnInit() {
    this.fetchAllProducts();
  }
  addProductButtonOptions: any = {
    text: "Add Product",
    type: "default",
    useSubmitBehavior: true,
    width:200
  }

  quantityEditorOptions:any={
    value:"1", 
    min:"1", 
    max:"5",
    showSpinButtons:"true"
  }

  fetchAllProducts():void{
    this.showLoader();
    this._productService.getProducts()
        .subscribe(
              (fetchProductResponse:FetchProductResponse) => {
                this.productsMaster = fetchProductResponse.data;
              },
              (error:HttpErrorResponse) => {
                console.error(error);
                notify("Fetch Product Error : "+error.message, "error",10000);
              },
              () => {
                this.hideLoader();
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
