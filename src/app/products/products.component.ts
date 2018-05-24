import { ProductService } from './../product.service';
import { IProduct } from './../iproduct';
import { Component, OnInit } from '@angular/core';
import { DxAutocompleteModule, DxButtonModule, DxLoadPanelModule } from 'devextreme-angular';
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
    this._productService.getProducts().subscribe(
      (data) => {
        this.productsMaster = data.data;
      },
      (err) => {
        console.error(err);
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
    if (this.productCategoryUserInput.trim().length > 0) {
      this.showLoader();
      this._productService.searchProducts(this.productCategoryUserInput.trim()).subscribe(
        (data) => {
          this.products = data.data;
        },
        (err) => {
          console.error(err);
        },
        () => {
          this.clearSelectedProduct();
          this.hideLoader();
        }
      );
    }
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

