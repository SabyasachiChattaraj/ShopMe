import { CommonUtilityService } from './common-utility.service';
import { AuthGuardService } from './auth-guard.service';
import { DataStorageService } from './data-storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DxButtonModule, DxScrollViewModule, DxFormModule, DxTileViewModule, DxAutocompleteModule, DxDropDownBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxLoadIndicatorModule, DxLoadPanelModule, DxFileUploaderModule, DxListModule, DxDataGridModule, DxMenuModule, DxBoxModule, DxPopupModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { TokenInterceptor } from './jwttoken.interceptor';
import { CartComponent } from './cart/cart.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { SmquantityComponent } from './smquantity/smquantity.component';
import { OrderComponent } from './order/order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const appRoutes: Routes = [
  { 
    path: 'Products', 
    component: ProductsComponent 
  },
  { 
    path: 'Login', 
    component: LoginComponent 
  },
  { 
    path: 'Admin', 
    component: ProductAdminComponent, 
    canActivate:[AuthGuardService]
  },
  { 
    path: 'Cart', 
    component: CartComponent,
    canActivate:[AuthGuardService] 
  },
  { 
    path: 'Order', 
    component: OrderComponent,
    canActivate:[AuthGuardService]
  },
  { 
    path: 'MyOrders', 
    component: MyOrdersComponent,
    canActivate:[AuthGuardService] 
  },
  { 
    path: 'Reset', 
    component: ForgotPasswordComponent
  },
  {
    path: '',
    redirectTo: '/Products',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: ProductsComponent 
  }
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
    CartComponent,
    GlobalLoaderComponent,
    SmquantityComponent,
    OrderComponent,
    MyOrdersComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    DxScrollViewModule, 
    DxFormModule,
    DxTileViewModule,
    DxAutocompleteModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxFileUploaderModule,
    DxListModule,
    DxDataGridModule,
    DxMenuModule,
    DxBoxModule,
    DxPopupModule,
    RouterModule.forRoot(appRoutes), 
    HttpClientModule
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },*/
    DataStorageService,
    AuthGuardService,
    CommonUtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
