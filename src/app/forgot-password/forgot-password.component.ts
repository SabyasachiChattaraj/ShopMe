import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from './../common-model';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { DxFormComponent } from 'devextreme-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers:[LoginService]
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild("forgotPasswordForm") forgotPasswordForm: DxFormComponent;
  @ViewChild("passwordResetForm") passwordResetForm: DxFormComponent;
  @ViewChild("forgotUserNameForm") forgotUserNameForm: DxFormComponent;
  
  loadingVisible:boolean=false;
  resetPassword:boolean=false;
  forgotPasswordUserName:string="";

  constructor(private _loginService:LoginService,private _router: Router) {
    
   }
  ngOnInit() {
  }
  
  forgotPasswordButtonOptions: any = {
    text: "Forgot Password",
    type: "default",
    useSubmitBehavior: true,
    width:200
  };

  passwordResetButtonOptions: any = {
    text: "Reset Password",
    type: "default",
    useSubmitBehavior: true,
    width:200
  };

  forgotUserNameButtonOptions: any = {
    text: "Forgot User Name",
    type: "default",
    useSubmitBehavior: true,
    width:200
  };

  passwordResetUserNameOptions:any={
    value:this.forgotPasswordUserName
  };

  forgotPasswordUserNameOptions:any={
  };

  newPasswordBoxOptions:any={ mode: 'password' };
  mobileNoOptions:any={};
  
  passwordPattern:any=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  namePattern: any =/^[^0-9]+$/;
  emailPattern:any=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  maxDate: Date = new Date();

  onForgotPasswordFormSubmit=function(e){
    let forgotPasswordRequest:ForgotPasswordRequest=this.forgotPasswordForm.instance.option("formData");
    this.showLoader();
    this._loginService.forgotPassword(forgotPasswordRequest)
        .subscribe(
          (forgotPasswordResponse:ForgotPasswordResponse) => {
            if(forgotPasswordResponse.forgotPasswordResult.sdkHttpMetadata){
              if(forgotPasswordResponse.forgotPasswordResult.sdkHttpMetadata.httpStatusCode==200){
                this.forgotPasswordUserName=forgotPasswordRequest.userName;
                this.forgotPasswordForm.instance.resetValues();
                this.resetPassword=true;
                notify("Please check registered mail for the Access Code", "success", 800);
              }else{
                notify("Forgot Password error ", "error", 800);
              }
            }else{
              notify("Forgot Password error ", "error", 800);
            }
            
          },
          (error:HttpErrorResponse) =>{
            console.log(error);
            notify("Forgot Password error "+error.message, "error", 800);
          },
          ()=>{
            this.hideLoader();
          }
        );
    e.preventDefault();
  }

  onPasswordResetFormSubmit=function(e){
    let resetPasswordRequest:ResetPasswordRequest=this.passwordResetForm.instance.option("formData");
    this.showLoader();
    this._loginService.resetPassword(resetPasswordRequest)
        .subscribe(
          (resetPasswordResponse:ResetPasswordResponse) => {
            if(resetPasswordResponse.confirmForgotPasswordResult.sdkHttpMetadata){
              if(resetPasswordResponse.confirmForgotPasswordResult.sdkHttpMetadata.httpStatusCode==200){
                this.passwordResetForm.instance.resetValues();
                this._router.navigate(['/Login']); 
                notify("Please Login using new password", "success", 800);
              }else{
                notify("Reset Password error ", "error", 800);
              }
            }else{
              notify("Reset Password error ", "error", 800);
            }
            
          },
          (error:HttpErrorResponse) =>{
            console.log(error);
            notify("Reset Password error "+error.message, "error", 800);
          },
          ()=>{
            this.hideLoader();
          }
        );
    e.preventDefault();
  }

  onForgotUserNameFormSubmit=function(e){

  }


  showLoader(): void {
    this.loadingVisible = true;
  }
  hideLoader(): void {
    this.loadingVisible = false;
  }

  intializePasswordResetForm(component,element):void{
    component.updateData("userName",this.forgotPasswordUserName);
  }
}
