import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DxButtonModule, DxScrollViewModule, DxFormModule, DxTileViewModule } from 'devextreme-angular';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxScrollViewModule, DxFormModule,DxTileViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
