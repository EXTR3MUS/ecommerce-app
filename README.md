# ECOMMERCE APP

Aplicativo em React que a partir de um arquivo JSON mostra os produtos e permite a filtragem e busca.

## Fitros dinâmicos
As marcas, categorias e condições são carregadas dinamicamente a partir do arquivo JSON.

## Localização do Json
O arquivo JSON está localizado em `src/data/produtos.json`

## Formato do json
    
```json
    [
    {
        "id": 1,
        "nome": "nome do produto",
        "preco": 2498.00,
        "precoSemDesconto": 3699.00,
        "imagem": "imagem.jpg",
        "descricao": "Loren ipsum dolor sit amet, consectetur adipiscing elit...",
        "marca": "marca do produto",
        "condicao": "New",
        "categoria": "categoria do produto",
        "entregaGratis": false
    },
    {
        "id": 2,
        "nome": "nome do produto",
        "preco": 2498.00,
        "precoSemDesconto": 3699.00,
        "imagem": "imagem.jpg",
        "descricao": "Loren ipsum dolor sit amet, consectetur adipiscing elit...",
        "marca": "marca do produto",
        "condicao": "New",
        "categoria": "categoria do produto",
        "entregaGratis": false
    }
    ]
```