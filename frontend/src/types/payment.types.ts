//Billing Form
export type BillingFormTypes = {
    formData: {
        name: string;
        streetAddress: string;
        city: string;
        state: string;
        zipCode: string;
    };
    errors: {
        name: string;
        streetAddress: string;
        city: string;
        state: string;
        zipCode: string;
    };
    onChange: (field: PaymentField, value: string) => void;
};

//Payemnt Form
export type PaymentFormTypes = {
    formData: {
        cardholderName: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
    };
    errors: {
        cardholderName: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
    };
    onChange: (field: PaymentField, value: string) => void;
};

//Actual Payment Form Whole Form
export type PaymentFormData = {
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
};

export type PaymentField = keyof PaymentFormData;