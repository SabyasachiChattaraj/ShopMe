import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent implements OnInit {

  @Input() isVisible:boolean=false;

  position:any;

  constructor() { }

  ngOnInit() {
  }

}
