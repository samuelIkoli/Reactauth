import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { base_url, local_url } from "..";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [valid, setValid] = useState(1);
  const [email, setEmail] = useState("");
  const [failed, setFailed] = useState(0);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [success, setSuccess] = useState(1);
  const Navigate = useNavigate();

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (e: any) => {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setEmail(e.target.value);
      setValid(1);
    } else {
      setValid(0);
    }
  };

  const handleRegister = async () => {
    if (password !== password2) {
      return setFailed(1);
    } else {
      setFailed(0);
    }
    if (!email || !username || !phone || !password || !password2) {
      return setSuccess(0);
    }
    const userData: any = {
      username,
      password,
      email,
      phone,
    };
    try {
      const response: any = await axios.post(`${local_url}register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setSuccess(1);
        alert("Success registering user");
        Navigate("/login");
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
          <h1>Register below</h1>
        </div>
        <div className="container d-flex justify-content-center">
          <form action="">
            {/* \ */}
            {!success ? (
              <div className="alert alert-danger" role="alert">
                Please input all fields correctly
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
                required
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
                type="number"
                className="form-control"
                id="phone"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="re-password"
                placeholder="Password"
                onChange={(e) => setPassword2(e.target.value)}
              />
              <label htmlFor="password">Re-enter Password</label>
              {/* conditional */}
              {failed ? (
                <div className="d-flex justify-self-start text-danger">
                  Passwords not the same.
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
