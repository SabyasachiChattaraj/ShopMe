import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DxNumberBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'smappquantity',
  templateUrl: './smquantity.component.html',
  styleUrls: ['./smquantity.component.css']
})
export class SmquantityComponent implements OnInit {

  @ViewChild("smQuantityNumberBox") quantityNumberBox: DxNumberBoxComponent;
  constructor() { }

  @Input()
  currentValue:number=0;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
  }

  quantityIncrement(type:string,e):void{
    e.event.preventDefault();
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
    this.valueChange.emit(this.quantityNumberBox.instance.option("value"));
  }

}
