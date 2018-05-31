import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DxButtonModule, DxScrollViewModule, DxFormModule, DxTileViewModule, DxAutocompleteModule, DxDropDownBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxLoadIndicatorModule, DxLoadPanelModule, DxFileUploaderModule, DxListModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { TokenInterceptor } from './jwttoken.interceptor';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
  { path: 'Products', component: ProductsComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Admin', component: ProductAdminComponent },
  { path: 'Cart', component: CartComponent },
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
    ProductAdminComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    DxScrollViewModule, DxFormModule,DxTileViewModule,DxAutocompleteModule,DxButtonModule,DxSelectBoxModule,DxNumberBoxModule,DxLoadPanelModule,DxFileUploaderModule,DxListModule,
    RouterModule.forRoot(appRoutes), HttpClientJsonpModule,HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
