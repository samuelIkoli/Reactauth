import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="align-items-center d-flex align-items-center justify-content-center text-center">
      <div className="border p-5 rounded align-items-center container container-fluid">
        <header className="App-header">
          <img src="MyLogo2.png" className="App-logo" alt="logo" />
          <p>Welcome to Samsqr</p>
          <a
            className="App-link"
            href="/register"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register
          </a>
          <a
            className="App-link"
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;
