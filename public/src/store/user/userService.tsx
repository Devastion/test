import axios from "axios";

export const favorites = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("http://localhost:5000/favorites", config);

  return response.data;
};

export const removeFavorite = async (token: string, id: string | number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`http://localhost:5000/${id}`, config);

  return response.data;
};

export const getMovieById = async (movieId: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=baa5e920e3f221f1c46904e941e296d2&language=en-US`
  );
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id, title, poster_path, overview } = response.data;
  return {
    id,
    title,
    poster_path,
    overview,
  };
};

const userService = {
  favorites,
  getMovieById,
};

export default userService;
