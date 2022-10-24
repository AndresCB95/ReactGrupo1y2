import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useState } from 'react';

const AddUsuario = () => {

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

    const addUsuario = (e) => {
        const datosUsuarios = JSON.parse(localStorage.getItem("usuarios"))
        datosUsuarios.push(newUsuario)
        localStorage.setItem("usuarios",JSON.stringify(datosUsuarios))
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


export default AddUsuario