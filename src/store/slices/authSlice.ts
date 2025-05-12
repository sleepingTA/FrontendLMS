import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthError } from "../../types/auth";

// Define the state interface
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: AuthError | null;
}

// Define initial state with type
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Define payload types for actions
interface LoginSuccessPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenSuccessPayload {
  accessToken: string;
  refreshToken?: string;
}

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    loginFailure: (state, action: PayloadAction<AuthError>) => {
      state.loading = false;
      state.error = action.payload;
    },
    refreshTokenStart: (state) => {
      state.loading = true;
    },
    refreshTokenSuccess: (state, action: PayloadAction<RefreshTokenSuccessPayload>) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
    },
    refreshTokenFailure: (state, action: PayloadAction<AuthError>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFailure,
  logout,
  setUser,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;