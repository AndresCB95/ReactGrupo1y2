import React, { useState } from 'react';
import styles from './listaUsuarios.module.css';
import datosUsuarioJson from "./datos.json"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
const ListaUsuarios = () => 
  {
    const [datosUsuario, setDatosUsuario] = useState(datosUsuarioJson)

    const [newUsuario, setNewUsuario] = useState({email:"",password:"",nombre:""})

    const modificarEmail = (emailp)=> {
        setNewUsuario({email:emailp})
    }

    const modificarPassword = (passwordp)=> {
      setNewUsuario({password:passwordp})
    }

    const modificarNombre = (nombrep)=> {
        setNewUsuario({nombre:nombrep})
    }


    const eliminarUsuario = (id) => {
    const listaUsuariosNew = datosUsuario.filter(
        (usuario)=>(usuario.email !== id)
      )
      setDatosUsuario(listaUsuariosNew)
    }

    const addUsuario = () => {
      setDatosUsuario([...datosUsuario, newUsuario])
    }

    return (
      <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        
          { 
            datosUsuario.map(
              (usuario,index)=>{
                return(
                  <tr>
                    <td>{index}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.password}</td>
                    <td><Button variant="danger" onClick={
                      ()=>{
                         eliminarUsuario(usuario.email)
                      }
                      } >Eliminar</Button></td>
                  </tr>
                );
              }
            )
          }
            <tr>
              <td></td>
                    <td>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="basic-addon1"
                          onChange={
                            (e)=>{modificarEmail(e.target.value)}
                          }
                        />
                      </InputGroup>
                   </td>
                   <td>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Nombre</InputGroup.Text>
                        <Form.Control
                          placeholder="Nombre"
                          aria-label="Nombre"
                          aria-describedby="basic-addon2"
                          onChange={
                            (e)=>{modificarNombre(e.target.value)}
                          }
                        />
                      </InputGroup>
                   </td>
                    <td><InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon3"
                          onChange={
                            (e)=>{modificarPassword(e.target.password)}
                          }
                        />
                      </InputGroup></td>
                    <td><Button variant="primary" onClick={
                      ()=>{

                        addUsuario()
                      }
                      } >Agregar</Button></td>
              </tr>
        </tbody>
      </Table>
      </div>
    )
  }
;


export default ListaUsuarios;
