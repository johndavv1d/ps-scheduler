// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/login/LoginForm';
import { LoginCredentials } from '../types';
import { User, Stethoscope, Shield, Sparkles } from 'lucide-react';

export default function Login() {
  const { login, isLoading } = useAuth();
  const [tipo, setTipo] = useState<'paciente' | 'psicologo' | 'admin'>('paciente');

  const handleSubmit = async (data: LoginCredentials) => {
    try {
      await login({ ...data, tipo });
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const getIcon = () => {
    switch (tipo) {
      case 'paciente':
        return <User className="w-5 h-5" />;
      case 'psicologo':
        return <Stethoscope className="w-5 h-5" />;
      case 'admin':
        return <Shield className="w-5 h-5" />;
    }
  };

  const getTitle = () => {
    switch (tipo) {
      case 'paciente':
        return 'Área do Paciente';
      case 'psicologo':
        return 'Área do Psicólogo';
      case 'admin':
        return 'Área Administrativa';
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {getTitle()}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Faça login para continuar
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { id: 'paciente' as const, label: 'Paciente', icon: <User className="w-4 h-4" /> },
              { id: 'psicologo' as const, label: 'Psicólogo', icon: <Stethoscope className="w-4 h-4" /> },
              { id: 'admin' as const, label: 'Admin', icon: <Shield className="w-4 h-4" /> },
            ].map((option) => (
              <button
                key={option.id}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-200 ${
                  tipo === option.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setTipo(option.id)}
              >
                <span className={tipo === option.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'}>
                  {option.icon}
                </span>
                <span className={`text-xs mt-1 ${tipo === option.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          <LoginForm
            onSubmit={handleSubmit}
            tipo={tipo}
            isLoading={isLoading}
          />

          <div className="text-center mt-6">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors">
              Esqueci minha senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}