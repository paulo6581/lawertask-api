# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-08-02

### **Release Inicial - Sistema Completo**

Esta é a primeira versão funcional completa do LawerTask API, com todos os módulos principais implementados e funcionais.

###  **Adicionado**

#### 🔐 **Sistema de Autenticação**
- **AuthModule** completo com JWT
  - Registro de usuários (`POST /api/auth/register`)
  - Login de usuários (`POST /api/auth/login`)
  - Hash seguro de senhas com bcryptjs
  - Geração e validação de tokens JWT
  - Tratamento de erros de autenticação
- **DTOs de validação**:
  - `RegisterDto` - validação de registro
  - `LoginDto` - validação de login
- **Guards e Strategies**:
  - `JwtAuthGuard` - proteção de rotas
  - `JwtStrategy` - validação de tokens
- **Configuração JWT** com variáveis de ambiente

#### 👥 **Gerenciamento de Clientes**
- **ClientsModule** com CRUD completo
  - Criar cliente (`POST /api/clients`)
  - Listar todos os clientes (`GET /api/clients`)
  - Buscar cliente por ID (`GET /api/clients/:id`)
  - Atualizar cliente (`PATCH /api/clients/:id`)
- **DTOs específicos**:
  - `CreateClientDto` - criação de clientes
  - `UpdateClientDto` - atualização de clientes
- **Validações**:
  - Email único por cliente
  - Campos obrigatórios e opcionais
  - Tratamento de conflitos

#### ✅ **Sistema de Tarefas**
- **TasksModule** com funcionalidades avançadas
  - Criar tarefa (`POST /api/tasks`)
  - Listar tarefas do usuário (`GET /api/tasks`)
  - Buscar tarefa específica (`GET /api/tasks/:id`)
  - Atualizar tarefa (`PATCH /api/tasks/:id`)
  - Excluir tarefa (`DELETE /api/tasks/:id`)
  - **Dashboard de estatísticas** (`GET /api/tasks/stats`)
- **DTOs robustos**:
  - `CreateTaskDto` - criação com validações complexas
  - `UpdateTaskDto` - atualização parcial
- **Funcionalidades especiais**:
  - Relacionamento Task-Client-User
  - Filtros por usuário autenticado
  - Enums para Status (TODO, DOING, DONE)
  - Enums para Prioridade (LOW, MEDIUM, HIGH)
  - Validação de datas
  - Estatísticas agregadas por status

#### �️ **Sistema de Banco de Dados**
- **DatabaseModule** global com Prisma
- **PrismaService** com:
  - Conexão automática na inicialização
  - Desconexão limpa no encerramento
  - Logs de conexão/desconexão
  - Tratamento de erros de conexão
- **Schema completo**:
  - Modelo `User` com relacionamentos
  - Modelo `Client` com validações
  - Modelo `Task` com enums e relacionamentos
  - Índices únicos para performance
  - Timestamps automáticos

#### 📚 **Documentação e Validação**
- **Swagger/OpenAPI** completo:
  - Documentação automática de todos os endpoints
  - Exemplos de request/response
  - Autenticação Bearer Token
  - Agrupamento por tags (Auth, Clients, Tasks)
  - Descrições detalhadas das operações
- **Sistema de validação robusto**:
  - `CustomValidationPipe` personalizado
  - Validações com class-validator
  - Transformações com class-transformer
  - Mensagens de erro estruturadas

#### 🚀 **Configuração da Aplicação**
- **main.ts** otimizado com:
  - CORS habilitado para desenvolvimento
  - Prefixo global `/api`
  - ValidationPipe global customizado
  - Swagger em `/api/docs`
  - Tratamento de erros de inicialização
  - Logs informativos
- **Configuração de ambiente**:
  - ConfigModule global
  - Variáveis de ambiente tipadas
  - Configuração JWT dinamica

#### 🌱 **Dados de Desenvolvimento**
- **Seed script** (`prisma/seed.ts`):
  - Usuário administrador padrão
  - Clientes de exemplo
  - Tarefas de exemplo
  - Dados realistas para testes
- **Migração inicial** completa:
  - Todas as tabelas e relacionamentos
  - Índices de performance
  - Constraints de integridade

#### 🧪 **Testes**
- **Configuração Jest** completa
- **Testes unitários** para TasksService
- **Mocks** do PrismaService
- **Configuração de cobertura**
- Scripts de teste configurados

### 🛠️ **Alterado**

#### 📦 **Dependências Atualizadas**
- NestJS atualizado para v11.1.5
- Prisma atualizado para v6.13.0
- TypeScript para v5.8.3
- Todas as dependências de desenvolvimento atualizadas

#### ⚙️ **Configurações Melhoradas**
- ESLint configurado com regras TypeScript
- Prettier configurado para formatação consistente
- tsconfig otimizado para desenvolvimento
- Scripts npm organizados e documentados

### 🔧 **Corrigido**

#### 🐛 **Problemas Resolvidos**
- Validação de DTOs funcionando corretamente
- Relacionamentos Prisma configurados adequadamente
- Autenticação JWT funcionando em todas as rotas protegidas
- Tratamento adequado de erros de validação
- Logs de aplicação estruturados

---

## [0.1.0] - 2025-07-31

### 🏗️ **Configuração Inicial**

#### **Adicionado**
- Inicialização do projeto NestJS com TypeScript
- Configuração do ESLint e Prettier
- Setup do Jest para testes
- Configuração do Prisma ORM
- Schema inicial do banco de dados
- Migração inicial do PostgreSQL
- Configuração de variáveis de ambiente
- Estrutura básica de módulos

#### **Dependências Principais Instaladas**
- @nestjs/core v11.1.5
- @prisma/client v6.13.0
- @nestjs/jwt v11.0.0
- @nestjs/passport v11.0.5
- @nestjs/swagger v11.2.0
- bcryptjs v3.0.2
- class-validator v0.14.2

#### **Arquivos de Configuração**
- nest-cli.json
- tsconfig.json / tsconfig.build.json
- eslint.config.mjs
- .prettierrc / .prettierignore
- .gitignore

---

**Desenvolvido por Paulo Roberto**  
**Data de Conclusão**: 2 de agosto de 2025  
**Stack**: NestJS + TypeScript + Prisma + PostgreSQL + JWT + Swagger
    - `whitelist: true` - remoção de propriedades não definidas
    - `forbidNonWhitelisted: true` - erro para propriedades não permitidas
  - Documentação Swagger em `/api/docs`
  - Autenticação Bearer Token configurada
  - Tratamento de erro na inicialização da aplicação

#### 📚 **Documentação**
- README.md com tecnologias utilizadas
- Configuração do Swagger para documentação automática da API
- Título: "LawerTask API"
- Descrição: "API para gerenciamento de tarefas"

#### 🗃️ **Migração do Banco**
- Migração inicial criada em `20250730144415_init`
- Configuração do PostgreSQL como provedor do banco
- Lock file de migração configurado

#### ⚙️ **Scripts de Desenvolvimento**
- `npm run start:dev` - Desenvolvimento com watch mode
- `npm run build` - Build para produção
- `npm run test` - Execução de testes
- `npm run lint` - Verificação de código
- `npm run format` - Formatação automática

### Technical Details

#### 🏛️ **Arquitetura**
- Padrão de módulos do NestJS
- Separação clara de responsabilidades
- Preparado para injeção de dependência
- Estrutura escalável para crescimento da aplicação

#### 🔐 **Segurança**
- Configuração para autenticação JWT
- Hash de senhas com bcryptjs
- Validação de dados de entrada
- CORS configurado para segurança

---

**Desenvolvido para**: Desafio Técnico - Sistema de Gerenciamento de Tarefas
**Stack**: NestJS + TypeScript + Prisma + PostgreSQL + JWT + Swagger
