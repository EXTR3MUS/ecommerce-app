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
        <div className="carrinho-header">C</div>
    </div>
  )
}

export default HeaderSection