import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { RootState } from "../store";

export const getMovieById = createAsyncThunk(
  "movies/getbyid",
  async (movieId: string) => {
    return await userService.getMovieById(movieId);
  }
);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    assets: [] as Movie[],
    status: "loading",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.assets.push(action.payload);
        state.status = "success";
      })
      .addCase(getMovieById.rejected, (state) => {
        state.assets = [];
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
