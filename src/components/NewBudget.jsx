import React, { useState } from 'react'
import Msg from './Msg';

const NewBudget = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = e => {
        e.preventDefault();

        if(!Number(presupuesto) || Number(presupuesto) < 0){
            setMensaje('No es un presupuesto valido');

            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);

    }


  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Presupuesto</label>
                <input
                 type="number"
                 min='1'
                 className='nuevo-presupuesto'
                 placeholder='Añade tu presupuesto'
                 value={ presupuesto ? presupuesto : ''}
                 onChange={ e => setPresupuesto(Number(e.target.value))}
                 />
            </div>

            <input type="submit" value='Añadir' />

            {mensaje && <Msg tipo="error">{mensaje}</Msg>  }
        </form>
    </div>
  )
}

export default NewBudget