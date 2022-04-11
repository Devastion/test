import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const register = createAsyncThunk(
  "auth/register",
  async (userData: object, thunkApi) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: object, thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const user = JSON.parse(localStorage.getItem("user")) || " ";

const UserState = {
  user: user || null,
  isAuthenticated: user != " " ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state) => {
        state.isAuthenticated = false;
      });

    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = " ";
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
