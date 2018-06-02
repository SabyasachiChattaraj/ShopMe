import { CartService } from './../cart.service';

import { User, FetchAllCartByUserRequest, FetchAllCartByUserResponse, UserAttribute } from './../common-model';
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
    let isLoggedIn:boolean=false;
    
    if(user){
      this.loggedInUser=JSON.parse(user);
      if(this.loggedInUser !=null && typeof this.loggedInUser == "object"){
        this.loggedInUserInitials=this.loggedInUser.given_name.substr(0,1).toUpperCase()
        if(this.loggedInUser["family_name"]!=null){
          this.loggedInUserInitials=this.loggedInUserInitials+this.loggedInUser.family_name.substr(0,1).toUpperCase();
        }
        isLoggedIn=true;
      }  
    }
    return isLoggedIn;
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
