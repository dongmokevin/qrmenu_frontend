import React, { useState, useContext } from "react";

import { Form, Button } from "react-bootstrap";
import { addPlaces } from "../apis";
import AuthContext from "../contexts/AuthContex";

import ImageDropZone from "./ImageDropZone";

function PlaceForm({ onDone }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const auth = useContext(AuthContext);
  const onClick = async () => {
    const json = await addPlaces({ name, image }, auth.token);
    if (json) {
      setName("");
      setImage("");
      onDone();
    }
  };
  return (
    <div>
      <h4 className="text-center"></h4>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          label="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image</Form.Label>
        <ImageDropZone value={image} onChange={setImage}></ImageDropZone>
      </Form.Group>
      <Button variant="standard" block onClick={onClick}>
        Add
      </Button>
    </div>
  );
}

export default PlaceForm;
