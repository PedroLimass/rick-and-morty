# Rick and Morty Explorer

Aplicação web (SPA) para explorar o universo da série **Rick and Morty**: busca de personagens, navegação por episódios (com filtro por temporada) e exploração de lugares famosos com filtros por nome, tipo e dimensão.

Os dados são consumidos da [Rick and Morty API](https://rickandmortyapi.com/) pública.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Testes](#testes)
- [Decisões técnicas](#decisões-técnicas)

## Funcionalidades

- **Personagens**: busca por nome com filtros de status (Vivo / Morto / Desconhecido) e gênero. Cada card abre um modal com detalhes e personagens relacionados.
- **Episódios**: lista todos os episódios agrupados por temporada, com busca por nome (em todas as temporadas ou na selecionada) e contagem de personagens por episódio.
- **Lugares Famosos**: lista paginada de locais com busca por nome (com _debounce_) e filtros por tipo e dimensão, populados dinamicamente a partir dos dados reais da API.
- Estados de **carregamento** e **erro** em todas as telas que consomem a API.

## Tecnologias

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (modo `strict`)
- [Vite](https://vite.dev/) — bundler e dev server
- [React Router](https://reactrouter.com/) — roteamento
- [MUI](https://mui.com/) e [styled-components](https://styled-components.com/) — UI e estilização
- [Axios](https://axios-http.com/) — cliente HTTP
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — testes

## Pré-requisitos

- **Node.js** 20.19+ (recomendado) ou superior
- **npm** 10+

## Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Crie o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000` (ou na próxima porta livre).

Para gerar a versão de produção:

```bash
npm run build      # gera os arquivos otimizados em dist/
npm run preview    # serve o build localmente para conferência
```

## Variáveis de ambiente

| Variável       | Descrição                       | Valor padrão                          |
| -------------- | ------------------------------- | ------------------------------------- |
| `VITE_API_URL` | URL base da Rick and Morty API. | `https://rickandmortyapi.com/api`     |

As variáveis ficam no arquivo `.env` na raiz. Use o `.env.example` como referência.

## Scripts disponíveis

| Script                  | Descrição                                            |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Inicia o servidor de desenvolvimento (Vite).         |
| `npm run build`         | Gera o build de produção em `dist/`.                 |
| `npm run preview`       | Serve o build de produção localmente.                |
| `npm test`              | Roda os testes em modo _watch_ (Vitest).             |
| `npm run test:coverage` | Roda os testes uma vez e gera o relatório de cobertura. |
| `npm run typecheck`     | Verifica os tipos com o TypeScript, sem emitir nada. |

## Estrutura do projeto

```
src/
├── Assets/            # Imagens, logos e ícones (SVG/PNG)
├── Components/        # Componentes reutilizáveis (Header, Cards, Modal, etc.)
├── Pages/             # Páginas/rotas (Home, Character, EpisodeList, FamousPlaces)
├── Routes/            # Definição das rotas da aplicação
├── Services/          # Camada de acesso à API (axios + funções tipadas)
├── Styles/            # Tema de cores e estilos globais
├── Utils/             # Funções utilitárias (datas, status, parsing de URL)
├── hooks/             # Custom hooks de dados (useEpisodes, useLocations, etc.)
├── types/             # Tipos TypeScript da API
├── mock/              # Mocks usados nos testes
├── App.tsx            # Componente raiz
└── index.tsx          # Ponto de entrada da aplicação
```

Cada componente e página segue o padrão de pasta com `index.tsx` (lógica/JSX) e `styles.ts` (estilos com styled-components).

## Arquitetura

O consumo da API é organizado em três camadas para manter os componentes limpos e a lógica testável:

1. **Services** (`src/Services`) — funções puras e tipadas que falam com a API via Axios. Usam os **endpoints em lote** da API (ex.: `/character/[1,2,3]`) para evitar o problema N+1, buscando vários recursos numa única requisição.
2. **Hooks** (`src/hooks`) — encapsulam o estado de cada tela (`loading`, `error`, dados, paginação). São **idempotentes** e usam `AbortController` para cancelar requisições obsoletas, evitando _race conditions_.
3. **Componentes/Páginas** — apenas consomem os hooks e renderizam a UI.

Hooks de destaque:

- `useEpisodes` — carrega todos os episódios (páginas em paralelo), agrupa por temporada e resolve a imagem representativa de cada episódio.
- `useLocations` — paginação de locais com filtros por nome/tipo/dimensão; trata o `404` da API como "nenhum resultado".
- `useLocationOptions` — deriva (e cacheia) os valores reais de tipo e dimensão para alimentar os filtros.
- `useDebounce` — adia a atualização de um valor (usado nas barras de busca para reduzir requisições).

## Testes

O projeto usa **Vitest** com **Testing Library** e ambiente `jsdom`.

```bash
npm test                 # modo watch
npm run test:coverage    # roda uma vez + relatório de cobertura
```

A suíte cobre serviços, hooks, utilitários e componentes/páginas (renderização, busca, filtros, fallbacks de imagem e tratamento de erros).

## Decisões técnicas

- **Vite no lugar do Create React App**: CRA está descontinuado; o Vite oferece dev server mais rápido e build moderno.
- **Batch requests**: as imagens de episódios e locais são buscadas em lote, em vez de uma requisição por item, reduzindo drasticamente o número de chamadas à API.
- **TypeScript em modo `strict`**: tipos da API centralizados em `src/types`, garantindo segurança em toda a camada de dados.
- A imagem representativa de cada episódio usa o **último personagem** da lista (varia entre episódios e sempre existe), evitando imagens repetidas ou quebradas.

---

> Este projeto é um trabalho de portfólio e não tem afiliação oficial com a série Rick and Morty. Dados fornecidos pela [Rick and Morty API](https://rickandmortyapi.com/).
