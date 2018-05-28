import { IProduct } from './../iproduct';
import { Component, OnInit } from '@angular/core';
import { DxFormModule,DxFileUploaderModule} from 'devextreme-angular';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  product:IProduct;

  constructor() { }

  ngOnInit() {
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

}
