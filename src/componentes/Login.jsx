import React, { useState } from "react";
import styled from 'styled-components'
import "./../App.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database, usuario } from "../firebase/FirebaseApp";
import {getDocs, collection} from "firebase/firestore";
import { useNavigate } from "react-router";

const Login = () => {

  const nav = useNavigate()

  const ingresar = async (e) =>{
    e.preventDefault();
    let email = document.getElementById("email").value;
    let pass =document.getElementById("pass").value;
    try{
      var user = await signInWithEmailAndPassword(auth, email, pass)
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
              //alert("Bienvenido "+usuario.nombres);
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

  const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color:   
 #f0f0f0;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor:   
 pointer;
`;

  return (
    <section style={{display: 'flex', alignItems: 'center'}}>
      
      <LoginContainer>
        <LoginForm onSubmit={ingresar}>
          <h2>Iniciar Sesión</h2>
          <Input
          id="email"
            type="text"
            placeholder="Email"
          />
          <Input
            id="pass"
            type="password"  
            placeholder="Contraseña"
          />
          <Button type="submit">Iniciar Sesión</Button> 

        </LoginForm>
      </LoginContainer>
    </section>
  );
};

export default Login;
