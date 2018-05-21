import { ProductService } from './../product.service';
import { IProduct } from './../iproduct';
import { Component, OnInit } from '@angular/core';
import {DxAutocompleteModule,DxButtonModule} from 'devextreme-angular';
@Component({
  selector: 'smapp-products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductService]
})
export class ProductsComponent implements OnInit {
  products:IProduct[];
  productsMaster:IProduct[];
  productCategories:string[];
  productCategoryUserInput:string;
  ngOnInit(){
    this.productsMaster=this._productService.getProducts();
    this.products=this.productsMaster;
    this.productCategories=Array.from(new Set(this.products.map((item: IProduct) => item.productCategory)));
  }
  constructor(private _productService:ProductService) {
  }

  searchProductBycategory():void{
    if(this.productCategoryUserInput=="")
      this.products=this.productsMaster;
    else  
      this.products=this.productsMaster.filter((item:IProduct)=>(item.productCategory==this.productCategoryUserInput));
  }

}

