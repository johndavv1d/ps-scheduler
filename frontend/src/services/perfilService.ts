import api from './api';
import { AtualizarPerfilData, User } from '../types';

export const perfilService = {
  async atualizarPerfil(dados: AtualizarPerfilData): Promise<User> {
    const { data } = await api.put<User>('/perfil', dados);
    return data;
  },
};