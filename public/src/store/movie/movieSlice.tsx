import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "./movieService";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  state: "idle" | "pending" | "rejected" | "success";
}

export const popularMovies = createAsyncThunk("movies/popular", async () => {
  try {
    return await movieService.getPopularMovies();
  } catch (error) {
    return error;
  }
});

const initialState = {
  data: [] as Movie[],
  loading: "idle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(popularMovies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "success";
    });
  },
});

export default moviesSlice.reducer;
