import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Mapa from "./Mapa";

function ModalMapsRegistro({ reg, show, onHide }) {

const copyLocation = () =>{
    navigator.clipboard.writeText(reg.ubicacion._lat+", "+reg.ubicacion._long);
    window.open("https://www.google.com.mx/maps", "_blank")
}

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Registro {reg.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={4}>
              ID: {reg.id}
            </Col>
            <Col xs={6} md={8}>
              Operador: {reg.nombre}
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              tipo: {reg.tipo}
            </Col>
            <Col xs={6} md={4}>
              Fecha:{" "}
              {reg.fecha_hora.getFullYear() +
                "/" +
                (reg.fecha_hora.getMonth()+1) +
                "/" +
                reg.fecha_hora.getDate()}
            </Col>
            <Col xs={6} md={4}>
              Hora:{" "}
              {reg.fecha_hora.getHours() +
                ":" +
                reg.fecha_hora.getMinutes() +
                ":" +
                reg.fecha_hora.getSeconds()}
            </Col>
          </Row>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            
                <h1>Ubicación</h1>
                
                <Button onClick={copyLocation}>
                <img width="28" height="28" src="https://img.icons8.com/color/48/copy--v1.png" alt="copy--v1"/>
                </Button>
            
            <Col>
            </Col>
          </div>
          <Row>
            <Mapa  lat={reg.ubicacion._lat} lng={reg.ubicacion._long}/>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalRegistro({ reg, i }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <tr
        key={reg.id + i}
        onClick={() => setModalShow(true)}
        style={{ cursor: "pointer" }}
      >
        <td>{reg.id}</td>
        <td>{reg.ID_economizador}</td>
        <td>{reg.nombre}</td>
        <td>
          {reg.fecha_hora.getFullYear() +
            "/" +
            (reg.fecha_hora.getMonth()+1) +
            "/" +
            reg.fecha_hora.getDate()}
        </td>
        <td>
          {reg.fecha_hora.getHours() +
            ":" +
            reg.fecha_hora.getMinutes() +
            ":" +
            reg.fecha_hora.getSeconds()}
        </td>
        <td style={{ display: "flex", alignContent: "center" }}>
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/dusk/64/map.png"
            alt="map"
          />
        </td>
        <td>{reg.tipo}</td>
      </tr>
      <ModalMapsRegistro
        show={modalShow}
        onHide={() => setModalShow(false)}
        reg={reg}
      />
    </>
  );
}
