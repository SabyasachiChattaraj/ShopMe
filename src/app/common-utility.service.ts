import { Injectable } from '@angular/core';
import { User } from './common-model';

@Injectable()
export class CommonUtilityService {

  constructor() { }

  public getLoggedInUser():User{
    let loggedInUser:User=(<User>JSON.parse(localStorage.getItem("user")));
    return loggedInUser;
  }

  public getLoggedInUserId():string{
    let loggedInUser:User=this.getLoggedInUser();
    return loggedInUser.given_name+loggedInUser.family_name;
  }

  public isLoggedIn():boolean{
    return this.getLoggedInUser()==null?false:true;
  }
}
