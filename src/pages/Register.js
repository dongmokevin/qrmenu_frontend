import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { React, useState, useEffect, useContext } from "react";
import MainLayout from "../layouts/MainLayouts";
import { useNavigate } from "react-router-dom";

import { register } from "../apis";

import AuthContext from "../contexts/AuthContex";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.token) {
      history("/places", { replace: true });
    }
  });

  const onSubmit = () => {
    auth.register(username, password, () => history("/places"));
  };
  return (
    <MainLayout>
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card>
            <Card.Body>
              <h3 className="text-center">
                <b>REGISTER</b>
              </h3>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  label="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  label="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="standard"
                block
                onClick={onSubmit}
                disabled={auth.loading}
              >
                {auth.loading ? (
                  <Spinner
                    variant="standard"
                    as="span"
                    size="sm"
                    role="status"
                    animation="border"
                    aria-hidden="true"
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Register;
