import {
    HeaderSection, 
    ProdutoComponent, 
    FiltroSimplesComponent, 
    FiltroMultiploComponent,
    SeletorDePrecoComponent
} from './components/components.js';

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
    const handleCheckboxGroup = (event) => {

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
    const filtroPromocao = (produto) => (produto.precoDesconto !== undefined) && state.promocao;
    const filtroFrete = (produto) => (produto.entregaGratis === true) && state.entrega_gratis;
    const filtroCondicao = (produto) => state.marcas.includes(produto.condicao);
    const filtroNome = (produto) => produto.nome.toLowerCase().includes('Pro'.toLocaleLowerCase());
    const filtroMarcas = (produto) => state.marcas.includes(produto.marca);
    const filtroCategorias = (produto) => state.categorias.includes(produto.categoria);

    const filtroNenhum = (produto) => {
        // check if all the filters are false
        return !state.promocao && !state.entrega_gratis && state.marcas.length === 0 && state.condicao.length === 0 && state.categorias.length === 0;
    }

    const filtrosMutualmenteExclusivos = (produto) => {

        if (state.entrega_gratis && state.promocao){
            return filtroFrete(produto) && filtroPromocao(produto);
        }

        return (filtroPromocao(produto) || filtroFrete(produto)) || filtroNenhum(produto);
    }

    return (
        <div className="App">
            <HeaderSection />
            <div className="main-container">
                <div className="filtros-section">
                    <FiltroSimplesComponent nome="Promoções" state_name="promocao" changeState={handleFiltroSimples} />
                    <FiltroSimplesComponent nome="Entrega Grátis" state_name="entrega_gratis" changeState={handleFiltroSimples} />

                    <FiltroMultiploComponent nome="Marcas" groupName="marcas" opcoes={['Evga', 'Redragon', 'Hyper fury', 'Other', 'Msi', 'Corsair']} />
                    <FiltroMultiploComponent nome="Condição" groupName="condicao" opcoes={['Semi', 'New']} />
                    <FiltroMultiploComponent nome="Categorias" groupName="categorias" opcoes={['Placa de vídeo', 'Teclado', 'Headset', 'Jogo']} />

                    <SeletorDePrecoComponent />
                </div>

                {/* sobre os filtros, entre grupos diferentes de checkboxes usar a logica "e" e dentro deles "ou"
                    usar conjuntos para fazer a interseção entre os conjuntos e uniao entre os conjuntos
                */}
                <div className="produtos-section">
                    { array_de_produtos.filter(filtrosMutualmenteExclusivos)
                    // .filter(filtroFrete)
                    // .filter(filtroCondicao)
                    // .filter(filtroNome)
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
