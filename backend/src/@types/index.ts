export interface User {
  id: number;
  nome: string;
  email: string;
  tipo: 'paciente' | 'psicologo' | 'admin';
}

export interface Consulta {
  id: number;
  pacienteId: number;
  psicologoId: number;
  data: Date;
  status: string;
  parecer?: string;
  createdAt: Date;
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

export interface LoginRequest {
  cpf: string;
  senha: string;
  tipo: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}