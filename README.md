# API Gemini - CRUD

Este repositório contém uma API desenvolvida para gerenciar dados utilizando operações CRUD (Create, Read, Update, Delete). A API é construída com Node.js e TypeScript, utilizando o framework Express para roteamento e gerenciamento de requisições. O projeto inclui funcionalidades para gerenciamento de categorias e templates, além de documentação interativa via Swagger.

## Funcionalidades

- **Gerenciamento de Categorias:** Operações CRUD completas para categorias.
- **Gerenciamento de Templates:** Operações CRUD completas para templates.
- **Documentação Interativa:** Acesso à documentação da API via Swagger UI.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- Swagger UI
- Jest (para testes)

## Como Começar

Siga os passos abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 14 ou superior)
- npm ou Yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/devluccalima/API_GEMINI.git
   cd API_GEMINI
   git checkout api_gemini_w/_CRUD
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou yarn install
   ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm start
# ou yarn start
```

A API estará disponível em `http://localhost:3000`. A documentação do Swagger estará acessível em `http://localhost:3000/api-docs`.

## Endpoints da API

### Categorias

- `GET /categories`: Lista todas as categorias.
- `GET /categories/:id`: Retorna uma categoria específica pelo ID.
- `POST /categories`: Cria uma nova categoria.
- `PUT /categories/:id`: Atualiza uma categoria existente.
- `DELETE /categories/:id`: Exclui uma categoria.

### Templates

- `GET /templates`: Lista todos os templates.
- `GET /templates/:id`: Retorna um template específico pelo ID.
- `POST /templates`: Cria um novo template.
- `PUT /templates/:id`: Atualiza um template existente.
- `DELETE /templates/:id`: Exclui um template.

## Testes

Para executar os testes do projeto:

```bash
npm test
# ou yarn test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

