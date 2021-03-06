import { UserLoginRequest, UserLoginResponse, UserRegistrationRequest, UserRegistrationResponse, User, UserRegistrationConfirmationRequest, UserRegistrationConfirmationResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from './common-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable()
export class LoginService {
  private readonly USER_MGMT_URL=environment.USER_MGMT_URL;
 
  constructor(private _http: HttpClient){}

  registerUser(userRegistrationRequest:UserRegistrationRequest): Observable<UserRegistrationResponse> {
    userRegistrationRequest.action="sign_up";
    return this._http.post<UserRegistrationResponse>(this.USER_MGMT_URL,JSON.stringify(userRegistrationRequest));
  } 
  
  authenticateUser(userLoginRequest:UserLoginRequest): Observable<UserLoginResponse>{
    userLoginRequest.action="sign_in";
    return this._http.post<UserLoginResponse>(this.USER_MGMT_URL,JSON.stringify(userLoginRequest));
  }

  confirmRegistration(userRegistrationConfirmationRequest:UserRegistrationConfirmationRequest): Observable<UserRegistrationConfirmationResponse>{
    userRegistrationConfirmationRequest.action="confirm_sign_up";
    return this._http.post<UserRegistrationConfirmationResponse>(this.USER_MGMT_URL,JSON.stringify(userRegistrationConfirmationRequest));
  }

  forgotPassword(forgotPasswordRequest:ForgotPasswordRequest): Observable<ForgotPasswordResponse>{
    forgotPasswordRequest.action="forgot_password";
    return this._http.post<ForgotPasswordResponse>(this.USER_MGMT_URL,JSON.stringify(forgotPasswordRequest));
  }

  resetPassword(resetPasswordRequest:ResetPasswordRequest): Observable<ResetPasswordResponse>{
    resetPasswordRequest.action="reset_password";
    return this._http.post<ResetPasswordResponse>(this.USER_MGMT_URL,JSON.stringify(resetPasswordRequest));
  }
}
