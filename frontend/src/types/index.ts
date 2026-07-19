export interface User {
  id: number;
  nome: string;
  email: string;
  tipo: 'paciente' | 'psicologo' | 'admin';
  telefone?: string;
  empresa?: string;
  horarios?: string;
}

export interface LoginCredentials {
  cpf: string;
  senha: string;
  tipo: string;
}

export interface Consulta {
  id: number;
  pacienteId: number;
  psicologoId: number;
  data: string;
  status: 'AGENDADA' | 'CANCELADA' | 'REALIZADA';
  parecer?: string;
  createdAt: string;
  paciente: {
    id: number;
    nome: string;
    email: string;
  };
  psicologo: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface CadastroPsicologo {
  nome: string;
  email: string;
  telefone: string;
  erp: string;
  senha: string;
  horarios?: string[];
}

export interface CadastroPaciente {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  senha: string;
}

export interface PacienteListItem {
  id: number;
  nome: string;
  email: string;
  empresa: string;
}

export interface PsicologoListItem {
  id: number;
  nome: string;
  email: string;
  erp: string;
  horarios?: string;
}

export interface NovoAgendamento {
  psicologoId: number;
  data: string;
}

export interface ParecerData {
  consultaId: number;
  parecer: string;
}

export interface EmailData {
  pacienteEmail: string;
  categoria: 'lembrete' | 'resultado' | 'outro';
  mensagem: string;
}

export interface AtualizarPerfilData {
  nome?: string;
  email?: string;
  telefone?: string;
  empresa?: string;
  horarios?: string;
}