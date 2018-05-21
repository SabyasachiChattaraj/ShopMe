import { Component, OnInit } from '@angular/core';
import { DxFormModule} from 'devextreme-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User=null;
  user1 : User=null;
  constructor() { }

  ngOnInit() {
    this.user=new User();
    this.user.firstName="";
    this.user.lastName="";
    this.user.emailId="";
    this.user.mobileNo="";
    this.user.birthday="";
    this.user.address="";
    this.user1=new User();  
    this.user1.emailId="";
    this.user1.password="";
  }
  buttonOptions: any = {
    text: "Register",
    type: "success",
    useSubmitBehavior: true,
    width:200
}
loginButtonOptions: any = {
  text: "Login",
  type: "success",
  useSubmitBehavior: true,
  width:200
}
}
export class User {
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNo: string;
  birthday: string;
  address: string;
  password : string;
}


