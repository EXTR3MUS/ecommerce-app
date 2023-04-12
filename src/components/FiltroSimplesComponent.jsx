import React from 'react'

const FiltroSimplesComponent = (props) => {
  return (
    <div className='filtro-simples-container'>
        <div className="nome-do-filtro">{props.nome}</div>
        <input type="checkbox" />
    </div>
  )
}

export default FiltroSimplesComponent