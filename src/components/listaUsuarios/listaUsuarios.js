import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

const ListaUsuarios = () => 
  {
    
    const datosUsuarioJson = JSON.parse(localStorage.getItem("usuarios"))
   
    const [datosUsuario, setDatosUsuario] = useState(datosUsuarioJson)

    const eliminarUsuario = (id) => {
    const listaUsuariosNew = datosUsuario.filter(
        (usuario)=>(usuario.email !== id)
      )
      setDatosUsuario(listaUsuariosNew)
      localStorage.setItem("usuarios",JSON.stringify(listaUsuariosNew))
    }

    const modificarUsuario= (modificarUsuario)=> {
      localStorage.setItem("usuarioModificar",JSON.stringify(modificarUsuario))

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
                      } >Eliminar</Button>
                      <Button variant="warning" onClick={
                      ()=>{
                        modificarUsuario(usuario)
                        window.location.href="/modificar"
                      }
                      } >Modificar</Button>
                      </td>
                  </tr>
                );
              }
            )
          }
            
        </tbody>
      </Table>
      
        
      </div>

    )
  }
;


export default ListaUsuarios;
