import React from 'react'
import Spend from './Spend'

const SpendList = ({
    gastos, 
    setGastoEditar, 
    eliminarGasto,
    filtro, 
    gastosFiltrados
}) => {
return (
    <div className="listado-gastos contenedor">
        

        { filtro ? (
                <>
                    <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta categoría'}</h2>
                    {gastosFiltrados.map( gasto => (
                        <Spend 
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                    <p className='instruccion'>{gastos.length ? 'desliza hacia a la izquierda para eliminar, a la derecha para editar.' : ''}</p>
                    {gastos.map( gasto => (
                        <Spend 
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            )
        }
    </div>
)
}

export default SpendList