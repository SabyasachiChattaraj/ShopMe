import { UserLoginRequest, UserLoginResponse, UserRegistrationRequest, UserRegistrationResponse, User } from './common-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class LoginService {
  private MAIN_URL:string="http://shopmeusermanagement-env.sfpdaj6rws.us-west-2.elasticbeanstalk.com";
  private readonly GET_JWTTOKEN_URL:string=this.MAIN_URL+"/login";
  private readonly USER_AUTH_URL:string=this.MAIN_URL+"/shopme/loginAuth";
  private readonly USER_REGISTER_URL:string=this.MAIN_URL+"/shopme/register";
  private readonly FETCH_USER_BY_EMAIL_URL:string=this.MAIN_URL+"/shopme/fetchUserByEmail/";


  constructor(private _http: HttpClient){}

  getJWTToken(userLoginRequest:UserLoginRequest): Observable<HttpResponse<Object>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let options = {
      headers: headers,
      observe: "response" as 'body'
    };
    return this._http.post<HttpResponse<Object>>(this.GET_JWTTOKEN_URL,JSON.stringify(userLoginRequest),options);
  }  

  authenticateUser(userLoginRequest:UserLoginRequest): Observable<UserLoginResponse> {
    return this._http.post<UserLoginResponse>(this.USER_AUTH_URL,JSON.stringify(userLoginRequest));
  } 
  
  fetchUserByEmailID(emailID:string): Observable<User> {
    return this._http.get<User>(this.FETCH_USER_BY_EMAIL_URL+emailID);
  } 

  register(userRegistrationRequest:UserRegistrationRequest): Observable<UserRegistrationResponse> {
    return this._http.post<UserRegistrationResponse>(this.USER_REGISTER_URL,JSON.stringify(userRegistrationRequest));
  }  
}
