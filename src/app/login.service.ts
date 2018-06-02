import { UserLoginRequest, UserLoginResponse, UserRegistrationRequest, UserRegistrationResponse, User, UserAuthorizationResponse, UserAuthorizationRequest } from './common-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class LoginService {
  private readonly USER_REGISTRATION_URL="https://j8et8no04b.execute-api.us-west-2.amazonaws.com/prod/adduser";
  private readonly USER_AUTHENTICATION_URL="https://j8et8no04b.execute-api.us-west-2.amazonaws.com/prod/userauthentication";
  private readonly USER_AUTHORIZATION_URL="https://j8et8no04b.execute-api.us-west-2.amazonaws.com/prod/userauthorization";

  constructor(private _http: HttpClient){}

  authenticateUser(userLoginRequest:UserLoginRequest): Observable<UserLoginResponse> {
    return this._http.post<UserLoginResponse>(this.USER_AUTHENTICATION_URL,JSON.stringify(userLoginRequest));
  } 
  
  authorizeUser(userAuthorizationRequest:UserAuthorizationRequest): Observable<UserAuthorizationResponse> {
    return this._http.post<UserAuthorizationResponse>(this.USER_AUTHORIZATION_URL,JSON.stringify(userAuthorizationRequest));
  } 

  registerUser(userRegistrationRequest:UserRegistrationRequest): Observable<UserRegistrationResponse> {
    return this._http.post<UserRegistrationResponse>(this.USER_REGISTRATION_URL,JSON.stringify(userRegistrationRequest));
  }  
}
