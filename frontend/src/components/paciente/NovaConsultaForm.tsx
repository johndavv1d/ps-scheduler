import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pacienteService } from '../../services/pacienteService';
import { NovoAgendamento } from '../../types';

interface NovaConsultaFormProps {
  onSuccess: () => void;
}

const schema = yup.object({
  psicologoId: yup.number().required('ID do psicólogo é obrigatório').positive('ID inválido'),
  data: yup.string().required('Data é obrigatória'),
});

export const NovaConsultaForm: React.FC<NovaConsultaFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NovoAgendamento>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: NovoAgendamento) => {
    try {
      await pacienteService.criarConsulta(data);
      reset();
      onSuccess();
      alert('Consulta agendada com sucesso!');
    } catch (error) {
      alert('Erro ao agendar consulta');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          {...register('psicologoId')}
          type="number"
          placeholder="ID do Psicólogo"
          className="input-field"
        />
        {errors.psicologoId && (
          <p className="text-red-500 text-xs">{errors.psicologoId.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('data')}
          type="datetime-local"
          className="input-field"
        />
        {errors.data && (
          <p className="text-red-500 text-xs">{errors.data.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn-success w-full disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Agendando...' : 'Agendar Consulta'}
      </button>
    </form>
  );
};