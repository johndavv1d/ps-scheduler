import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adminService } from '../../services/adminService';
import { CadastroPsicologo } from '../../types';

const HORARIOS_PREDETERMINADOS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  erp: yup.string().required('ERP obrigatório'),
  senha: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
});

export const CadastroPsicologoComponent: React.FC = () => {
  const [horarios, setHorarios] = useState<string[]>([]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CadastroPsicologo>({
    resolver: yupResolver(schema) as any,
  });

  const toggleHorario = (hora: string) => {
    setHorarios((prev) =>
      prev.includes(hora) ? prev.filter((h) => h !== hora) : [...prev, hora].sort()
    );
  };

  const onSubmit = async (data: CadastroPsicologo) => {
    try {
      await adminService.cadastrarPsicologo({ ...data, horarios });
      reset();
      setHorarios([]);
      alert('Psicólogo cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar psicólogo');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('nome')} placeholder="Nome" className="input-field" />
        {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="Email" className="input-field" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register('telefone')} placeholder="Telefone" className="input-field" />
        {errors.telefone && <p className="text-red-500 text-xs">{errors.telefone.message}</p>}
      </div>

      <div>
        <input {...register('erp')} placeholder="ERP" className="input-field" />
        {errors.erp && <p className="text-red-500 text-xs">{errors.erp.message}</p>}
      </div>

      <div>
        <input {...register('senha')} type="password" placeholder="Senha" className="input-field" />
        {errors.senha && <p className="text-red-500 text-xs">{errors.senha.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Horários de Atendimento
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {HORARIOS_PREDETERMINADOS.map((hora) => (
            <label
              key={hora}
              className={`flex items-center justify-center text-xs px-2 py-1.5 rounded border cursor-pointer transition-colors
                ${horarios.includes(hora)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
            >
              <input
                type="checkbox"
                checked={horarios.includes(hora)}
                onChange={() => toggleHorario(hora)}
                className="hidden"
              />
              {hora}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-success w-full disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar Psicólogo'}
      </button>
    </form>
  );
};