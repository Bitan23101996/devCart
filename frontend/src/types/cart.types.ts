
//used in backends response
export type CartTypes = {
    "category": string,
    "price": number,
    "name": string,
    "description": string,
    "id": number,
    "username": string,
    "quantity": number,
    "img": string
}

//used in cart page, increase & decrease
export type CartItemTypes = {
    item: CartTypes;
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
};

//used in slice layer
export type CartState = {
    items: CartTypes[];
    loading: boolean;
    error: string | null;

}

//Used in service layer
export type GetCartRequest = {
    username: string;
}

//used in service layer
export type CartAddRemoveRequest = {
    username: string,
    productId: number
}
