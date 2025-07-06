# API de Gerenciamento de Veículos 🚗

Esta é a API responsável pelo backend do sistema de gerenciamento de veículos, permitindo cadastrar, listar, editar, arquivar, desarquivar e excluir veículos. Também fornece estatísticas dos veículos ativos, inativos e o total geral.

## 🧪 Tecnologias utilizadas

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Dotenv
- Cors
- Bcrypt
- JWT (autenticação)

## ▶️ Como rodar o projeto

1. **Clone o repositório:**

bash
git clone https://github.com/LaisaAlb/GerenciamentoDeVeiculosBack.git
Instale as dependências:

bash
Copiar
Editar
npm install
Configure o arquivo .env:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

ini
Copiar
Editar
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
PORT=3001
Rode as migrations e gere o client do Prisma:

bash
Copiar
Editar
npx prisma migrate dev
npx prisma generate
Inicie o servidor:

bash
Copiar
Editar
npm run dev
A API ficará disponível em: http://localhost:3001

📌 Funcionalidades
Cadastro de usuários

Autenticação com token JWT

Cadastro de veículos

Edição e exclusão de veículos

Arquivamento/desarquivamento de veículos

Estatísticas (ativos, inativos e total)

Proteção de rotas autenticadas

📂 Estrutura de pastas
bash
Copiar
Editar
src/
├── controllers/      # Lógica das rotas
├── middlewares/      # Middlewares (auth)
├── routes/           # Definição das rotas
├── prisma/           # Prisma Client e schema
└── server.js         # Entrada da aplicação
✅ Requisitos
Node.js 18+

PostgreSQL 12+
