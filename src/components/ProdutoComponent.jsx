import React from 'react'
import './ProdutoComponent.css'

let MoedaFmt = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const ProdutoComponent = (props) => {
  return (
    <div className='produto-container'>
        <div className="produto-imagem">
            <img src={props.imagem} alt={props.nome} />
        </div>
        <div className="produto-nome">{props.nome}</div>

        { props.precoDesconto && 
            <div className="preco-desconto-container">
                <div className="produto-preco-desconto">{MoedaFmt.format(props.precoDesconto)}</div>
                <div className="produto-taxa-desconto">{props.taxaDesconto}%</div>
            </div>
        }

        <div className="produto-preco">{MoedaFmt.format(props.preco)}</div>
        { props.entregaGratis && 
            <div className="produto-entrega-gratis">
                Entrega grátis 
                <i class="fa-solid fa-truck-fast" style={{color: "#0b8e4b"}}></i>
            </div>
        }
        <div className="produto-descricao"> {props.descricao} </div>
        <div className="produto-adicionar">
            <button className="button-produto-adicionar">Adicionar ao carrinho</button>
        </div>
    </div>
  )
}

export default ProdutoComponent