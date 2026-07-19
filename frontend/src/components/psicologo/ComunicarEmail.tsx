import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { psicologoService } from '../../services/psicologoService';
import { EmailData } from '../../types';

const schema = yup.object({
  pacienteEmail: yup.string().email('Email inválido').required('Email obrigatório'),
  categoria: yup.string().required('Categoria obrigatória'),
  mensagem: yup.string().required('Mensagem obrigatória').min(10, 'Mínimo 10 caracteres'),
});

export const ComunicarEmail: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmailData>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoria: 'lembrete'
    }
  });

  const onSubmit = async (data: EmailData) => {
    try {
      await psicologoService.enviarEmail(data);
      reset();
      alert('Email enviado com sucesso!');
    } catch (error) {
      alert('Erro ao enviar email');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          {...register('pacienteEmail')}
          placeholder="Email do paciente"
          className="input-field"
        />
        {errors.pacienteEmail && (
          <p className="text-red-500 text-xs">{errors.pacienteEmail.message}</p>
        )}
      </div>

      <div>
        <select {...register('categoria')} className="input-field">
          <option value="lembrete">Lembrete de Consulta</option>
          <option value="resultado">Resultado da Consulta</option>
          <option value="outro">Outro</option>
        </select>
        {errors.categoria && (
          <p className="text-red-500 text-xs">{errors.categoria.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('mensagem')}
          placeholder="Escreva sua mensagem..."
          className="input-field"
          rows={4}
        />
        {errors.mensagem && (
          <p className="text-red-500 text-xs">{errors.mensagem.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary w-full disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Email'}
      </button>
    </form>
  );
};