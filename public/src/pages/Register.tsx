import React from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { register, login } from "../store/auth/authSlice";

type Props = {
  isLogin: boolean;
};

export default function Register({ isLogin }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const handleClick = (): void => setShow(!show);

  const [formData, setFormData] = useState({
    name: "admin",
    password: "1234",
  });
  const { name, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const response = dispatch(isLogin ? login(formData) : register(formData));
    response;
    navigate("/");
  };

  return (
    <Center>
      <form onSubmit={onSubmit}>
        <FormControl isRequired mt="5" width="300px">
          <FormLabel htmlFor="name">Your username</FormLabel>
          <Input
            type="text"
            id="name"
            placeholder="Your username"
            name="name"
            value={name}
            onChange={onChange}
          />

          <FormLabel htmlFor="password" mt="5">
            Your password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Center>
          <Button colorScheme="green" width={125} mt="5" type="submit">
            Login
          </Button>
        </Center>
      </form>
    </Center>
  );
}
