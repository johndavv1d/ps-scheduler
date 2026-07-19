export interface User {
  id: number;
  nome: string;
  email: string;
  tipo: 'paciente' | 'psicologo' | 'admin';
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
}

export interface CadastroPaciente {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  senha: string;
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