import React from "react";
import {
  ChakraProvider,
  Container,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Register from "./pages/Register";
import { logout } from "./store/auth/authService";
import { useEffect } from "react";

export default function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const ifAuth = !isAuth ? (
    <>
      <Tab>
        <NavLink to="/login">Login</NavLink>
      </Tab>
      <Tab>
        <NavLink to="/register">Register</NavLink>
      </Tab>
    </>
  ) : (
    <Tab onClick={logout}>Logout</Tab>
  );
  // <Tab>
  //   <NavLink to="/profile">Profile</NavLink>
  // </Tab>

  useEffect(() => {
    ifAuth;
  }, [logout, NavLink]);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <nav>
          <Tabs>
            <TabList>
              <Tab>
                <NavLink to="/">Home</NavLink>
              </Tab>
              {ifAuth}
            </TabList>
          </Tabs>
        </nav>
        <Container maxW="container.lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Register isLogin={true} />} />
            <Route path="/register" element={<Register isLogin={false} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}
