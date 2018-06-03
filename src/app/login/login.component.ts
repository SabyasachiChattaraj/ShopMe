import { HttpErrorResponse } from '@angular/common/http';
import { UserLoginRequest, UserRegistrationRequest, UserLoginResponse, UserAuthorizationRequest, UserAuthorizationResponse, User, UserRegistrationResponse } from './../common-model';
import { LoginService } from './../login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormModule, DxFormComponent, DxNumberBoxComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm") loginForm: DxFormComponent;
  @ViewChild("registrationForm") registrationForm: DxFormComponent;
  loadingVisible:boolean=false;
  constructor(private _loginService:LoginService,private _router: Router) {
    this.maxDate = new Date(this.maxDate.setFullYear(this.maxDate.getFullYear() - 18));
   }
  ngOnInit() {
    localStorage.setItem("token",null);
    localStorage.setItem("user",null);
  }
  
  registerButtonOptions: any = {
    text: "Register",
    type: "default",
    useSubmitBehavior: true,
    width:200
  };

  loginButtonOptions: any = {
    text: "Login",
    type: "default",
    useSubmitBehavior: true,
    width:200
  };

  termsCheckboxOptions:any={ 
    text: 'I agree to the Terms and Conditions',
    value: false
  };

  passwordBoxOptions:any={ mode: 'password' };
  mobileNoOptions:any={};
  
  passwordPattern:any=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  namePattern: any =/^[^0-9]+$/;
  emailPattern:any=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  maxDate: Date = new Date();

  onLoginFormSubmit = function(e) {
    let userLoginRequest:UserLoginRequest=this.loginForm.instance.option("formData");
    this.showLoader();
    this._loginService.authenticateUser(userLoginRequest)
        .subscribe(
          (userLoginResponse:UserLoginResponse) => {
            if(userLoginResponse.statusCode==200){
              let authorization=userLoginResponse.adminInitiateAuthResult.authenticationResult.accessToken;
              console.log("authorization ::::"+authorization);
              localStorage.setItem("token",authorization);  
              let userAuthorizationRequest:UserAuthorizationRequest=new UserAuthorizationRequest(authorization);
              this._loginService.authorizeUser(userAuthorizationRequest)
                  .subscribe(
                      (userAuthorizationResponse:UserAuthorizationResponse) =>{
                        let loggedInUser:User = <User>userAuthorizationResponse.getUserResult.userAttributes.reduce(function( map, record, index ) {
                          map[ record.name ] = record.value;
                          return map;
                        }, {});
                       localStorage.setItem("user",JSON.stringify(loggedInUser));
                        this._router.navigate(['/Products']); 
                        notify("Successfully Logged In!", "success", 800);
                      },
                      (error:HttpErrorResponse) =>{
                        console.log(error);
                        notify("Login Error : "+error.message, "error",10000);
                        this.hideLoader();
                      },
                      ()=>{
                        
                      }
                  ); 
            }else{
              notify("Login Error : "+userLoginResponse.errorMessage, "error",10000);
              this.hideLoader();
            }
          },
          (error:HttpErrorResponse) =>{
            notify("Login Error : "+error.message, "error");
            this.hideLoader();
          },
          ()=>{
    
          }
        );  
    e.preventDefault();
  }  

  onRegistrationFormSubmit = function(e) {
    let userRegistrationRequest:UserRegistrationRequest=this.registrationForm.instance.option("formData");
    this.showLoader();
    userRegistrationRequest.dob= this.convertDate(userRegistrationRequest.dob);
    this._loginService.registerUser(userRegistrationRequest)
        .subscribe(
          (userRegistrationResponse:UserRegistrationResponse) => {
            if(userRegistrationResponse.sdkHttpMetadata){
              if(userRegistrationResponse.sdkHttpMetadata.httpStatusCode==200){
                notify("Successfully Registered. Please Login.", "success", 800);
                this.registrationForm.instance.resetValues();
              }else{
                notify("Registration error ", "error", 800);
              }
            }else{
              notify("Registration error ", "error", 800);
            }
            
          },
          (error:HttpErrorResponse) =>{
            console.log(error);
            notify("Registration error "+error.message, "error", 800);
          },
          ()=>{
            this.hideLoader();
          }
        );
    e.preventDefault();
  }  


  showLoader(): void {
    this.loadingVisible = true;
  }
  hideLoader(): void {
    this.loadingVisible = false;
  }

  convertDate(dateTobeConverted:string):string{
      let d = new Date(dateTobeConverted);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [day,month,year].join('/');
  }
}
