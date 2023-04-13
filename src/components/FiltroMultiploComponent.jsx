import React from 'react'
import './FiltroMultiploComponent.css'

// essa funcao recebe uma funcao changeState para mudar o estado do componente pai

const FiltroMultiploComponent = (props) => {
  return (
    <div className='filtro-multiplo-container'>
        <div className="nome-do-filtro">{props.nome}</div>
        
        <div className="opcoes-do-filtro">
            {props.opcoes.map((opcao) => {
                return (
                    <div className="opcao-do-filtro">
                        <input type="checkbox" group_name={props.groupName} onChange={props.changeState} value={opcao} />
                        <span>{opcao}</span>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default FiltroMultiploComponent