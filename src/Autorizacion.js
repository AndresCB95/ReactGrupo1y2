import { useState } from "react"
import { Fragment } from "react"

const Autorizacion = (ComponenteValid, rolesPermitidos) =>{

    const [usuario, setUsuario] = useState({idUsuario:"1234", role:"USER"})

    return(
        <>
        {
            rolesPermitidos.includes(usuario.role) ? <ComponenteValid /> :<h1>Pagina No permitida</h1>
        }
        
        </>
    )

} 

export default Autorizacion