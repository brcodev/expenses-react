import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Swal from 'sweetalert2'

const BudgetControl = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se reseteará la App",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Resetear'
          }).then((result) => {
            if (result.isConfirmed) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
              Swal.fire(
                'Resetear',
                'Presupuesto reseteado',
                'success'
              )
            }
          })


        
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)

        }
    }

    useEffect (() => {
        
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = ((( presupuesto -  totalDisponible) / presupuesto ) * 100).toFixed(2);

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 800)
        

    }, [gastos])


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}%`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button
                 className='reset-app'
                 type='button'
                 onClick={handleResetApp} >
                    Resetear App
                </button>
                <p>

                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : '' }`}>

                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : '' }`}>

                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>


            </div>

        </div>
    )
}

export default BudgetControl