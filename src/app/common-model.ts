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
