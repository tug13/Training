import Axios from "axios";
import type { FormProduct, Product } from "@/models/Product";

const baseURL = 'http://localhost:3001/';
const axios = Axios.create({ baseURL });

export const getAllProucts =async () => {
    return axios.get<Product[]>('products');
};

export const addProduct =async (product:FormProduct) => {
    return axios.post('products',product);
}
export const updateProduct =async (id:number,product:FormProduct) => {
    return axios.patch(`products/${id}`,product);
}
export const deleteProduct =async (id:number) => {
    return axios.delete(`products/${id}`);
}