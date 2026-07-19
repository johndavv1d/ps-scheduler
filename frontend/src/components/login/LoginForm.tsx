// frontend/src/components/login/LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginCredentials } from '../../types';
import { Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => Promise<void>;
  tipo: string;
  isLoading: boolean;
}

const schema = yup.object({
  cpf: yup.string().required('CPF/Email obrigatório'),
  senha: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
});

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, tipo, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {tipo === 'paciente' ? 'Email' : 'Email'}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
          <input
            {...register('cpf')}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder={tipo === 'paciente' ? 'Digite seu Email' : 'Digite seu Email'}
            disabled={isLoading}
          />
        </div>
        {errors.cpf && (
          <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
          <input
            {...register('senha')}
            type="password"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Digite sua senha"
            disabled={isLoading}
          />
        </div>
        {errors.senha && (
          <p className="text-red-500 text-xs mt-1">{errors.senha.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Entrando...
          </div>
        ) : (
          'Entrar'
        )}
      </button>
    </form>
  );
};