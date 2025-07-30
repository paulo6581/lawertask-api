# Changelog

## [Unreleased]

### Added
- Sistema de gerenciamento de tarefas para escritórios de advocacia
- Configuração inicial do projeto NestJS
- Estrutura básica da aplicação

## [0.0.1] - 2025-07-29

### Added

#### 🏗️ **Configuração do Projeto**
- Inicialização do projeto NestJS com TypeScript
- Configuração do ESLint para padronização de código
- Configuração do Prettier para formatação automática
- Setup do Jest para testes unitários e e2e
- Configuração do SWC para compilação mais rápida

#### 📦 **Dependências Principais**
- **Framework**: NestJS v11.1.5
- **Linguagem**: TypeScript
- **ORM**: Prisma v6.13.0 com PostgreSQL
- **Autenticação**: JWT + Passport (local e JWT strategies)
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI
- **Segurança**: bcryptjs para hash de senhas

#### 🗄️ **Modelagem do Banco de Dados**
- **Schema Prisma** criado com 3 entidades principais:
  - `User`: Usuários do sistema
    - id, email, name, password
    - Timestamps automáticos (createdAt, updatedAt)
    - Relacionamento 1:N com Task
  - `Client`: Clientes do escritório
    - id, name, email, phone, company
    - Timestamps automáticos
    - Relacionamento 1:N com Task
  - `Task`: Tarefas/processos
    - id, title, description, status, priority, dueDate
    - Relacionamentos com User e Client
    - Enums para status (TODO, DOING, DONE) e prioridade (LOW, MEDIUM, HIGH)

#### 🚀 **Configuração da Aplicação**
- **main.ts** configurado com:
  - CORS habilitado para requisições cross-origin
  - Prefixo global `/api` para todas as rotas
  - ValidationPipe global com:
    - `transform: true` - transformação automática de tipos
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

#### 📊 **Performance**
- SWC para compilação otimizada
- Prisma ORM para queries eficientes
- TypeScript para type safety

### Next Steps
- [ ] Implementar controllers para User, Client e Task
- [ ] Criar DTOs para validação de entrada
- [ ] Implementar autenticação JWT
- [ ] Adicionar middleware de autorização
- [ ] Criar testes unitários e e2e
- [ ] Implementar upload de arquivos
- [ ] Adicionar logging estruturado
- [ ] Configurar Docker para containerização

---

**Desenvolvido para**: Desafio Técnico - Sistema de Gerenciamento de Tarefas
**Stack**: NestJS + TypeScript + Prisma + PostgreSQL + JWT + Swagger
