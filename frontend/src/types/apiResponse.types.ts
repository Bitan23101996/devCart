export type ApiResponse<T> = {
    error: boolean;
    message: string;
    status: number;
    data: T;
}