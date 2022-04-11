import React from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Center,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { searchMovie } from "../store/movie/movieService";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [searchVal, setSearchVal] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  const searchMovies = (e: any) => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };

  const searchMovieByTitle = async () => {
    const response = await searchMovie(searchVal);
    setMoviesList(response);
  };

  useEffect(() => {
    searchMovieByTitle();
  }, [searchVal]);

  const movies = moviesList;
  const renderMovies = movies.map((movie: any) => (
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
            autoFocus
          />
          <InputRightElement>
            <Search2Icon color="gray.500" />
          </InputRightElement>
        </InputGroup>
      </Center>

      <Flex
        direction="row"
        wrap="wrap"
        overflow="auto"
        w="100%"
        justifyContent="space-evenly"
      >
        {renderMovies}
      </Flex>
    </>
  );
}
