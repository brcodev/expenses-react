import React from 'react'

const Msg = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}` }>{children}</div>
  )
}

export default Msg