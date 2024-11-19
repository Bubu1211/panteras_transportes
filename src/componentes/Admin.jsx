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
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ModalRegistro } from "./ModalRegistro";
import Mapa from "./Mapa";


const Admin = () => {
  const [registros, setRegistros] = useState([]);
  const [regFiltro, setRegFiltro] = useState([])
  const nav = useNavigate();

  const volver = () => {
    auth.signOut(); //cierra sesion
    nav("/");
  }

  const obtenerRegistros = async () => {
    setRegistros([]);
    let nuevosRegistros = [];
    const q = query(
      collection(database, "registros"),
      orderBy("fecha_hora", "asc")
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
    setRegFiltro(registros);
  };

  const get = async () =>{
    await obtenerRegistros();
  }

  const esMismaFecha = (fecha1, fecha2) => {
    return fecha1 >= fecha2
  }
   
  const buscarNombre = () =>{
    let id = document.getElementById("por_nombre").value;
    setRegFiltro(registros.filter(r => r.ID_economizador === id))
  }

  const buscarFecha = () =>{
    
    let id = document.getElementById("por_fecha").value;
    let fechaBuscada = new Date(id);
    setRegFiltro(registros.filter(fecha => esMismaFecha(fecha.fecha_hora, fechaBuscada)))
  }

  return (
    <Container>
      <Row className="m-3" >
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
          id="por_nombre"
            placeholder="Buscar por ID Economizador"
            aria-label="Buscar por nombre"
            aria-describedby="basic-addon1"
          />
          <Button variant="secondary" onClick={buscarNombre}>
            <img width="32" height="32" src="https://img.icons8.com/color/48/search-more.png" alt="search-more"/>
          </Button>
          <Form.Control
            id="por_fecha"
            type="datetime-local"
            placeholder="Buscar por fecha"
            aria-label="Buscar por fecha"
            aria-describedby="basic-addon1"
          />
          <Button variant="secondary" onClick={buscarFecha}>
            <img width="32" height="32" src="https://img.icons8.com/color/48/search-more.png" alt="search-more"/>
          </Button>
        </InputGroup>
      </Row>
      <Row>
        <Col>
        <div style={{height: '55vh', overflow: 'scroll'}}> 
            
          <Table striped bordered hover >
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
                regFiltro.map((reg, i) =>(
                  <ModalRegistro reg={reg} i={i}/>
                ))
              }
            </tbody>
          </Table>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
