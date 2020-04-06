import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid'
import PropTypes from 'prop-types'


const  Formulario = ({crearCita}) =>{

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })
    const [error, actualizarError] = useState(false)
// Funcion para actualizar los datos    
const actualizarState = e => {
    actualizarCita({
        ...cita,
        [e.target.name] : e.target.value
    })
}

// Extraer Valores 
const {mascota, propietario,fecha,hora,sintomas} = cita

const submitCita = e => {
    e.preventDefault();

    // Validar 
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
        actualizarError(true)
        return;
    }
    actualizarError(false)
    // ASIGNAR UN ID
    cita.id = uuidv4() 

    // CREAR LA CITA

    crearCita(cita);

    // REINICIAR EL FORM
    actualizarCita({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })
}



    return(
       <Fragment>
           <h2>Crear Cita</h2>
           {error ? <p className="alerta-error">Todos los campos son obligatorios</p>  : null}
           <form
            onSubmit={submitCita}
           
           >
               <label >Nombre de Mascota</label>   
               <input 
                   type= 'text'
                   name= "mascota"
                   className= "u-full-width"
                   placeholder= 'Nombre Mascota'
                   onChange={actualizarState}
                   value={mascota}
               />
               <label >Nombre Dueño</label>   
               <input 
                   type= 'text'
                   name= "propietario"
                   className= "u-full-width"
                   placeholder= 'Nombre Dueño de la mascota'
                   onChange={actualizarState}
                   value={propietario}
               />
               <label >Fecha</label>   
               <input 
                   type= 'date'
                   name= "fecha"
                   className= "u-full-width"
                   onChange={actualizarState}
                   value={fecha}
               />
               <label >Hora</label>   
               <input 
                   type= 'time'
                   name= "hora"
                   className= "u-full-width"
                   onChange={actualizarState}
                   value={hora}
               />
               <label>Síntomas</label>
               <textarea
                name= "sintomas"
                   className= "u-full-width"
                   onChange={actualizarState}
                   value={sintomas}
               >
               </textarea>
               <button
                type='submit'
                className='u-full-width button-primary'
               >Agregar Cita</button>
           </form>
       </Fragment>
    );
}

// Sirve para documentar los props que se estan pasando
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario