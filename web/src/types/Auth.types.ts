export interface RegisterRequest { 
    username: string; 
    password: string;
}

export interface AuthRequest { 
    username: string; 
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface RefreshTokenResponse {
    success: boolean;
    accessToken: string;
    message: string;
}