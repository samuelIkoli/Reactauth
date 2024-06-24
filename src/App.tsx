import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
