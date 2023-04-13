import React, {useState, useEffect, useRef} from 'react'
import './HeaderSection.css'

import { CartComponent, OutsideDetector } from './components.js'

const HeaderSection = (props) => {
  const [showCart, setShowCart] = useState(false)
  const childRef = useRef()

  useEffect(() => {
    // Attach event listener to document when child is visible
    if (showCart) {
      document.addEventListener('click', handleClickOutside);
    }

    // Detach event listener from document when child is hidden
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCart]);


  const handleClickOutside = (event) => {
    // If click is outside child, hide child
    if (childRef.current && !childRef.current.contains(event.target)) {
      setShowCart(false);
    }
  };

  const toggleCart = () => setShowCart(!showCart)

  const getNumberOfProducts = () => {
    let qtd = 0;
    props.produtos.forEach((produto) => {
      qtd += produto.qtd;
    });
    return qtd;
  }
  
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
        <button onClick={toggleCart}></button>
        <div className="carrinho-header">
          <i class="fa-solid fa-cart-shopping" style={{color: "#5f5f5f", fontSize: "1.5rem"}} onClick={toggleCart}></i>
          <div className="qtd-carrinho-header" style={{pointerEvents: "none"}}>{getNumberOfProducts()}</div>

          {showCart && (
              <OutsideDetector toggleCart={toggleCart}>
                <CartComponent produtos={props.produtos} removerProduto={props.removerProduto}/>
              </OutsideDetector>
            )
          }
        </div>
    </div>
  )
}

export default HeaderSection