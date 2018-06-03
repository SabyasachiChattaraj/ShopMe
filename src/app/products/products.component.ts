import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../product.service';
import { IProduct, FetchProductResponse } from './../common-model';
import { Component, OnInit } from '@angular/core';
import { DxAutocompleteModule, DxButtonModule, DxLoadPanelModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'smapp-products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  productsMaster: IProduct[];
  productCategories: string[];
  productCategoryUserInput: string;
  selectedProduct: IProduct;
  loadingVisible: boolean;
  
  ngOnInit() {
    this.fetchAllProducts();
  }
  constructor(private _productService: ProductService) {
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
                this.products = this.productsMaster;
                this.productCategories = this.getProductCategories();
                this.clearSelectedProduct();
                this.hideLoader();
              }
        );
  }

  searchProductBycategory(): void {
    
    this.showLoader();
    this._productService.searchProducts(this.productCategoryUserInput.trim())
        .subscribe(
            (fetchProductResponse:FetchProductResponse) => {
              this.products = fetchProductResponse.data;
            },
            (error:HttpErrorResponse) => {
              console.error(error);
              notify("Fetch Product Error : "+error.message, "error",10000);
            },
            () => {
              this.clearSelectedProduct();
              this.hideLoader();
            }
        );
    
  }

  getProductCategories():Array<string>{
    let productCategories:Array<string>=new Array<string>();
    if(this.products!=null &&this.products.length>0){
      productCategories=Array.from(new Set(this.products.map((item: IProduct) => item.productCategory)))
    }
    return productCategories;
  }

  clearSelectedProduct():void{
    this.selectedProduct = null;
  }

  onSelect(product: IProduct): void {
    this.selectedProduct = product;
  }

  showLoader(): void {
    this.loadingVisible = true;
  }
  hideLoader(): void {
    this.loadingVisible = false;
  }
}

