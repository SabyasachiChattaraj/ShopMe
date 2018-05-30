
import { User } from './../common-model';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'smapp-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  loggedInUser:User=null;
  loggedInUserInitials:string=null;
  constructor() { 
    
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
}
