import React from 'react'
import './CartComponent.css'

let MoedaFmt = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const CartComponent = (props) => {
    const getTotal = () => {
        let total = 0;
        props.produtos.forEach((produto) => {
            total += produto.preco.toFixed(2) * produto.qtd;
        });
        return total;
    }

    const formatNome = (nome) => {
        if (nome.length > 22) {
            return nome.slice(0, 22) + '...'
        }
        return nome
    }

  return (
    <div className='cart-container'>
        <div className="produtos-cart-container">
            {props.produtos.length === 0 && <div className="cart-vazio">Seu carrinho está vazio</div>}
            {props.produtos.map((produto) => {
                return (
                    <div className="produto-cart-container" key={produto.id}>
                        <div className="produto-cart-imagem">
                            <img src={produto.imagem} alt={produto.nome} />
                        </div>

                        <div className="produto-cart-nome-valor">
                            <div className="produto-cart-nome">{formatNome(produto.nome)}</div>
                            <div className="produto-cart-valor-total">{produto.qtd}x <span className='produto-cart-valor'>{MoedaFmt.format(produto.preco)}</span></div>
                        </div>

                        
                        <button type="button" className="produto-cart-remover" onClick={props.removerProduto} value={produto.id}>
                            <i class="fa-solid fa-times cart-remover-icon"></i>
                        </button>
                    </div>
                );
            })}
        </div>
        <div className="total-cart-container">
            <span>Total</span>
            <span className="total-cart-valor">{MoedaFmt.format(getTotal())}</span>
        </div>
    </div>
  )
}

export default CartComponent