import React from 'react'
import './HeaderSection.css'

const HeaderSection = () => {
  return (
    <div className='header'>
        <div className="logo-header">My company</div>
        <div className="busca-header">
            <span>Busque seu produto</span>
            <input className='input-busca' type="text" />
        </div>
        <div className="carrinho-header">
          <i class="fa-solid fa-cart-shopping" style={{color: "#5f5f5f"}}></i>
          <div className="qtd-carrinho-header">0</div>
        
        </div>
    </div>
  )
}

export default HeaderSection