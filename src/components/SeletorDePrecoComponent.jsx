import React from 'react'
import './SeletorDePrecoComponent.css'

const SeletorDePrecoComponent = () => {
  return (
    <div className='seletor-preco-container'>
      <div className="nome-do-filtro">Preço</div>
      <div className="inputs-seletor-preco-container">
        <input type="number" name="seletor-preco-min" id="seletor-preco-min" />
        <span> à </span>
        <input type="number" name="seletor-preco-max" id="seletor-preco-max" />
      </div>
    </div>
  )
}

export default SeletorDePrecoComponent