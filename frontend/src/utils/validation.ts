import i18n from '@/i18n';

//common required fields
export const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) {
        // return `${fieldName} is required.`;
        return i18n.t('required', { field: fieldName });
    }

    return '';
};

//Validation Username
export const validateUsername = (username: string): string => {

    if (!username.trim()) {
        return i18n.t('usernameRequired');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmail = emailRegex.test(username);

    const isMinFiveChars = username.trim().length >= 5;

    if (!isEmail && !isMinFiveChars) {
        return i18n.t('usernameInvalid');
    }

    return '';
};

//Validation Password
export const validatePassword = (password: string): string => {

    if (!password.trim()) {
        return i18n.t('passwordRequired');
    }

    if (password.length < 6) {
        return i18n.t('passwordMinLength');
    }

    return '';
};

//Validation Password & Confirm Password
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {

    if (!confirmPassword.trim()) {
        return i18n.t('confirmPasswordRequired');
    }

    if (password !== confirmPassword) {
        return i18n.t('passwordsDoNotMatch');

    }

    return '';
};

//Validation zip Code
export const validateZipCode = (value: string) => {
    if (!value.trim()) {
        return i18n.t('zipCodeRequired');
    }

    if (!/^\d{5,6}$/.test(value)) {
        return i18n.t('zipCodeInvalid');
    }

    return '';
};

//Validation Card Number
export const validateCardNumber = (value: string) => {
    if (!value.trim()) {
        return i18n.t('cardNumberRequired');
    }

    if (!/^\d{16}$/.test(value)) {
        return i18n.t('cardNumberInvalid');

    }

    return '';
};

//Validation CVV
export const validateCVV = (value: string) => {
    if (!value.trim()) {
        return i18n.t('cvvRequired');

    }

    if (!/^\d{3}$/.test(value)) {
        return i18n.t('cvvInvalid');

    }

    return '';
};

//Validation Card Expiry Date
export const validateExpiryDate = (value: string) => {
    if (!value.trim()) {
        return i18n.t('expiryDateRequired');

    }

    const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);

    if (!match) {
        return i18n.t('expiryDateInvalid');

    }

    const month = Number(match[1]);
    const year = Number(`20${match[2]}`);

    const now = new Date();

    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return i18n.t('cardExpired');

    }

    return '';
};