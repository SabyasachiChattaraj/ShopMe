

export interface CommonModel {
}

/* Login */
export class UserLoginRequest {
    userName: string;
    password: string;
    action:string;
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
 /*    Content-Length: string;
    Content-Type: string;
    Date: string;
    x-amzn-RequestId: string; */
}

export interface SdkHttpMetadata {
    httpHeaders: HttpHeaders;
    httpStatusCode: number;
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

export interface SdkResponseMetadata2 {
    requestId: string;
}

export interface HttpHeaders2 {
    Connection: string;
    /* Content-Length: string;
    Content-Type: string;
    Date: string;
    x-amzn-RequestId: string; */
}

export interface SdkHttpMetadata2 {
    httpHeaders: HttpHeaders2;
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
    sdkResponseMetadata: SdkResponseMetadata2;
    sdkHttpMetadata: SdkHttpMetadata2;
    challengeParameters: ChallengeParameters;
    authenticationResult: AuthenticationResult;
}

export interface UserLoginResponse {
    statusCode: number;
    errorMessage: string;
    getUserResult: GetUserResult;
    adminInitiateAuthResult: AdminInitiateAuthResult;
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
    lastName: string;
    dob: string;
    email: string;
    mobilenumber: string;
    password: string;
    address: string;
    action:string;
}

export interface CodeDeliveryDetails {
    destination: string;
    deliveryMedium: string;
    attributeName: string;
}

export interface SignUpResult {
    sdkResponseMetadata: SdkResponseMetadata;
    sdkHttpMetadata: SdkHttpMetadata;
    userConfirmed: boolean;
    codeDeliveryDetails: CodeDeliveryDetails;
    userSub: string;
}

export interface UserRegistrationResponse {
    statusCode: number;
    errorMessage: string;
    signUpResult: SignUpResult;
}

export class UserRegistrationConfirmationRequest {
    userName: string;
    accessCode: string;
    action: string;
}

export interface ConfirmSignUpResult {
    sdkResponseMetadata: SdkResponseMetadata;
    sdkHttpMetadata: SdkHttpMetadata;
}

export interface UserRegistrationConfirmationResponse {
    statusCode: number;
    errorMessage: string;
    confirmSignUpResult: ConfirmSignUpResult;
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


/* CART */
export class CartRequest{
    operationName:string;
}

export class AddToCartRequest extends CartRequest {
    userid: string;
    productid: string;
    quantity: number;
    constructor(userid:string,productid:string, quantity: number){
        super();
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

  export class FetchAllCartByUserRequest extends CartRequest{
    userid: string;
    constructor(userid: string){
        super();
        this.userid=userid;
    }
  }

  export class FetchAllCartByUserResponse {
    code: string;
    message: string;
    data: AddToCartData[];
  }
  
  export class DeleteCartByUserProductRequest extends CartRequest {
    userid: string;
    productid: string;
    constructor(userid:string,productid:string){
        super();
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