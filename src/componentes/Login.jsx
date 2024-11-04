import React, { useState } from "react";
import "./../App.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database, usuario } from "../firebase/FirebaseApp";
import {getDocs, collection} from "firebase/firestore";
import { useNavigate } from "react-router";

const Login = () => {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const nav = useNavigate()

  const ingresar = async (e) =>{
    e.preventDefault();
    try{
        var user = await signInWithEmailAndPassword(auth, email, password)
        const query = await getDocs(collection(database, "administradores"));
        console.table(user)
        query.forEach((doc)=>{
            if(user.user.uid === doc.data().UID){
                usuario.id = doc.id;
                usuario.uid = doc.data().UID;
                usuario.nombres = doc.data().nombres;
                usuario.apellidos = doc.data().apellidos;
                usuario.correo = doc.data().correo;
                console.log("Usuario encontrado");
                alert("Bienvenido "+usuario.nombres);
                console.table(usuario);
                nav("/administrador");
            }else{
                console.log("Usuario NO encontrado");
                alert("No se encuentran datos del administrador, en caso de tratarse de un problema, por favor,"+ 
                    "contacte a los desarrolladores");
            }
        });
    }catch(error){
        console.log("OCURRIO UN ERROR: ",error);
        alert("Lo sentimos, tal vez sus credemciales no son correctas, si cree que se trata de un error, por favor, contacte a los desarrolladores o restablezca su contraseña")
    }
  }

  return (
    <Container className="mt-5" >
      <Row>
        <Col  sm={4}>
            <p>
            Si tiene problemas con su inicio de sesión, <br></br> por favor contacte a los administradores o desarrolladores
            </p>
        </Col>
        <Col sm={8}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su correo de administrador"
                value={email} onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña"
                value={password} onChange={(e)=>setPassword(e.target.value)}  />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={ingresar}>
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
