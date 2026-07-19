import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { psicologoService } from '../../services/psicologoService';
import { ParecerData } from '../../types';

interface ParecerFormProps {
  onSuccess: () => void;
}

const schema = yup.object({
  consultaId: yup.number().required('ID da consulta é obrigatório').positive('ID inválido'),
  parecer: yup.string().required('Parecer é obrigatório').min(10, 'Mínimo 10 caracteres'),
});

export const ParecerForm: React.FC<ParecerFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ParecerData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ParecerData) => {
    try {
      await psicologoService.darParecer(data);
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
        <input
          {...register('consultaId')}
          type="number"
          placeholder="ID da Consulta"
          className="input-field"
        />
        {errors.consultaId && (
          <p className="text-red-500 text-xs">{errors.consultaId.message}</p>
        )}
      </div>

      <div>
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
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Salvando...' : 'Salvar Parecer'}
      </button>
    </form>
  );
};