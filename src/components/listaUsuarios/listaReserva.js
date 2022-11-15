import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useState, useEffect } from 'react';

const ListaReserva = () => {

    
    const [datosReserva, setDatosReserva] = useState([{}])

    useEffect(
        ()=> {
          //localhost - 127.0.0.1
          fetch("http://localhost:8084/reservas/pendientes/idcliente/?id=02")
          .then(
            (response)=>(response.json())
          )
          .then(
            (response)=>{
                
                for(let i = 0; i<response;i++){
                    let reseva = response[i]
                    let sumasilla = 0

                    for(let j = 0 ; j < reseva.sillas; j++){
                        sumasilla += reseva.sillas[j].silla
                    }

                    response[i].total = sumasilla * reseva.vuelo.valor
                }
                setDatosReserva(response)
            }
          ) 
        },[]
       )

    return (
            <div>
                    
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Fecha</th>
                  <th>categoria</th>
                  <th># Sillas reservadas</th>
                  <th>valor unitario</th>
                  <th>Valor Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              
                { 
                  datosReserva.map(
                    (reserva,index)=>{
                      return(
                        <tr>
                          <td>{reserva._id}</td>
                          <td>{reserva.vuelo?.origen}</td>
                          <td>{reserva.vuelo?.destino}</td>
                          <td>{reserva.vuelo?.fecha}</td>
                          <td>
                        
                          {
                            reserva?.sillas?.map(
                              (sillareservar,index)=>{
                                return(
      
                                  
                                <div key={index}  className="mb-3">   
                                    <label>Categoria: {sillareservar.categoria}</label>    
                                    <label>Sillas: {sillareservar.silla}</label>    
                                </div>
                                  
      
                                )
                              }
                            )
                          }
                          </td>

                          <td>
                            {reserva.vuelo?.valor}
                          </td>

                          <td>
                            {reserva.total}
                          </td>


                          <td>
                            <Button variant="primary" onClick={
                            async ()=>{
                              
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


export default ListaReserva