import api from './api';
import { Consulta, ParecerData, EmailData } from '../types';

export const psicologoService = {
  async getConsultas(): Promise<Consulta[]> {
    const { data } = await api.get<Consulta[]>('/psicologo/consultas');
    return data;
  },

  async darParecer(parecerData: ParecerData): Promise<Consulta> {
    const { data } = await api.put<Consulta>(
      `/psicologo/parecer/${parecerData.consultaId}`,
      { parecer: parecerData.parecer }
    );
    return data;
  },

  async enviarEmail(emailData: EmailData): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>('/psicologo/email', emailData);
    return data;
  }
};