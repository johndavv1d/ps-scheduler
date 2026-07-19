import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adminService } from '../../services/adminService';
import { CadastroPaciente } from '../../types';

const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  empresa: yup.string().required('Empresa obrigatória'),
  senha: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
});

export const CadastroPaciente: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CadastroPaciente>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CadastroPaciente) => {
    try {
      await adminService.cadastrarPaciente(data);
      reset();
      alert('Paciente cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar paciente');
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
        <input {...register('empresa')} placeholder="Empresa" className="input-field" />
        {errors.empresa && <p className="text-red-500 text-xs">{errors.empresa.message}</p>}
      </div>

      <div>
        <input {...register('senha')} type="password" placeholder="Senha" className="input-field" />
        {errors.senha && <p className="text-red-500 text-xs">{errors.senha.message}</p>}
      </div>

      <button type="submit" className="btn-success w-full disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar Paciente'}
      </button>
    </form>
  );
};