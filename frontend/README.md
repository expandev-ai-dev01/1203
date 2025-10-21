# Lista de Compras

Aplicativo para adicionar itens de compras e marcar os que já foram comprados.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Ponto de entrada
│   ├── providers.tsx      # Provedores globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── domain/               # Domínios de negócio
├── core/                 # Componentes e utilitários compartilhados
│   ├── components/       # Componentes UI genéricos
│   ├── lib/             # Configurações de bibliotecas
│   ├── utils/           # Funções utilitárias
│   └── types/           # Tipos TypeScript globais
└── assets/              # Recursos estáticos
    └── styles/          # Estilos globais
```

## Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento em http://localhost:3001

### Build
```bash
npm run build
```
Cria a versão de produção otimizada

### Preview
```bash
npm run preview
```
Visualiza a versão de produção localmente

### Lint
```bash
npm run lint
```
Executa o ESLint para verificar problemas no código

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

## Funcionalidades

- ✅ Adicionar itens à lista de compras
- ✅ Marcar itens como comprados
- ✅ Visualizar lista de compras
- ✅ Remover itens da lista
- ✅ Editar itens da lista

## Arquitetura

O projeto segue uma arquitetura modular baseada em domínios:

- **App**: Configuração e inicialização da aplicação
- **Pages**: Componentes de página para roteamento
- **Domain**: Lógica de negócio organizada por domínio
- **Core**: Componentes e utilitários reutilizáveis

## Padrões de Código

- TypeScript para type safety
- React Hooks para gerenciamento de estado
- TanStack Query para gerenciamento de estado do servidor
- React Hook Form + Zod para validação de formulários
- TailwindCSS para estilização
- Componentes funcionais com JSDoc

## Licença

Todos os direitos reservados.