import React from "react";
import {
  Box,
  chakra,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
type Props = {
  src: string;
  title: string;
  id: number;
  overview: string;
};
import { removeFavorite, addFavorite } from "../store/user/userService";

export default function MovieCard({ src, title, id, overview }: Props) {
  const IMG_API = `https://image.tmdb.org/t/p/w200${src}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selector = useAppSelector((state) => state);
  const { token } = selector.auth.user;

  const isFavorite = () => {
    return selector.user.assets.some((movie) => {
      return movie.title === title;
    });
  };

  const removeFav = async () => {
    console.log(selector.user.assets);
    console.log(id);
    console.log(token);
    const remove = await removeFavorite(token, id);
    console.log(remove);

    return remove;
  };

  const addFav = async () => {
    console.log(selector.user.assets);
    console.log(id);
    console.log(token);
    const add = await addFavorite(token, id);
    console.log(add);
    return add;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{overview}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {isFavorite() ? (
              <Button variant="red" onClick={removeFav}>
                Remove from favorites
              </Button>
            ) : (
              <Button variant="green" onClick={addFav}>
                Add to favorites
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        w="auto"
        p="4"
        mx="0"
      >
        <Box
          as="a"
          href={`https://themoviedb.org/movie/${id}`}
          target="_blank"
          bg="gray.300"
          h={64}
          w="200px"
          rounded="lg"
          shadow="md"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage: `url(${IMG_API})`,
          }}
        />

        <Box
          w="200px"
          bg="gray.800"
          mt={-10}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <chakra.h3
            py="10px"
            px={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color="gray.500"
            letterSpacing={1}
            w="200px"
            h="35px"
            overflow="hidden"
          >
            {title}
          </chakra.h3>

          <Flex
            alignItems="center"
            justifyContent="center"
            py={3}
            px={3}
            bg="gray.700"
          >
            <chakra.button
              bg="gray.800"
              fontSize="xs"
              fontWeight="bold"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
              onClick={onOpen}
              _hover={{
                bg: "gray.600",
              }}
              _focus={{
                bg: "gray.600",
                outline: "none",
              }}
            >
              View Movie Details
            </chakra.button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
