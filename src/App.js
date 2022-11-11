import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import ListaVuelo from './components/listaUsuarios/listaVuelo';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Fragment } from 'react'; 
import Autorizacion from './Autorizacion';
import datosUsuarioJson from "./components/listaUsuarios/datos.json"
import AddUsuario from './components/listaUsuarios/addUsuario';
import Button from 'react-bootstrap/Button'
import ModificarUsuario from './components/listaUsuarios/modificarUsuario';

function App() {
  
  if(localStorage.getItem("usuarios")==null){
    console.log(datosUsuarioJson)
     localStorage.setItem("usuarios",JSON.stringify(datosUsuarioJson))
  }


  return (
    < >
    <BrowserRouter>
    {/*
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/ver">ver</Navbar.Brand>
          <Navbar.Brand href="/add">add</Navbar.Brand>
        </Container>
      </Navbar>
  */}

      <Button variant="danger" onClick={
                      ()=>{
                          window.location.href="/ver"
                      }
                      } >ver</Button>
      <Button variant="primary" onClick={
                      ()=>{
                        window.location.href="/add"
                      }
                      } >add</Button>

      <Button variant="warning" onClick={
                      ()=>{
                        window.location.href="/modificar"
                      }
                      } >add</Button>

      <Routes>
        <Route path='/ver' element={Autorizacion(ListaVuelo,["USER"])}/>
        <Route path='/add' element={Autorizacion(AddUsuario,["USER","ADMIN"])}/>
        <Route path='/reservas' element={Autorizacion(ModificarUsuario,["USER","ADMIN"])}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
