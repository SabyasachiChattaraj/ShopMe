import { CartService } from './../cart.service';

import { User, FetchAllCartByUserRequest, FetchAllCartByUserResponse } from './../common-model';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute,Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'smapp-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
  providers:[CartService]
})
export class HeaderComponentComponent implements OnInit {

  loggedInUser:User=null;
  loggedInUserInitials:string=null;
  constructor(private _cartService:CartService) { 
    
  }

  ngOnInit() {
    
    
  }

  reloadUserSection():boolean{
    let user:string=localStorage.getItem("user");
    if(user!="null"){
      this.loggedInUser=JSON.parse(localStorage.getItem("user"));
      this.loggedInUserInitials=this.loggedInUser.firstName.substr(0,1).toUpperCase()
      if(this.loggedInUser.lasteName!=null){
        this.loggedInUserInitials=this.loggedInUserInitials+this.loggedInUser.lasteName.substr(0,1).toUpperCase();
      }
      return true;
      
    }else{
      return false;
    }

  }

  getCartCount():number{
    let userid:string=(<User>JSON.parse(localStorage.getItem("user"))).userId.toString();
    let fetchAllCartByUserRequest:FetchAllCartByUserRequest=new FetchAllCartByUserRequest(userid);
    this._cartService.fetchAllCartByUser(fetchAllCartByUserRequest)
    .subscribe(
        (response:FetchAllCartByUserResponse) => {
            if(response.code=="200"){
              return response.data.length;
            }else{
              notify("getCartCount Error : "+response.message, "error", 600);
            }
        },
        (error:HttpErrorResponse)=>{
          notify("getCartCount : "+error.message, "error", 600);
        },
        ()=>{
          
        }
    );  
    return null;
  }
}
