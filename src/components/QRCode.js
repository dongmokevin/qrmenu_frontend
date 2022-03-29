import { AiOutlineLink } from "react-icons/ai";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);

  > div {
    margin: auto;
  }
`;

const ComponentToPrint = styled.div`
  text-align: center;
  margin-top: 20px;
  h1 {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  h2 {
    font-size: 60px;
    margin-bottom: 100px;
  }
`;

function QRCode({ table, placeId }) {
  var QRCodeReact = require("qrcode.react");
  const url = `${window.location.origin}/menu/p${placeId}/${table}`;
  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
  });

  return (
    <Container>
      <QRCodeReact value={url} size={200} />
      <Overlay>
        <div className="d-flex">
          <Button variant="standard" onClick={handlePrint} className="mr-2">
            {`Print Table ${table}`}
          </Button>
          <Button
            variant="standard"
            href={`/menu/${placeId}/${table}`}
            target="blank"
          >
            <AiOutlineLink size={25} />
          </Button>
        </div>
      </Overlay>

      <div style={{ display: "none" }}>
        <ComponentToPrint ref={ComponentRef}>
          <h1> Table {table}</h1>
          <h2>Scan for menu</h2>
          <QRCodeReact value={url} size={500} />
        </ComponentToPrint>
        <Button onClick={handlePrint}>Print This Out!</Button>
      </div>
    </Container>
  );
}

export default QRCode;
