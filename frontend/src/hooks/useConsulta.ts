import { useState, useEffect, useCallback } from 'react';
import { Consulta } from '../types';
import { pacienteService } from '../services/pacienteService';
import { psicologoService } from '../services/psicologoService';

export const useConsultas = (tipo: 'paciente' | 'psicologo') => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsultas = useCallback(async () => {
    try {
      setLoading(true);
      const data = tipo === 'paciente' 
        ? await pacienteService.getConsultas()
        : await psicologoService.getConsultas();
      setConsultas(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar consultas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [tipo]);

  useEffect(() => {
    fetchConsultas();
  }, [fetchConsultas]);

  return { consultas, loading, error, refetch: fetchConsultas };
};