# LawerTask API

Sistema completo de gerenciamento de tarefas para escritórios de advocacia, desenvolvido com NestJS e PostgreSQL.

## 📋 Sobre o Projeto

O LawerTask API é uma aplicação backend para gerenciar tarefas, clientes e usuários em escritórios de advocacia. A API oferece funcionalidades completas de CRUD, autenticação JWT, e documentação interativa via Swagger.

## 🚀 Tecnologias

- **NestJS 11.1.5** - Framework Node.js progressivo
- **TypeScript** - Linguagem de programação com tipagem estática
- **Prisma 6.13.0** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Swagger/OpenAPI** - Documentação interativa da API
- **Jest** - Framework de testes
- **bcryptjs** - Hash de senhas
- **class-validator & class-transformer** - Validação e transformação de dados

## 🏗️ Arquitetura

```
src/
├── auth/                 # Módulo de autenticação
│   ├── dto/             # DTOs de login e registro
│   ├── guards/          # Guards JWT
│   └── strategies/      # Estratégias Passport
├── clients/             # Módulo de clientes
│   ├── dto/             # DTOs de clientes
│   └── ...
├── tasks/               # Módulo de tarefas
│   ├── dto/             # DTOs de tarefas
│   └── ...
├── database/            # Configuração do banco
└── main.ts              # Ponto de entrada da aplicação
```

## 📊 Modelo de Dados

### User (Usuário)
- `id`: Identificador único
- `email`: Email único do usuário
- `name`: Nome completo
- `password`: Senha criptografada
- `createdAt/updatedAt`: Timestamps automáticos
- **Relacionamento**: 1:N com Task

### Client (Cliente)
- `id`: Identificador único
- `name`: Nome do cliente
- `email`: Email único do cliente
- `phone`: Telefone (opcional)
- `company`: Empresa (opcional)
- `createdAt/updatedAt`: Timestamps automáticos
- **Relacionamento**: 1:N com Task

### Task (Tarefa)
- `id`: Identificador único
- `title`: Título da tarefa
- `description`: Descrição detalhada
- `status`: TODO | DOING | DONE
- `priority`: LOW | MEDIUM | HIGH
- `dueDate`: Data de vencimento
- `clientId`: Referência ao cliente
- `userId`: Referência ao usuário responsável
- `createdAt/updatedAt`: Timestamps automáticos

## 🛠️ Instalação e Configuração

### Pré-requisitos
### Node.js (versão 18 ou superior)
- node --version

### npm
- npm --version

### Git
- git --version

### PostgreSQL (local ou via Docker)
- docker --version


# Instalação das tecnologias, caso não tenha
```bash
sudo apt update

# Instala Nodejs
sudo apt install nodejs

# Instala NPM
sudo apt install npm

# Instala o GIT
sudo apt-get install git

# Remove versões anteriores do Docker
sudo apt-get remove \
    docker \
    docker-engine \
    docker.io \
    containerd runc -y

sudo apt update

# Instala DOCKER-CE
sudo apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common -y


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
  sudo apt update
  
  sudo apt install -y docker-ce
  
  # permitir usuário padrão acessar e executar comandos docker
  sudo usermod ag- docker $user

```
# Docker - Criando banco de dados
```bash
# Criando Container docker
docker run -p 5432:5432 --name db_lawertask -e POSTGRES_PASSWORD=878903 -d postgres

# Containers em execução
docker ps

# listar imagens
docker images
```

### 1. Clone o repositório
```bash
git clone https://github.com/paulo6581/lawertask-api.git
cd lawertask-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo e configure suas variáveis
touch .env
```

Variáveis ambiente necessárias no `.env`:
```env
DATABASE_URL="postgresql://postgres:878903@localhost:5432/postgres"
JWT_SECRET="seu_jwt_secret_muito_seguro"
JWT_EXPIRES_IN="7d"
PORT=3000
```
# Gerar JWT_Secret pelo terminal
```bash
# após gerar o código, copie e cole no .env em JWT_SECRET
openssl rand -hex 64
```


### 4. Configure o banco de dados
```bash
# Gerar o cliente Prisma
npm run prisma generate

# Executar as migrações
npm run prisma migrate

# Carga de dados no banco de dados
npx prisma db seed
npx ts-node prisma/seed.ts
```

### 5. Execute a aplicação
```bash
npm run start:dev
```

## 📖 Documentação da API

A documentação interativa da API está disponível via Swagger:

**URL**: `http://localhost:3000/api/docs`

### Endpoints Principais

#### 🔐 Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário

#### 👥 Clientes
- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Criar cliente
- `GET /api/clients/:id` - Buscar cliente por ID
- `PATCH /api/clients/:id` - Atualizar cliente

#### ✅ Tarefas
- `GET /api/tasks` - Listar tarefas do usuário
- `POST /api/tasks` - Criar nova tarefa
- `GET /api/tasks/stats` - Estatísticas das tarefas
- `GET /api/tasks/:id` - Buscar tarefa por ID
- `PATCH /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Excluir tarefa

#### 🏠 Sistema
- `GET /api` - Status da aplicação

## 🔒 Autenticação

A API utiliza autenticação JWT. Para acessar endpoints protegidos:

1. Faça login em `/api/auth/login`
2. Use o token retornado no header: `Authorization: Bearer <token>`

### Dados de Exemplo (após executar seed)
```json
{
  "email": "admin@lawertask.com",
  "password": "123456"
}
```

## 🧪 Testes

```bash
# Testes unitários
npm run test
```

## 🔧 Funcionalidades Implementadas

### ✅ Concluído
- [x] Sistema completo de autenticação JWT
- [x] CRUD completo de usuários (registro/login)
- [x] CRUD completo de clientes
- [x] CRUD completo de tarefas
- [x] Relacionamentos entre entidades
- [x] Validação de dados com class-validator
- [x] Documentação Swagger completa
- [x] Testes unitários básicos
- [x] Seed de dados para desenvolvimento
- [x] Pipe de validação customizado
- [x] Guards de autenticação
- [x] Estratégias JWT
- [x] Dashboard com estatísticas de tarefas
- [x] Filtros por usuário autenticado
- [x] Tratamento de erros personalizado
- [x] Timestamps automáticos
- [x] Enums para status e prioridade
