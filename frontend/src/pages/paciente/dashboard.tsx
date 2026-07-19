import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useConsultas } from '../../hooks/useConsulta';
import { NovaConsultaForm } from '../../components/paciente/NovaConsultaForm';
import { MinhasConsultas } from '../../components/paciente/MinhasConsultas';
import { EditarPerfil } from '../../components/common/EditarPerfil';

export default function DashboardPaciente() {
  const { user } = useAuth();
  const { consultas, loading, error, refetch } = useConsultas('paciente');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 dark:text-gray-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Olá, {user?.nome} 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Gerencie suas consultas aqui</p>
      <div className="mb-6">
        <EditarPerfil />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Nova Consulta</h2>
          <NovaConsultaForm onSuccess={refetch} />
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Minhas Consultas</h2>
          <MinhasConsultas consultas={consultas} onUpdate={refetch} />
        </div>
      </div>
    </div>
  );
}