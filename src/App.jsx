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

// importing usestate
import { useState } from 'react';


const App = () => {
    // creating a state
    const [state, setState] = useState({
        promocao: false,
        entrega_gratis: false,
        marcas: [],
        condicao: [],
        categorias: [],
        precoMin: 0,
        precoMax: 0
    });

    // creating a function to change the state of the checkboxes
    const handleFiltroMultiplo = (event) => {
        console.log("changed");

        // getting custom attribute
        const group_name = event.target.getAttribute('group_name');

        // getting the value of the checkbox
        const value = event.target.value;

        // getting the state
        const state_value = state[group_name];

        // checking if the value is already in the state
        const index = state_value.indexOf(value);

        // if the value is already in the state, remove it
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

    const handleFiltroSimples = (event) => {
        console.log("changed");

        // getting custom attribute
        const state_name = event.target.getAttribute('state_name');

        setState({
            ...state,
            [state_name]: event.target.checked
        });
    }



    // creating a function to filter the products
    // const filtroPromocao = (produto) => (produto.precoDesconto !== undefined) && state.promocao;
    const filtroPromocao = (produto) => state.promocao == false ? true : (produto.precoDesconto !== undefined);

    // const filtroFrete = (produto) => (produto.entregaGratis === true) && state.entrega_gratis;
    const filtroFrete = (produto) => state.entrega_gratis == false ? true : (produto.entregaGratis === true);
    
    const filtroMarcas = (produto) => state.marcas.length === 0 ? true : state.marcas.includes(produto.marca);

    const filtroCondicao = (produto) => state.condicao.length === 0 ? true : state.condicao.includes(produto.condicao);
    const filtroCategorias = (produto) => state.categorias.length === 0 ? true : state.categorias.includes(produto.categoria);
    
    const filtroNome = (produto) => produto.nome.toLowerCase().includes('Pro'.toLocaleLowerCase());

    // const filtroNenhum = (produto) => {
    //     // check if all the filters are false
    //     return !state.promocao && !state.entrega_gratis && state.marcas.length === 0 && state.condicao.length === 0 && state.categorias.length === 0;
    // }

    // const filtrosMutualmenteExclusivos = (produto) => {

    //     if (state.entrega_gratis && state.promocao){
    //         return filtroFrete(produto) && filtroPromocao(produto);
    //     }

    //     return (filtroPromocao(produto) || filtroFrete(produto)) || filtroNenhum(produto);
    // }

    const getArrayDeProdutosFiltrado = (arrayDeProdutos) => {
        const filtradoMarcas = arrayDeProdutos.filter(filtroMarcas);
        const filtradoCondicao = arrayDeProdutos.filter(filtroCondicao);
        const filtradoCategorias = arrayDeProdutos.filter(filtroCategorias);
        
        const filtradoPromocao = arrayDeProdutos.filter(filtroPromocao);
        const filtradoFrete = arrayDeProdutos.filter(filtroFrete); 

        // intersecao entre os conjuntos
        const intersecaoMarcas = getIntersectionById(
            filtradoPromocao, filtradoFrete, filtradoMarcas, filtradoCondicao, filtradoCategorias
        );
        // const intersecaoMarcas = getIntersectionById(
        //     filtradoMarcas, filtradoCondicao, filtradoCategorias, filtradoPromocao, filtradoFrete
        // );

        return intersecaoMarcas;
    };

    return (
        <div className="App">
            <HeaderSection />
            <div className="main-container">
                <div className="filtros-section">
                    <FiltroSimplesComponent nome="Promoções" state_name="promocao" changeState={handleFiltroSimples} />
                    <FiltroSimplesComponent nome="Entrega Grátis" state_name="entrega_gratis" changeState={handleFiltroSimples} />

                    <FiltroMultiploComponent nome="Marcas" groupName="marcas" 
                        opcoes={['Evga', 'Redragon', 'Hyper fury', 'Other', 'Msi', 'Corsair']} 
                        changeState={handleFiltroMultiplo}/>

                    <FiltroMultiploComponent nome="Condição" groupName="condicao" 
                        opcoes={['Semi', 'New']} 
                        changeState={handleFiltroMultiplo}/>

                    <FiltroMultiploComponent nome="Categorias" groupName="categorias" 
                        opcoes={['Placa de vídeo', 'Teclado', 'Headset', 'Jogo']} 
                        changeState={handleFiltroMultiplo}/>

                    <SeletorDePrecoComponent />
                </div>

                {/* sobre os filtros, entre grupos diferentes de checkboxes usar a logica "e" e dentro deles "ou"
                    usar conjuntos para fazer a interseção entre os conjuntos e uniao entre os conjuntos
                */}
                <div className="produtos-section">
                    { 
                    // array_de_produtos.filter(filtrosMutualmenteExclusivos)
                    // .filter(filtroFrete)
                    // .filter(filtroCondicao)
                    // .filter(filtroNome)
                    getArrayDeProdutosFiltrado(array_de_produtos)
                    .map((produto) => {
                        return (
                            <ProdutoComponent
                                key={produto.id}
                                nome={produto.nome}
                                precoDesconto={produto.precoDesconto}
                                taxaDesconto={produto.taxaDesconto}
                                preco={produto.preco}
                                imagem={produto.imagem}
                                descricao={produto.descricao}
                                entregaGratis={produto.entregaGratis}
                            />
                        );
                    }) }
                </div>
            </div>
        </div>
    );
}

export default App;
