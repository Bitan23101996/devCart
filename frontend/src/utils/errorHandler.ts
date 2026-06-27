export const getErrorMessage = (error: any): string => {
    if (!navigator.onLine) {
        return 'No internet connection. Please check your network.';
    }

    if (error?.message === 'Failed to fetch') {
        return 'Server is not running. Please try again later.';
    }

    return error?.message || 'Something went wrong';
};