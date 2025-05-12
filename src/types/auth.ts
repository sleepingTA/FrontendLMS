export interface User {
    id: number;
    email: string;
    role: string;
}

export interface AuthResponse {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    error?: string;
  }
export interface AuthError {
    message: string;
    status: number;
  }
 export interface LoginSuccessPayload {
    user: User;
    accessToken: string;
    refreshToken: string;
  }