import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { CadastroPsicologoComponent } from '../../components/admin/CadastroPsicologo';
import { CadastroPaciente } from '../../components/admin/CadastroPaciente';
import { RemoverFicha } from '../../components/admin/RemoverFicha';
import { EditarPerfil } from '../../components/common/EditarPerfil';

export default function DashboardAdmin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'psicologo' | 'paciente' | 'remover'>('psicologo');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Painel Administrativo 👑
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Bem-vindo, {user?.nome}
      </p>
      <div className="mb-6">
        <EditarPerfil />
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 transition-colors ${
              activeTab === 'psicologo'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('psicologo')}
          >
            Cadastrar Psicólogo
          </button>
          <button
            className={`py-2 px-1 border-b-2 transition-colors ${
              activeTab === 'paciente'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('paciente')}
          >
            Cadastrar Paciente
          </button>
          <button
            className={`py-2 px-1 border-b-2 transition-colors ${
              activeTab === 'remover'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('remover')}
          >
            Remover Ficha
          </button>
        </nav>
      </div>

      <div className="card">
        {activeTab === 'psicologo' && <CadastroPsicologoComponent />}
        {activeTab === 'paciente' && <CadastroPaciente />}
        {activeTab === 'remover' && <RemoverFicha />}
      </div>
    </div>
  );
}