import React from "react";
import {
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { popularMovies } from "../store/movie/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import MovieCard from "../components/MovieCard";
import { getMovieById } from "../store/user/userSlice";
import { favorites } from "../store/user/userService";

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selector = useAppSelector((state) => state);

  const isAuth = selector.auth.isAuthenticated;
  const { token }: any = selector.auth.user;

  // * User favorites
  const favoriteMovies = favorites(token);

  const render = async () => {
    const response = await favorites(token);
    response.map((movie: any) => dispatch(getMovieById(movie.movie_id)));
  };

  const moviesSelector = selector.user.assets;
  const mapFavMovies = moviesSelector.map((movie: Movie) => (
    <MovieCard
      key={movie.id}
      title={movie.title}
      src={movie.poster_path}
      id={movie.id}
      overview={movie.overview}
    />
  ));

  useEffect(() => {
    dispatch(popularMovies());

    if (selector.user.assets.length >= 0 && isAuth) dispatch(render);

    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  //* Search movies
  const [searchVal, setSearchVal] = useState("");
  const searchMovies = (e: any) => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };

  // * Popular movies
  const getPopularMovies = selector.movie.data;
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
  }

  const mapPopularMovies = getPopularMovies.map((movie: Movie) => (
    <MovieCard
      key={movie.id}
      title={movie.title}
      src={movie.poster_path}
      id={movie.id}
      overview={movie.overview}
    />
  ));

  return (
    <>
      <Center>
        <InputGroup width="300px" my="5">
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          />
          <Input
            placeholder="Search Movie"
            value={searchVal}
            onChange={searchMovies}
            onFocus={(e) => {
              e.preventDefault();
              navigate("/search");
            }}
          />
          <InputRightElement>
            <Search2Icon color="gray.500" />
          </InputRightElement>
        </InputGroup>
      </Center>
      <Heading fontSize="2xl" as="h1">
        Popular Movies
      </Heading>
      <Flex
        direction="row"
        wrap="nowrap"
        justifyContent="flex-start"
        overflow="auto"
      >
        {mapPopularMovies}
      </Flex>
      <Heading fontSize="2xl" as="h1" mt={4}>
        Favorites
      </Heading>
      <Flex
        direction="row"
        wrap="nowrap"
        justifyContent="flex-start"
        overflow="auto"
      >
        {localStorage.getItem("user")
          ? mapFavMovies
          : "Please login to see favorites"}
      </Flex>
    </>
  );
}
