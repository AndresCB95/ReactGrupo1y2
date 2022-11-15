import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useState, useEffect } from 'react';

const Reservas = () => {

    const [datosReservas, setDatosReservas] = useState([{}])

    useEffect(
     ()=> {

       //localhost - 127.0.0.1
       fetch("http://localhost:8081/reservas/pendientes/idcliente?id=02")
       .then(
         (response)=>(response.json())
       )
       .then(
         (response)=>{
           setDatosReservas(response)
         }
       ) 
     },[]
    )
 
   const pagarReserva= async (vuelo)=> {
 
       var reserva = {}
       reserva.idclient = "02"
       reserva.idvuelo = vuelo._id
       reserva.sillas = [
         {
             "categoria":"economica",
             "silla":2,
             "cancelada":false
         }
       ]
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

    return (
        <div>
              
      <Table striped bordered hover>
        <thead>
          <tr>
            <th># Reserva</th>
            <th># Vuelo</th>
            <th># Cliente</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Valor unidad</th>
            <th>Sillas</th>
            <th>Valor Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        
          { 
            datosReservas.map(
              (reserva,index)=>{
                return(
                  <tr>
                    <td>{reserva._id}</td>
                    <td>{reserva.origen}</td>
                    <td>{reserva.destino}</td>
                    <td>{reserva.fecha}</td>
                    <td>${new Intl.NumberFormat("de-DE").format(`${reserva.valor}`)}</td>
                    <td>
                      <Button variant="primary" onClick={
                      async ()=>{
                        await reservarVuelo(reserva)
                        window.location.href="/reservas"
                      }
                      } >Pagar</Button>
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


export default Reservas