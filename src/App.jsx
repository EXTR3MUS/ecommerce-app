import {
    HeaderSection, 
    ProdutoComponent, 
    FiltroSimplesComponent, 
    FiltroMultiploComponent
} from './components/components.js';

import './App.css';


const array_de_produtos = [
    {
        id: 1,
        nome: 'Produto 1',
        preco: "10,00",
        imagem: 'https://picsum.photos/300/200',
        descricao: "Loren ipsum dolor sit amet, consectetur adipiscing elit..."
    },
    {
        id: 2,
        nome: 'Produto 2',
        preco: "20,00",
        imagem: 'https://picsum.photos/300/200',
        descricao: "Loren ipsum dolor sit amet, consectetur adipiscing elit..."
    }
];


const App = () => {
    return (
        <div className="App">
            <HeaderSection />
            <div className="main-container">
                <div className="filtros-section">
                    <FiltroMultiploComponent nome="Cor" opcoes={['Azul', 'Vermelho', 'Verde']} />
                </div>
                <div className="produtos-section">
                    {array_de_produtos.map((produto) => {
                        return (
                            <ProdutoComponent
                                key={produto.id}
                                nome={produto.nome}
                                preco={produto.preco}
                                imagem={produto.imagem}
                                descricao={produto.descricao}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
