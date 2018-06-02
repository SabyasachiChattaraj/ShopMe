import { Injectable } from '@angular/core';
import { IProduct, User } from './common-model';

@Injectable()
export class DataStorageService {

  
  private productsToBought:IProduct[];

  constructor() { }

  public storeProductsToBought(productsToBought:IProduct[]):void{
    this.productsToBought=productsToBought;
  }

  public retrieveProductsToBought():IProduct[]{
    return this.productsToBought;
  }

  public getLoggedInUser():User{
    let loggedInUser:User=(<User>JSON.parse(localStorage.getItem("user")));
    return loggedInUser;
  }

}
