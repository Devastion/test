import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

export const getMovieById = createAsyncThunk(
  "movies/getById",
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

const initialState = {
  assets: [] as Movie[],
  status: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
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
