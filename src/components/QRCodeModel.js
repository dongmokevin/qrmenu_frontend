import React from "react";

import { Modal, Container, Row, Col } from "react-bootstrap";

import OperationButton from "./OperationButton";
import QRCode from "./QRCode";

function QRCodeModal({ show, onHide, place, onUpdatePlace }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body className="text-center pr-4">
        <Container>
          <h3>Tables QR Code</h3>
          <div className="d-flex align-items-center  my-4">
            <h5 className="mb-0 mr-2">
              Total tables: <b>{place.number_of_tables}</b>
            </h5>

            <OperationButton
              variant="lightgray"
              size="sm"
              onClick={() => onUpdatePlace(place.number_of_tables - 1)}
            >
              -
            </OperationButton>

            <OperationButton
              variant="lightgray"
              size="sm"
              onClick={() => onUpdatePlace(place.number_of_tables + 1)}
            >
              +
            </OperationButton>
          </div>

          <Row>
            {Array.from(
              { length: place.number_of_tables },
              (_, i) => i + 1
            ).map((table) => (
              <Col key={table} lg={4} md={6} className="mb-4">
                <QRCode table={table} placeId={place.id} />
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default QRCodeModal;
