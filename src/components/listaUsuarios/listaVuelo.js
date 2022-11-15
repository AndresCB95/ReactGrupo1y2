import React, { useState , useEffect} from 'react';
import { Fragment } from 'react'; 
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const ListaVuelo = () => 
  {
    
    //const datosUsuarioJson = JSON.parse(localStorage.getItem("usuarios"))
   
    const [datosVuelo, setDatosVuelo] = useState([{"sillas":[]}])
    const [sillasReservas, setSillasReservas] = useState(0)
    const [categoria, setCategoria] = useState("")

   useEffect(
    ()=> {
      //localhost - 127.0.0.1
      fetch("http://localhost:8081/vuelos")
      .then(
        (response)=>(response.json())
      )
      .then(
        (response)=>{
          setDatosVuelo(response)
          
        }
      ) 
    },[]
   )

  const reservarVuelo= async (vuelo)=> {

      var reserva = {}
      reserva.idcliente = "02"
      reserva.idvuelo = vuelo._id
      reserva.sillas = [{"categoria":categoria, "silla": sillasReservas}]
      console.log(reserva.sillas)
      reserva.estadoPago="Pendiente"
      
      await fetch("http://localhost:8084/reservas",
      
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(reserva)
      }
      
      ).then(
        (response)=>(response.json())
      ).then(
        (response)=>{
          alert(response.mensaje)
        }
      )

    }

    const sillas = (sillas)=>{
      console.log(sillas)
      setSillasReservas(Number(sillas))
    }

    const fcategoria = (categoria)=>{
      console.log(categoria)
      setCategoria(categoria)
    }


    return (
      <div>
              
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>sillas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        
          { 
            datosVuelo.map(
              (vuelo,index)=>{
                return(
                  <tr>
                    <td>{vuelo._id}</td>
                    <td>{vuelo.origen}</td>
                    <td>{vuelo.destino}</td>
                    <td>{vuelo.fecha}</td>
                    <td>${new Intl.NumberFormat("de-DE").format(`${vuelo.valor}`)}</td>
                    
                    <td>
                    
                      {
                        vuelo?.silla?.map(
                          (sillac,index)=>{
                            return(
                              <div key={`inline-${index}`} className="mb-3">
                              <Form.Check
                                inline
                                label={sillac.categoria}
                                name="group1"
                                type='radio'
                                value={sillac.categoria}
                                id={`inline-${index}-1`}
                                onChange={(e)=>{fcategoria(e.target.value)}}
                              />
                              </div>
                        )})
                            }
                      <InputGroup className="mb-3">
                                  <InputGroup.Text id="basic-addon2">#</InputGroup.Text>
                                  <Form.Control
                                  id="sillas"
                                  placeholder="# sillas"
                                  aria-label="#sillas"
                                  aria-describedby="basic-addon2"
                                  onChange={
                                      (e)=>{sillas(e.target.value)}
                                  }
                                  />
                        </InputGroup>
                   
                      
                    </td>
                   
                    <td>
                      <Button variant="primary" onClick={
                      async ()=>{
                        await reservarVuelo(vuelo)
                        window.location.href="/reservas"
                      }
                      } >Reservar</Button>
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


export default ListaVuelo;
