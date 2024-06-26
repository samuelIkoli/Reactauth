import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const MyNavbar = () => {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="MyLogo4.png"
              className="img-fluid"
              style={{ height: "2rem" }}
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/profile">Home</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              {/* <Nav.Link href="#link"></Nav.Link> */}
              <Nav.Link href="/" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNavbar;
