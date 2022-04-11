import axios from "axios";

export const searchMovie = async (query: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=baa5e920e3f221f1c46904e941e296d2&language=en-US&query=${query}&page=1&include_adult=false`
  );
  return response.data.results;
};

const getPopularMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=baa5e920e3f221f1c46904e941e296d2&language=en-US&page=4"
  );
  return response.data.results;
};

const getMovieById = async (movieId: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=baa5e920e3f221f1c46904e941e296d2&language=en-US`
  );

  const { id, title, poster_path, overview } = response.data;
  return {
    id,
    title,
    poster_path,
    overview,
  };
};

const movieService = {
  getPopularMovies,
  getMovieById,
};

export default movieService;
