import { Navbar, Nav, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import React from "react";

function MainLayout({ children }) {
  const history = useNavigate();
  const onSignin = () => {
    history("/login", { replace: true });
  };
  return (
    <>
      <Navbar bg="light" variant="light" classname="mb-4">
        <Navbar.Brand href="/">QR Menu</Navbar.Brand>
        <Nav className="flex-grow-1 justify-content-end">
          <Nav.Link onClick={onSignin}>Login</Nav.Link>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}

export default MainLayout;
