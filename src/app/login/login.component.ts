import { UserLoginRequest, UserRegistrationRequest } from './../common-model';
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

  constructor(private _loginService:LoginService,private _router: Router) { }
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

  onLoginFormSubmit = function(e) {
    let userLoginRequest:UserLoginRequest=this.loginForm.instance.option("formData");
    this._loginService.getJWTToken(userLoginRequest)
        .subscribe(
          (response) => {
            let authorization=response.headers.get("authorization");
            console.log("response.headers ::::"+response.headers);
            localStorage.setItem("token",authorization);
            this._loginService.authenticateUser(userLoginRequest)
                .subscribe(
                  (userLoginResponse) => {
                    if(userLoginResponse.status=="success"){

                      this._loginService.fetchUserByEmailID(userLoginRequest.username)
                          .subscribe(
                              (user) =>{
                                localStorage.setItem("user",JSON.stringify(user));
                                this._router.navigate(['/Products']); 
                              },
                              (error) =>{
                                console.log(error);
                              },
                              ()=>{
                                
                          }); 
                    }else{
                      notify("Login Error : "+response.message, "error", 600);
                    }
                  },
                  (error) =>{
                    notify("Login Error : "+error, "error", 600);
                  },
                  ()=>{
                    
                  });  
          },
          (error) =>{
            console.log(error);
          },
          ()=>{
            
          });
    e.preventDefault();
  }  

  onRegistrationFormSubmit = function(e) {
    let userRegistrationRequest:UserRegistrationRequest=this.registrationForm.instance.option("formData");
    console.log(JSON.stringify(userRegistrationRequest));
    this._loginService.register(userRegistrationRequest)
        .subscribe(
          (response) => {
            if(response.status=="success"){
              notify("Successfully Registered. Please Login.", "success", 600);
              this.registrationForm.instance.resetValues();
            }else{
              notify(response.message, "error", 600);
            }
          },
          (error) =>{
            console.log(error);
            notify("Registration error", "error", 600);
          },
          ()=>{
            
          }
        );
    e.preventDefault();
  }  

}

