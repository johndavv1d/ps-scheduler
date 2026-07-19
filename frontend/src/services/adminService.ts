import api from './api';
import { CadastroPsicologo, CadastroPaciente, PsicologoListItem, PacienteListItem } from '../types';

export const adminService = {
  async listarPsicologos(): Promise<PsicologoListItem[]> {
    const { data } = await api.get<PsicologoListItem[]>('/admin/psicologos');
    return data;
  },

  async listarPacientes(): Promise<PacienteListItem[]> {
    const { data } = await api.get<PacienteListItem[]>('/admin/pacientes');
    return data;
  },

  async cadastrarPsicologo(dados: CadastroPsicologo): Promise<unknown> {
    const { data } = await api.post('/admin/psicologo', dados);
    return data;
  },

  async cadastrarPaciente(dados: CadastroPaciente): Promise<unknown> {
    const { data } = await api.post('/admin/paciente', dados);
    return data;
  },

  async removerFicha(tipo: 'paciente' | 'psicologo', id: number): Promise<unknown> {
    const { data } = await api.delete(`/admin/ficha/${tipo}/${id}`);
    return data;
  }
};
