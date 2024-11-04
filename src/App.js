import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./componentes/Login";
import Admin from "./componentes/Admin";
import { Container, Navbar } from "react-bootstrap";
import logo from "./assets/logo.png";

//para desolegar: firebase deploy --only hosting:driversync-panterasgapo-72e47
function App() {
  return (
    <BrowserRouter >
      <Navbar bg="primary" className="justify-content-start">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="70"
              height="70"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>

          <h1>Panteras Transporte </h1>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/administrador" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
