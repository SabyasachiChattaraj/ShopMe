import { IProduct } from './iproduct';
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
    category: string;
}

export interface FetchProductResponse {
    code: number;
    data: IProduct[];
}