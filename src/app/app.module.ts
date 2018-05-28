import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DxButtonModule, DxScrollViewModule, DxFormModule, DxTileViewModule, DxAutocompleteModule, DxDropDownBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxLoadIndicatorModule, DxLoadPanelModule, DxFileUploaderModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ProductAdminComponent } from './product-admin/product-admin.component';

const appRoutes: Routes = [
  { path: 'Products', component: ProductsComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Admin', component: ProductAdminComponent },
  { path: '',
  redirectTo: '/Products',
  pathMatch: 'full'
},
{ path: '**', component: ProductsComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    ProductsComponent,
    LoginComponent,
    ProductDetailComponent,
    ProductAdminComponent
  ],
  imports: [
    BrowserModule,
    DxScrollViewModule, DxFormModule,DxTileViewModule,DxAutocompleteModule,DxButtonModule,DxSelectBoxModule,DxNumberBoxModule,DxLoadPanelModule,DxFileUploaderModule,
    RouterModule.forRoot(appRoutes), HttpClientJsonpModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
