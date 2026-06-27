import { CartTypes } from "./cart.types";

export type OrderStateTypes = {
    userName: string;
    billingAddress: {
        name: string;
        streetAddress: string;
        city: string;
        state: string;
        zipCode: string;
    };
    cardLastFour: string;
    products: CartTypes[];
    totalAmount: number;
};