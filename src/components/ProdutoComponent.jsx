import React from 'react'
import './ProdutoComponent.css'

const ProdutoComponent = (props) => {
  return (
    <div className='produto-container'>
        <div className="produto-imagem">
            <img src={props.imagem} alt={props.nome} />
        </div>
        <div className="produto-nome">{props.nome}</div>
        <div className="produto-preco">R$ {props.preco}</div>
        <div className="produto-descricao"> {props.descricao} </div>
        <div className="produto-adicionar">Adicionar ao carrinho</div>
    </div>
  )
}

export default ProdutoComponent