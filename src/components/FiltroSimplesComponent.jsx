import React from 'react'
import './FiltroSimplesComponent.css'

const FiltroSimplesComponent = (props) => {
  return (
    <div className='filtro-simples-container'>
        <div className="nome-do-filtro-simples">{props.nome}</div>
        <input type="checkbox" />
    </div>
  )
}

export default FiltroSimplesComponent