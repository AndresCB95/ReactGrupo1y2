import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import ListaUsuarios from './components/listaUsuarios/listaUsuarios';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Fragment } from 'react'; 
import Autorizacion from './Autorizacion';

function App() {
  return (
    < >
    <BrowserRouter>

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/ver">ver</Navbar.Brand>
          </Container>
      </Navbar>


      <Routes>
        <Route path='/ver' element={Autorizacion(ListaUsuarios,["USER","ADMIN"])}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
