# EVA - Frontend da Plataforma de Gestão de Tarefas

## 📋 Visão Geral

Este repositório contém o código-fonte do frontend da aplicação EVA, uma plataforma moderna de gestão de tarefas que permite aos usuários organizar suas atividades em um quadro Kanban com funcionalidades de arrastar e soltar.

## 🚀 Funcionalidades

- **Interface Kanban**: Organize tarefas em três colunas (A fazer, Em progresso, Feito)
- **Arrastar e Soltar**: Mova tarefas entre colunas para atualizar seu status
- **Gerenciamento de Tarefas**:
  - Criação de novas tarefas
  - Edição de tarefas existentes
  - Exclusão de tarefas
- **Autenticação de Usuários**: Login e registro seguro
- **Design Responsivo**: Interface adaptável para diferentes dispositivos
- **Filtros e Busca**: Encontre tarefas rapidamente

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para construção da interface
- **TypeScript**: Tipagem estática para código mais robusto
- **Vite**: Build tool rápida e moderna
- **Tailwind CSS**: Framework CSS para design eficiente
- **Radix UI**: Componentes acessíveis de interface
- **React Router**: Navegação entre páginas
- **Axios**: Cliente HTTP para comunicação com a API
- **React Icons**: Biblioteca de ícones

## 📦 Estrutura do Projeto

- `src/components`: Componentes reutilizáveis da UI
  - `KanbanBoard`: Implementação do quadro Kanban
  - `TaskCard`: Cards de tarefas
  - `TaskDialog`: Modal para criação e edição de tarefas
  - `TaskFilters`: Filtros de tarefas
  - `ui`: Componentes base como botões, inputs, etc.
- `src/pages`: Páginas principais da aplicação
  - `LoginPage`: Página de login
  - `SignupPage`: Página de cadastro
  - `TaskPage`: Página principal com o quadro Kanban
- `src/services`: Camada de serviços
  - `axios.ts`: Configuração e endpoints da API
  - `helpers`: Funções auxiliares

## 🚀 Como Executar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/oliveirabalsa/eva-fe.git
   cd eva-fe
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com:

   ```
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. **Execute a aplicação**:

   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**:
   Abra o navegador em http://localhost:5173

## 🔧 Integração com o Backend

O frontend comunica-se com o backend Django REST API através dos seguintes endpoints:

- `/auth/token/`: Autenticação e obtenção de token JWT
- `/users/`: Gerenciamento de usuários
- `/tasks/`: CRUD de tarefas

## 📝 Licença

Este projeto está licenciado sob a licença MIT.
