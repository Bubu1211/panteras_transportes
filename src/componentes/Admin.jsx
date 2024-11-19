import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { auth, database, usuario } from "../firebase/FirebaseApp";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ModalRegistro } from "./ModalRegistro";
import Mapa from "./Mapa";


const Admin = () => {
  const [registros, setRegistros] = useState([]);
  const nav = useNavigate();

  const verRegistro = () =>{

  }

  const volver = () => {
    auth.signOut(); //cierra sesion
    nav("/");
  }

  const obtenerRegistros = async () => {
    setRegistros([]);
    let nuevosRegistros = [];
    const q = query(
      collection(database, "registros")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (d) => {
        const registroData = d.data();
        const eDoc = await getDoc( registroData.ID_economizador); //economizadorDoc ahora tiene toda la info del econimizador
        const tipoDoc = await getDoc(registroData.tipo);
        const date = new Date(registroData.fecha_hora.seconds*1000);
        //const fechaFormateada = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const registro = {
          id: d.id,
          ID_economizador: eDoc.id,
          nombre: 
            `${eDoc.data().apellido_paterno +" "+ eDoc.data().apellido_materno}, ${eDoc.data().nombre_primero +" "+ eDoc.data().nombre_segundo} `,
          fecha_hora: date,
          ubicacion: registroData.ubicacion,
          tipo: tipoDoc.id
        }
        nuevosRegistros = [...nuevosRegistros, registro];
        setRegistros(nuevosRegistros);
        console.log("RegistroDATA");
        console.log(registroData)
        console.log("objeto registrado")
        console.table(registro);
        
    });
  };

  const get = async () =>{
    await obtenerRegistros();
  }

  return (
    <Container className="cont mt-5">
      <Row className="m-5 p-3" >
        <Col sm={10}>
          <h1>Bienvenido {usuario.nombres}</h1>
        </Col>
        <Col sm={2}>
          <Button
            variant="danger"
            onClick={volver}
          >
            Cerrar Sesión
          </Button>
        </Col>
      </Row>
      <Row>
        <InputGroup className="mb-3">
          <Button
            variant="primary"
            id="button-addon1"
            onClick={get}
          >
            Ver Registros
          </Button>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nro. Economizador</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Ubicación</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {
                registros.map((reg, i) =>(
                  <ModalRegistro reg={reg} i={i}/>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
