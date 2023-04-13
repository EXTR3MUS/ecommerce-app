import {
    HeaderSection, 
    ProdutoComponent, 
    FiltroSimplesComponent, 
    FiltroMultiploComponent,
    SeletorDePrecoComponent
} from './components/components.js';

import {union, getIntersectionById} from './utils.js';

import './App.css';
import array_de_produtos from './data/produtos.json';

import { useState, useEffect } from 'react';
import CartComponent from './components/CartComponent.jsx';


const App = () => {
    // criando estados
    const [state, setState] = useState({
        promocao: false,
        entrega_gratis: false,
        marcas: [],
        condicao: [],
        categorias: [],
        precoMin: "",
        precoMax: "",
        nome: "",

        filtros_marcas: [],
        filtros_condicao: [],
        filtros_categorias: [],

        cart: []
    });

    // criando funcao para criar os campos dos filtros a partir do json
    useEffect(() => {
        console.log(array_de_produtos.map((obj) => obj.imagem));

        setState({
            ...state,
            filtros_marcas: getMarcasFromJson(array_de_produtos),
            filtros_condicao: getCondicoesFromJson(array_de_produtos),
            filtros_categorias: getCategoriasFromJson(array_de_produtos),

            cart: []
        });
    }, []);

    const getMarcasFromJson = (arrayDeProdutos) => {
        const marcas = arrayDeProdutos.map((produto) => produto.marca);
        return Array.from(union(marcas, marcas));
    }

    const getCondicoesFromJson = (arrayDeProdutos) => {
        const condicoes = arrayDeProdutos.map((produto) => produto.condicao);
        return Array.from(union(condicoes, condicoes));
    }

    const getCategoriasFromJson = (arrayDeProdutos) => {
        const categorias = arrayDeProdutos.map((produto) => produto.categoria);
        return Array.from(union(categorias, categorias));
    }

    // criando funcao para lidar com a troca de estado dos filtros multiplos
    const handleFiltroMultiplo = (event) => {
        console.log("changed");

        const group_name = event.target.getAttribute('group_name');

        const value = event.target.value;

        const state_value = state[group_name];

        const index = state_value.indexOf(value);

        // se ja existe o valor, remover
        if (index > -1){
            state_value.splice(index, 1);
        } else {
            state_value.push(value);
        }

        setState({
            ...state,
            [group_name]: state_value
        });
    }

    const handleAddToCart = (event) => {
        const id = event.target.getAttribute('productId');

        console.log('product_id', id)
        console.log('event.target', event.target)

        const produto = array_de_produtos.find((produto) => produto.id === parseInt(id));

        const cart = state.cart;

        const index = cart.findIndex((produto) => produto.id === parseInt(id));

        if (index > -1){
            cart[index].qtd = cart[index].qtd + 1;
        } else {
            cart.push({...produto, qtd: 1});
        }

        setState({
            ...state,
            cart: cart
        });
    }

    const handleRemoveFromCart = (event) => {
        const id = event.target.getAttribute('value');

        const cart = state.cart;

        const index = cart.findIndex((produto) => produto.id === parseInt(id));

        if (index > -1){
            cart[index].qtd = cart[index].qtd - 1;
            if (cart[index].qtd === 0){
                cart.splice(index, 1);
            }
        }

        setState({
            ...state,
            cart: cart
        });
    }

    const handleFiltroSimples = (event) => {
        console.log("changed");

        // capturando valor do atributo customizado
        const state_name = event.target.getAttribute('state_name');

        setState({
            ...state,
            [state_name]: event.target.checked
        });
    }

    const handleSeletorDePreco = (event) => {
        let value = 0;

        // checar se o botão foi clicado
        if (event.target.tagName === "BUTTON"){
            value = parseInt(event.target.parentElement.previousElementSibling.value);
            value = isNaN(value) ? 0 : value;
            if (event.target.getAttribute('action') === "increment"){
                value = value + 1;
            } else if(value > 0){
                value = value - 1;
            }
        } else {
            value = parseInt(event.target.value);
        }

        console.log('value', value)
        
        // capturando valor do atributo customizado
        const state_name = event.target.getAttribute('state_name');

        setState({
            ...state,
            [state_name]: value
        });
    }

    const handleBusca = (event) => {
        let value = ""

        // checar se o clique foi no botao de pesquisa
        if (event.target.tagName === "I"){
            // capturar valor do input
            value = event.target.previousElementSibling.value;
        } else {
            value = event.target.value;
        }

        setState({
            ...state,
            nome: value
        });
    }


    // criando funcoes de fitro, internamente cada filtro usa a logica "ou"
    // ja entre o conjunto de filtros usa-se a logica "e"
    const filtroPromocao = (produto) => state.promocao === false ? true : (produto.precoSemDesconto !== undefined);
    const filtroFrete = (produto) => state.entrega_gratis === false ? true : (produto.entregaGratis === true);
    const filtroMarcas = (produto) => state.marcas.length === 0 ? true : state.marcas.includes(produto.marca);
    const filtroCondicao = (produto) => state.condicao.length === 0 ? true : state.condicao.includes(produto.condicao);
    const filtroCategorias = (produto) => state.categorias.length === 0 ? true : state.categorias.includes(produto.categoria);
    
    const fitroPreco = (produto) => {  
        if (!state.precoMin && !state.precoMax){
            return true;
        } else if (!state.precoMin && state.precoMax){
            return produto.preco <= state.precoMax;
        } else if (state.precoMin && !state.precoMax){
            return produto.preco >= state.precoMin;
        } else {
            return produto.preco >= state.precoMin && produto.preco <= state.precoMax;
        }
    }

    const filtroNome = (produto) => state.nome === "" ? true : produto.nome.toLowerCase().includes(state.nome.toLowerCase());

    // criando funcao para obter a intersecao entre os conjuntos
    const getArrayDeProdutosFiltrado = (arrayDeProdutos) => {
        const filtradoMarcas = arrayDeProdutos.filter(filtroMarcas);
        const filtradoCondicao = arrayDeProdutos.filter(filtroCondicao);
        const filtradoCategorias = arrayDeProdutos.filter(filtroCategorias);
        const filtradoPromocao = arrayDeProdutos.filter(filtroPromocao);
        const filtradoFrete = arrayDeProdutos.filter(filtroFrete); 
        const filtradoPreco = arrayDeProdutos.filter(fitroPreco);
        const filtradoNome = arrayDeProdutos.filter(filtroNome);

        // intersecao entre os conjuntos
        const intersecaoMarcas = getIntersectionById(
            filtradoPromocao, filtradoFrete, filtradoMarcas, filtradoCondicao, filtradoCategorias,
            filtradoPreco, filtradoNome
        );

        return intersecaoMarcas;
    };

    return (
        <div className="App" style={{height: 120+array_de_produtos.length*470+"px"}}>
            <HeaderSection changeState={handleBusca} inputValue={state.nome} produtos={state.cart} removerProduto={handleRemoveFromCart} />
            <div className="main-container">
                <div className="filtros-section">
                    <FiltroSimplesComponent nome="Promoções" state_name="promocao" changeState={handleFiltroSimples} />
                    <FiltroSimplesComponent nome="Entrega Grátis" state_name="entrega_gratis" changeState={handleFiltroSimples} />

                    {state.filtros_marcas.length > 0 &&
                        <FiltroMultiploComponent nome="Marcas" groupName="marcas"
                            opcoes={state.filtros_marcas}
                            changeState={handleFiltroMultiplo} />
                    }
                    
                    {state.filtros_condicao.length > 0 &&
                        <FiltroMultiploComponent nome="Condição" groupName="condicao"
                            opcoes={state.filtros_condicao}
                            changeState={handleFiltroMultiplo} />
                    }

                    {state.filtros_categorias.length > 0 &&
                        <FiltroMultiploComponent nome="Categorias" groupName="categorias"
                            opcoes={state.filtros_categorias}
                            changeState={handleFiltroMultiplo} />
                    }

                    <SeletorDePrecoComponent min_state_name="precoMin" max_state_name="precoMax"
                        changeState={handleSeletorDePreco} inputMinValue={state.precoMin} inputMaxValue={state.precoMax} />
                </div>

                <div className="produtos-section">
                    { getArrayDeProdutosFiltrado(array_de_produtos).map((produto) => {
                        return (
                            <ProdutoComponent
                                key={produto.id}
                                productId={produto.id}
                                nome={produto.nome}
                                precoSemDesconto={produto.precoSemDesconto}
                                taxaDesconto={produto.taxaDesconto}
                                preco={produto.preco}
                                imagem={produto.imagem}
                                descricao={produto.descricao}
                                entregaGratis={produto.entregaGratis}
                                addToCart={handleAddToCart}
                            />
                        );
                    }) }
                </div>
            </div>
        </div>
    );
}

export default App;
