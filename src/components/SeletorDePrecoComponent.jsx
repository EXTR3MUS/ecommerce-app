import React from 'react'
import './SeletorDePrecoComponent.css'

const SeletorDePrecoComponent = (props) => {
    return (
        <div className='seletor-preco-container'>
            <div className="nome-do-filtro">Preço</div>
            <div className="inputs-seletor-preco-container">
                <div className="number-input-container">
                    <input type="number" name="seletor-preco-min" id="seletor-preco-min" min={0} placeholder='0' 
                        value={props.inputMinValue} onChange={props.changeState} state_name={props.min_state_name}/>
                    <div className="number-input-buttons">

                        <button type="button" className="number-input-button" action="increment"
                            onClick={props.changeState} state_name={props.min_state_name}
                        >
                            <i class="fa-solid fa-caret-up" style={{color: "#292929", pointerEvents: 'none'}}></i>
                        </button>

                        <button type="button" className="number-input-button" action="decrement"
                            onClick={props.changeState} state_name={props.min_state_name}
                        >
                            <i class="fa-solid fa-caret-down" style={{color: "#292929", pointerEvents: 'none'}}></i>
                        </button>

                    </div>
                </div>
                <span> à </span>
                <div className="number-input-container">
                    <input type="number" name="seletor-preco-max" id="seletor-preco-max" placeholder='2000' 
                        value={props.inputMaxValue} onChange={props.changeState} state_name={props.max_state_name}/>
                    <div className="number-input-buttons">

                        <button type="button" className="number-input-button" action="increment"
                            onClick={props.changeState} state_name={props.max_state_name}
                        >
                            <i class="fa-solid fa-caret-up" style={{color: "#292929", pointerEvents: 'none'}}></i>
                        </button>

                        <button type="button" className="number-input-button" action="decrement"
                            onClick={props.changeState} state_name={props.max_state_name}
                        >
                            <i class="fa-solid fa-caret-down" style={{color: "#292929", pointerEvents: 'none'}}></i>    
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeletorDePrecoComponent