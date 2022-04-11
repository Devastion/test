import axios from "axios";

export const favorites = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("http://localhost:5000/favorites", config);

  return response.data;
};

export const removeFavorite = async (token: string, movie_id: number) => {
  // const config = {
  //   headers: { Authorization: `Bearer ${token}` },
  //   data: {
  //     movie_id: movie_id,
  //   },
  // };
  // const response = await axios.delete(`http://localhost:5000/delete`, config);

  // return response.data;
  const res = await axios({
    method: "DELETE",
    url: "http://localhost:5000/delete",
    headers: { Authorization: `Bearer ${token}` },
    data: {
      movie_id: movie_id,
    },
  });
  return res;
};

export const addFavorite = async (token: string, movie_id: number) => {
  const res = await axios({
    method: "POST",
    url: "http://localhost:5000/favorites",
    headers: { Authorization: `Bearer ${token}` },
    data: {
      movie_id: movie_id,
    },
  });
  return res;
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
  removeFavorite,
  addFavorite,
};

export default userService;
