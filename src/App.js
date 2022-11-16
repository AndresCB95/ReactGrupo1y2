import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import ListaVuelo from './components/listaUsuarios/listaVuelo';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Fragment } from 'react'; 
import Autorizacion from './Autorizacion';
import datosUsuarioJson from "./components/listaUsuarios/datos.json"
import ListaVentas from './components/listaUsuarios/listaVentas';
import Button from 'react-bootstrap/Button'
import ListaReserva from './components/listaUsuarios/listaReserva';

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
                      } >Ver Vuelos</Button>

      <Button variant="warning" onClick={
                      ()=>{
                        window.location.href="/reservas"
                      }
                      } >Reserva</Button>

    <Button variant="primary" onClick={
                      ()=>{
                        window.location.href="/ventas"
                      }
                      } >Ver Ventas</Button>

      <Routes>
        <Route path='/ver' element={Autorizacion(ListaVuelo,["USER"])}/>
        <Route path='/ventas' element={Autorizacion(ListaVentas,["USER","ADMIN"])}/>
        <Route path='/reservas' element={Autorizacion(ListaReserva,["USER","ADMIN"])}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
