import React from 'react'
import './FiltroSimplesComponent.css'

const FiltroSimplesComponent = (props) => {
  return (
    <div className='filtro-simples-container'>
        <div className="nome-do-filtro-simples">{props.nome}</div>
        <input type="checkbox" onChange={props.changeState} state_name={props.state_name}/>
    </div>
  )
}

export default FiltroSimplesComponent