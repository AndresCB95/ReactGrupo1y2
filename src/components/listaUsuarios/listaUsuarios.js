import React, { useState } from 'react';
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
        setNewUsuario({email:emailp,password:newUsuario.password,nombre:newUsuario.nombre})
    }

    const modificarPassword = (passwordp)=> {
      setNewUsuario({password:passwordp,email:newUsuario.email,nombre:newUsuario.nombre})
    }

    const modificarNombre = (nombrep)=> {
        setNewUsuario({nombre:nombrep,password:newUsuario.password,email:newUsuario.email})
    }


    const eliminarUsuario = (id) => {
    const listaUsuariosNew = datosUsuario.filter(
        (usuario)=>(usuario.email !== id)
      )
      setDatosUsuario(listaUsuariosNew)
    }

    const addUsuario = (e) => {
      setDatosUsuario([...datosUsuario, newUsuario])
      e.target.form.elements.emailnewinput.value=""
      e.target.form.elements.nombrenewinput.value=""
      e.target.form.elements.passwordnewinput.value=""
    }

    return (
      <div>
        <Form onSubmit={
          (e)=>{
            addUsuario(e)
          }
        }>
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
                          id="emailnewinput"
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
                          id="nombrenewinput"
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
                          id="passwordnewinput"
                          type="password"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon3"
                          onChange={
                            (e)=>{modificarPassword(e.target.value)}
                          }
                        />
                      </InputGroup></td>
                    <td><Button variant="primary" 
                    type="submit"
                    
                    >Agregar</Button></td>
              </tr>
        </tbody>
      </Table>
      </Form>
      </div>
    )
  }
;


export default ListaUsuarios;
