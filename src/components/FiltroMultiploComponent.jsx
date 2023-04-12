import React from 'react'
import './FiltroMultiploComponent.css'

const FiltroMultiploComponent = (props) => {
  return (
    <div className='filtro-multiplo-container'>
        <div className="nome-do-filtro">{props.nome}</div>
        
        <div className="opcoes-do-filtro">
            {props.opcoes.map((opcao) => {
                return (
                    <div className="opcao-do-filtro">
                        <input type="checkbox" />
                        <span>{opcao}</span>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default FiltroMultiploComponent