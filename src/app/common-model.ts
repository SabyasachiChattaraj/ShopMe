export interface CommonModel {
}

export class UserLoginRequest {
    username: string;
    password: string;
    constructor(username:string,password:string){
        this.username=username;
        this.password=password;
    }
}

export class UserLoginResponse {
    message: string;
    status: string;
    constructor(message:string,status:string){
        this.message=message;
        this.status=status;
    }
}

export class UserRegistrationRequest {
    firstName: string;
    lasteName: string;
    dob: string;
    email: string;
    mobilenumber: string;
    password: string;
    address:string;
}

export class UserRegistrationResponse {
    message: string;
    status: string;
    constructor(message:string,status:string){
        this.message=message;
        this.status=status;
    }
}

export class User {
    userId: number;
    firstName: string;
    lasteName: string;
    dob: string;
    email: string;
    mobilenumber: string;
    password: string;
}

export class AddToCartRequest {
    userid: string;
    productid: string;
    quantity: number;
    constructor(userid:string,productid:string, quantity: number){
        this.userid=userid;
        this.productid=productid;
        this.quantity=quantity;
    }
  }

export class AddToCartResponse {
    code: string;
    message: string;
    data: AddToCartData;
  }
  
 export class AddToCartData {
    cartid: number;
    userid: string;
    productid: string;
    quantity: number;
  }  

  export class FetchAllCartByUserRequest {
    userid: string;
    constructor(userid: string){
        this.userid=userid;
    }
  }

  export class FetchAllCartByUserResponse {
    code: string;
    message: string;
    data: AddToCartData[];
  }
  
  export class DeleteCartByUserProductRequest {
    userid: string;
    productid: string;
    constructor(userid:string,productid:string){
        this.userid=userid;
        this.productid=productid;
    }
  }
