import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { psicologoService } from '../../services/psicologoService';
import { Consulta } from '../../types';

interface ParecerFormProps {
  onSuccess: () => void;
}

const schema = yup.object({
  consultaId: yup.string().required('Selecione uma consulta'),
  parecer: yup.string().required('Parecer é obrigatório').min(10, 'Mínimo 10 caracteres'),
});

export const ParecerForm: React.FC<ParecerFormProps> = ({ onSuccess }) => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loadingConsultas, setLoadingConsultas] = useState(true);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const carregarConsultas = () => {
    setLoadingConsultas(true);
    psicologoService.getConsultas()
      .then((data) => setConsultas(data))
      .catch(() => alert('Erro ao carregar consultas'))
      .finally(() => setLoadingConsultas(false));
  };

  useEffect(() => {
    carregarConsultas();
  }, []);

  const consultasDisponiveis = consultas.filter((c) => c.status === 'AGENDADA');

  const onSubmit = async (formData: { consultaId: string; parecer: string }) => {
    try {
      await psicologoService.darParecer({
        consultaId: Number(formData.consultaId),
        parecer: formData.parecer,
      });
      reset();
      onSuccess();
      alert('Parecer salvo com sucesso!');
    } catch (error) {
      alert('Erro ao salvar parecer');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consulta</label>
        {loadingConsultas ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">Carregando consultas...</p>
        ) : (
          <select {...register('consultaId')} className="input-field" defaultValue="">
            <option value="" disabled>Selecione uma consulta</option>
            {consultasDisponiveis.map((c) => (
              <option key={c.id} value={c.id}>
                {c.paciente.nome} — {new Date(c.data).toLocaleString('pt-BR')}
              </option>
            ))}
            {consultasDisponiveis.length === 0 && (
              <option value="" disabled>Nenhuma consulta pendente</option>
            )}
          </select>
        )}
        {errors.consultaId && (
          <p className="text-red-500 text-xs">{errors.consultaId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parecer</label>
        <textarea
          {...register('parecer')}
          placeholder="Escreva o parecer..."
          className="input-field"
          rows={4}
        />
        {errors.parecer && (
          <p className="text-red-500 text-xs">{errors.parecer.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary w-full disabled:opacity-50"
        disabled={isSubmitting || loadingConsultas}
      >
        {isSubmitting ? 'Salvando...' : 'Salvar Parecer'}
      </button>
    </form>
  );
};