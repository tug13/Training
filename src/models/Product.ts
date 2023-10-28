export interface Product {
    id:number;
    name:string;
    description:string;
    price:number;
    quantity:number;
    date:string;
    total:number;
}
export interface FormProduct {
    id?:number;
    name:string;
    description:string;
    price:number;
    quantity:number;
    date?:string;
    total?:number;
}