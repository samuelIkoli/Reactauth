import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import { AuthContext, local_url } from "..";
import EnterOTP from "../modals/EnterOTP";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [user_data, setUserData] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [valid, setValid] = useState(true);
  const [success, setSuccess] = useState(true);
  const [auth, setAuth] = useState(false);
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validateEmail = (e: any) => {
    e.preventDefault();
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setEmail(e.target.value);
      setValid(true);
    } else {
      setValid(false);
    }
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      return setSuccess(false);
    }
    const userData: any = {
      password,
      email,
    };
    try {
      const response: any = await axios.post(`${local_url}login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = response.data.data;
      setUserData(user);
      if (user.two_fa === 1) {
        setAuth(true);
      } else {
        localStorage.setItem("username", user.username);
        localStorage.setItem("two_fa", user.two_fa);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user_id", response.data.data.id);
        navigate("/profile");
      }
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error: any) {
      if (error.response) {
        setWrong(true);
        console.error("Error response:", error.response.data);
      } else {
        alert("error.response.data.message");
        console.error("Error message:", error.message);
      }
    }
    return;
  };
  return (
    <div className="align-items-center d-flex align-items-center justify-content-center text-center">
      <div className="border p-5 rounded align-items-center container container-fluid">
        <div>
          <h1>Enter your login credentials</h1>
        </div>
        <div className="container d-flex justify-content-center">
          <form action="submit" onSubmit={handleLogin}>
            {/*  */}
            {!success ? (
              <div className="alert alert-danger" role="alert">
                Please input all fields correctly
              </div>
            ) : (
              ""
            )}
            {wrong ? (
              <div className="alert alert-danger" role="alert">
                Invalid username or password
              </div>
            ) : (
              ""
            )}

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                onChange={validateEmail}
              />
              <label htmlFor="email">Email address</label>
              {!valid ? (
                <div className="d-flex justify-self-start text-danger">
                  Enter a valid email.
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <div></div>
          <EnterOTP
            show={auth}
            user={user_data}
            onHide={() => setAuth(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
