export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    name: string;
    userid: string;
}

export type AuthState = {
    user: LoginResponse | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export type RegisterRequest = {
    name: string;
    username: string;
    password: string;
}

export type RegisterResponse = {
    name: string;
}