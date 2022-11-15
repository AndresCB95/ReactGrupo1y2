import React, { useState , useEffect} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'


const ListaVuelo = () => 
  {
    
    //const datosUsuarioJson = JSON.parse(localStorage.getItem("usuarios"))
   
    const [datosVuelo, setDatosVuelo] = useState([{}])
    const [categoria, setCategoria] = useState("")
    const [sillasReservar, setSillasReservar] = useState(0)

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
      reserva.idclient = "02"
      reserva.idvuelo = vuelo._id
      reserva.sillas = [
        {
            "categoria":categoria,
            "silla":sillasReservar,
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

    function selectCategoria(categoriaselect){
      setCategoria(categoriaselect)
    }

    function modificarSillas(sillas){
      setSillasReservar(Number(sillas))
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
            <th>Sillas a reservar</th>
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
                        (sillareservar,index)=>{
                          return(

                            
                            <div key={`default-radio-${index}`}  className="mb-3">
                              <Form.Check 
                                type="radio"
                                name="grupo1"
                                id={index}
                                label={sillareservar.categoria}
                                value={sillareservar.categoria}
                                onChange={

                                    (e)=>{
                                      selectCategoria(e.target.value)
                                    }

                                }
                              />

                              </div>
                            

                          )
                        }
                      )
                    }

                      <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2"># Sillas</InputGroup.Text>
                            <Form.Control
                            id="sillasinput"
                            placeholder="# sillas"
                            aria-label="# sillas"
                            aria-describedby="basic-addon2"
                            onChange={
                                (e)=>{modificarSillas(e.target.value)}
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
