import { DataStorageService } from './../data-storage.service';
import { CartService } from './../cart.service';
import { DxSelectBoxModule } from 'devextreme-angular';
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
  loggedInUserName:string=null;
  loggedInUser:User=null;
  loggedInUserInitials:string=null;
  userMenu:any[]=[
      "My Profile",
       
      "My Orders"
    
  ];
  constructor(private _cartService:CartService,private _router:Router,private _dataStorageService:DataStorageService) { 
    
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
        this.loggedInUserName=this.loggedInUser.given_name +" "+this.loggedInUser.family_name;
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
