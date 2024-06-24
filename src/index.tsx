import React, { useState, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Contact from "./screens/Contact";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Profile from "./screens/Profile";
export const local_url = "http://localhost:3000/";
export const base_url =
  "http://auth-be-env.eba-pxaexui4.eu-north-1.elasticbeanstalk.com/";

const AuthContext = createContext({});

const AuthProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt_token") ? true : false
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

const navbar = ReactDOM.createRoot(
  document.getElementById("head") as HTMLElement
);
navbar.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* <App /> */}
  </React.StrictMode>
);
