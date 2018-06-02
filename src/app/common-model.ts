

export interface CommonModel {
}

/* Login */
export class UserLoginRequest {
    userName: string;
    password: string;
    constructor(userName:string,password:string){
        this.userName=userName;
        this.password=password;
    }
}

export interface SdkResponseMetadata {
    requestId: string;
}

export interface HttpHeaders {
    Connection: string;
/*     Content-Length: string;
    Content-Type: string;
    Date: string;
    x-amzn-RequestId: string; */
}

export interface SdkHttpMetadata {
    httpHeaders: HttpHeaders;
    httpStatusCode: number;
}

export interface ChallengeParameters {
}

export interface AuthenticationResult {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
    refreshToken: string;
    idToken: string;
}

export interface AdminInitiateAuthResult {
    sdkResponseMetadata: SdkResponseMetadata;
    sdkHttpMetadata: SdkHttpMetadata;
    challengeParameters: ChallengeParameters;
    authenticationResult: AuthenticationResult;
}

export interface UserLoginResponse {
    statusCode: number;
    errorMessage: string;
    adminInitiateAuthResult: AdminInitiateAuthResult;
}


export class UserAuthorizationRequest {
    accessToken: string;
    constructor(accessToken:string){
        this.accessToken=accessToken;
    }
}



    export interface SdkResponseMetadata {
        requestId: string;
    }



    export interface UserAttribute {
        name: string;
        value: string;
    }

    export interface GetUserResult {
        sdkResponseMetadata: SdkResponseMetadata;
        sdkHttpMetadata: SdkHttpMetadata;
        username: string;
        userAttributes: UserAttribute[];
    }

    export interface UserAuthorizationResponse {
        statusCode: number;
        errorMessage: string;
        getUserResult: GetUserResult;
    }
    export class User {
        userId: number;
        family_name: string;
        given_name: string;
        birthdate: string;
        email: string;
        phone_number: string;
        phone_number_verified:boolean;
        sub: string;
        address:string;
    }

/* Registration */    

export class UserRegistrationRequest {
    firstName: string;
    lasteName: string;
    dob: string;
    email: string;
    mobilenumber: string;
    password: string;
    address: string;
}

export interface CodeDeliveryDetails {
    destination: string;
    deliveryMedium: string;
    attributeName: string;
}

export interface UserRegistrationResponse {
    sdkResponseMetadata: SdkResponseMetadata;
    sdkHttpMetadata: SdkHttpMetadata;
    userConfirmed: boolean;
    codeDeliveryDetails: CodeDeliveryDetails;
    userSub: string;
}

/* Products */

export interface IProduct {
    productId: string;
    productName: string;
    productCategory: string;
    productMrp: number;
    productDisc: number;
    productPriceToShow: number;
    productImagePath: string;
    quantity: number;
    manufacturedBy: string;
}

export class FetchProductRequest {
    field: string;
    value: string;
    constructor(field:string,value:string){
        this.field=field;
        this.value=value;
    }
}

export interface FetchProductResponse {
    code: number;
    data: IProduct[];
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


  export class CartQuantityUpdateRequest extends AddToCartRequest{

  }

  export interface CartQuantityUpdateResponse extends FetchAllCartByUserResponse{

  }

  /* Buy */

export class PlaceOrderRequest {
    productidlist: string[];
    quantity: number;
    productamount: string;
    userid: string;
    operationName: string;
    constructor(productidlist: string[],quantity: number,productamount: string,userid: string,operationName: string){
        this.productidlist=productidlist;
        this.quantity=quantity;
        this.productamount=productamount;
        this.userid=userid;
        this.operationName=operationName;
    }
}


export interface PlaceOrderData {
    orderid: number;
    productidlist: string[];
    quantity: number;
    productamount: string;
    userid: string;
}

export interface PlaceOrderResponse {
    code: string;
    message: string;
    data: PlaceOrderData;
}