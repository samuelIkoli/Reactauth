import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { local_url } from "..";
import EnterOTP from "../modals/EnterOTP";

// const handleSubmit = () => {};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(1);
  const [success, setSuccess] = useState(0);
  const [auth, setAuth] = useState(false);
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (e: any) => {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setEmail(e.target.value);
      setValid(1);
    } else {
      setValid(0);
    }
  };
  const handleLogin = async () => {
    console.log(email, password);
    if (!email || !password) {
      return alert("All fields are required");
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
      // console.log(response.data.data.token);
      const user = response.data.data;
      console.log(user);
      if (user.two_fa === 1) {
        setAuth(true);
      }
      if (response.status === 200) {
        setSuccess(1);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user_id", response.data.data.id);
        alert("Logged in");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.message);
      } else {
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
        <div>
          <form action="submit" onSubmit={handleLogin}>
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
          <EnterOTP show={auth} onHide={() => setAuth(false)} />
        </div>
      </div>
    </div>
  );
}

export default Login;
