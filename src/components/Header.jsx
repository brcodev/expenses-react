import React from 'react'
import NewBudget from './NewBudget'
import BudgetControl from './BudgetControl'

const Header = ({
    presupuesto,
    setPresupuesto, 
    isValidPresupuesto,
    setIsValidPresupuesto,
    gastos,
    setGastos
}) => {
    return (
        <header>
            <h1>Planificador</h1>

            {isValidPresupuesto ? (
                <BudgetControl
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    gastos={gastos}
                    setGastos={setGastos}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                
                />
            ) : (

                <NewBudget
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            ) }
            
        </header>
    )
}

export default Header