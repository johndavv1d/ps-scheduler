import api from './api';
import { Consulta, NovoAgendamento, PsicologoListItem } from '../types';

export const pacienteService = {
  async listarPsicologos(): Promise<PsicologoListItem[]> {
    const { data } = await api.get<PsicologoListItem[]>('/paciente/psicologos');
    return data;
  },

  async getConsultas(): Promise<Consulta[]> {
    const { data } = await api.get<Consulta[]>('/paciente/consultas');
    return data;
  },

  async criarConsulta(agendamento: NovoAgendamento): Promise<Consulta> {
    const { data } = await api.post<Consulta>('/paciente/consultas', agendamento);
    return data;
  },

  async cancelarConsulta(id: number): Promise<Consulta> {
    const { data } = await api.put<Consulta>(`/paciente/consultas/${id}/cancelar`);
    return data;
  }
};