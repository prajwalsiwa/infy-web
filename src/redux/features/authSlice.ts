import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
}

export interface setAuthStateResponse {
  expiry: string;
  token: string;
  groups: {
    id: number;
    name: string;
  } | null;
}

const initialState: AuthState = {
  isLoading: true,
  token: null,
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, { payload }: PayloadAction<setAuthStateResponse>) {
      // if (!payload.groups) {
      //   return;
      // }
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = payload.token;
      state.role = payload.groups?.name || null;
      localStorage.setItem("token", payload.token);
    },
    clearAuth(state) {
      state.token = null;
      state.isLoading = true;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token")
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
