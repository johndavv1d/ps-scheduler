import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adminService } from '../../services/adminService';
import { CadastroPsicologo } from '../../types';

const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  erp: yup.string().required('ERP obrigatório'),
  senha: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
});

export const CadastroPsicologo: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CadastroPsicologo>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CadastroPsicologo) => {
    try {
      await adminService.cadastrarPsicologo(data);
      reset();
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

      <button type="submit" className="btn-success w-full disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar Psicólogo'}
      </button>
    </form>
  );
};