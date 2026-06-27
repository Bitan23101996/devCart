export type ProductTypes = {
    "name": string,
    "price": number,
    "id": number,
    "category": string,
    "description": string,
    "img": string

}
//Used in initial slice state
export type ProductState = {
    products: ProductTypes[];
    selectedProduct: ProductTypes | null;
    loading: boolean;
    error: string | null;
    selectedCategory: string,
    searchText: string
}
