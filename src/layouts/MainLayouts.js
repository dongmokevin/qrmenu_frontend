import { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import React from "react";
import AuthContext from "../contexts/AuthContex";

function MainLayout({ children }) {
  const history = useNavigate();
  const auth = useContext(AuthContext);

  const onSignin = () => {
    history("/login", { replace: true });
  };

  const onRegsiter = () => {
    history("/register", { replace: true });
  };

  const onSignOut = () => {
    auth.signOut();
    history("/login");
  };

  const goToPlaces = () => {
    history("/places");
  };
  return (
    <>
      <Navbar bg="white" variant="light" className="mb-4 shadow-sm">
        <Navbar.Brand href="/">QR Menu</Navbar.Brand>
        <Nav className="">
          <Nav.Link onClick={goToPlaces}>Places</Nav.Link>
        </Nav>

        <Nav className="flex-grow-1 justify-content-end">
          {auth.token ? (
            <Nav.Link onClick={onSignOut}>Logout</Nav.Link>
          ) : (
            [
              <Nav.Link key={1} onClick={onSignin}>
                Login
              </Nav.Link>,
              <Nav.Link key={2} onClick={onRegsiter}>
                Register
              </Nav.Link>,
            ]
          )}
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}

export default MainLayout;
