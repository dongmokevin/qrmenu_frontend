import { Button, Container, Row, Col, Image, Jumbotron } from "react-bootstrap";
import React from "react";
import MainLayout from "../layouts/MainLayouts";

const Home = () => {
  return (
    <MainLayout>
      <Jumbotron className="bg-light">
        <Container>
          <Row>
            <Col md={6} className="my-auto">
              <h1>
                <b>QR Code Menu</b>
              </h1>
              <h5 className="my-4">
                A smart way to share your Digital menu in a QR code with your
                customers
              </h5>
              <br />
              <Button href="/places" variant="standard" size="lg">
                Create Your Menu
              </Button>
            </Col>
            <Col>
              <Image
                src="https://cdn.dribbble.com/users/2104710/screenshots/6613353/scuk_menu.gif"
                rounded
                fluid
              />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </MainLayout>
  );
};

export default Home;
