import { useEffect, useState } from 'react'
import Header from './components/Header'
import IconGasto from './assets/img/nuevo-gasto.svg'
import Modal from './components/Modal';

import { generarId } from './helpers';
import SpendList from './components/SpendList';
import Filter from './components/Filter';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? ''
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);


      setTimeout(() => {
        setAnimarModal(true)
      }, 200)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])


  useEffect(() => {
    if(filtro){
      const gastosFiltrado = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrado)
    }
  }, [filtro])


  const guardarGasto = gasto => {
    if (gasto.id) {

      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})

    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500)
  }

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 200)
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (

        <>

          <main>

            <Filter
              filtro={filtro}
              setFiltro={setFiltro}
            
            />

            <SpendList

              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}

            />

          </main>

          <div className='nuevo-gasto'>
            <img src={IconGasto} alt="icono nuevo gasto"
              onClick={handleNuevoGasto}

            />


          </div>

        </>

      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>

  )
}

export default App
