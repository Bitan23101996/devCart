import api from '@/api/apiClient';
import { ProductTypes } from '@/types/product.types';

//Get All Products
export const getProducts = () => api.get<ProductTypes[]>("/api/products");

//Get Product by Id
export const getProductById = (id: number) => api.get<ProductTypes>(`/api/products/${id}`);