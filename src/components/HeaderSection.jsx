import React from 'react'
import './HeaderSection.css'

const HeaderSection = (props) => {
  return (
    <div className='header'>
        <div className="logo-header">My company</div>
        <div className="busca-header">
            <span>Busque seu produto</span>
            <div className="busca-container">
              <input className='input-busca' type="text" value={props.nome} onChange={props.changeState} />
              <i class="fa-solid fa-search" style={{color: "#3636ac"}} onClick={props.changeState}></i>
            </div>
        </div>
        <div className="carrinho-header">
          <i class="fa-solid fa-cart-shopping" style={{color: "#5f5f5f"}}></i>
          <div className="qtd-carrinho-header">0</div>
        
        </div>
    </div>
  )
}

export default HeaderSection