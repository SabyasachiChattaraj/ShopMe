import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../iproduct';
import { DxSelectBoxModule,DxNumberBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  sizeArray:any[]=[
    {"ID":"S","name":"Small"},
    {"ID":"M","name":"Medium"},
    {"ID":"L","name":"Large"},
    {"ID":"XL","name":"Extra Large"},
    {"ID":"XXL","name":"Extra Extra Large"}];
   
  colorArray:any[]=[
    {"ID":"R","name":"Red"},
    {"ID":"W","name":"White"},
    {"ID":"G","name":"Green"},
    {"ID":"B","name":"Blue"},
    {"ID":"Y","name":"Yellow"}];
  @Input()
  product:IProduct;
  constructor() { }

  ngOnInit() {
  }

}
