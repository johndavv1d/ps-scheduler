# 🧠 Agenda Psicológica

Plataforma de agendamento de consultas psicológicas desenvolvida como projeto de estudo e aprimoramento em **React**, **Tailwind CSS**, **ORM Prisma** e **SQLite**, com frontend e backend componentizados.

---

## 🚀 Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | Next.js, React 18, TypeScript |
| **Estilização** | Tailwind CSS (modo claro/escuro) |
| **Formulários** | React Hook Form + Yup |
| **Estado Global** | Context API |
| **Backend** | Express, TypeScript |
| **ORM** | Prisma |
| **Banco de Dados** | SQLite |
| **Autenticação** | JWT (JSON Web Token) |
| **Senhas** | bcrypt (hash) |
| **Ícones** | Lucide React |

---

## 📁 Estrutura do Projeto

```
psi-scheduler/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Modelo do banco de dados
│   │   ├── dev.db                 # SQLite (desenvolvimento)
│   │   └── migrations/            # Histórico de migrações
│   └── src/
│       ├── controllers/           # Lógica dos endpoints
│       ├── middlewares/           # Auth (JWT + authorize)
│       ├── routes/                # Definição das rotas
│       ├── utils/                 # hash de senha
│       └── server.ts              # Entry point
├── frontend/
│   └── src/
│       ├── components/            # Componentes reutilizáveis
│       │   ├── admin/             # CadastroPaciente, CadastroPsicologo, RemoverFicha
│       │   ├── common/            # Header, EditarPerfil, LoadingSpinner
│       │   ├── login/             # LoginForm
│       │   ├── paciente/          # MinhasConsultas, NovaConsultaForm
│       │   └── psicologo/         # ConsultaCard, ParecerForm, ComunicarEmail
│       ├── contexts/              # AuthContext, ThemeContext
│       ├── hooks/                 # useAuth, useConsulta, useTheme
│       ├── pages/                 # Rotas (Next.js file-based)
│       │   ├── admin/             # dashboard.tsx, login.tsx
│       │   ├── paciente/          # dashboard.tsx
│       │   └── psicologo/         # dashboard.tsx
│       ├── services/              # Chamadas à API
│       ├── styles/                # globals.css (temas + utilitários)
│       └── types/                 # Interfaces TypeScript
├── README.md
└── AGENTS.md
```

---

## 👥 Perfis de Usuário

### 🛡️ Administrador
- Cadastrar psicólogos (com horários de atendimento)
- Cadastrar pacientes
- Remover fichas (exclui consultas associadas)
- Editar seus dados (nome, email)
- Login isolado: `/admin/login`

### 🏥 Psicólogo
- Visualizar consultas agendadas
- Dar parecer nas consultas
- Comunicar-se por email com pacientes
- Escolher horários de atendimento no cadastro/perfil
- Editar perfil (nome, email, telefone, horários)

### 🙋 Paciente
- Agendar novas consultas
- Selecionar psicólogo por nome (não por ID)
- Calendário visual interativo para escolher data
- Horários disponíveis filtrados por psicólogo
- Cancelar consultas agendadas
- Ver pareceres de consultas realizadas
- Editar perfil (nome, email, telefone, empresa)

---

## 🔧 Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env        # Configure DATABASE_URL e JWT_SECRET
npx prisma migrate dev       # Cria e aplica migrações
npm run dev                  # Inicia em http://localhost:3333
```

### Frontend

```bash
cd frontend
npm install
npm run dev                  # Inicia em http://localhost:3000
```

### Criar usuário admin inicial

```bash
cd backend
node create-admin.js
```

---

## 🔐 Autenticação

- Login com email e senha
- Token JWT com duração de 7 dias
- Middleware de autorização por tipo de usuário
- Senhas armazenadas com hash bcrypt

---

## 🎨 Temas

O sistema suporta **modo claro** e **modo escuro**, com toggle no cabeçalho. As preferências são salvas no `localStorage` e respeitam a preferência do sistema operacional.

---

## 📝 Modelos do Banco de Dados

### Admin
| Campo | Tipo |
|-------|------|
| id | Int (auto) |
| nome | String |
| email | String (único) |
| senha | String (hash) |

### Psicologo
| Campo | Tipo |
|-------|------|
| id | Int (auto) |
| nome | String |
| email | String (único) |
| telefone | String |
| erp | String (único) |
| senha | String (hash) |
| horarios | String? (JSON array) |

### Paciente
| Campo | Tipo |
|-------|------|
| id | Int (auto) |
| nome | String |
| email | String (único) |
| telefone | String |
| empresa | String |
| senha | String (hash) |

### Consulta
| Campo | Tipo |
|-------|------|
| id | Int (auto) |
| pacienteId | Int |
| psicologoId | Int |
| data | DateTime |
| status | String (AGENDADA, CANCELADA, REALIZADA) |
| parecer | String? |

---

## 📄 Licença

Este projeto é livre para fins de estudo e aprimoramento pessoal.

---

Desenvolvido com ❤️ por [JDV Systems](/)
