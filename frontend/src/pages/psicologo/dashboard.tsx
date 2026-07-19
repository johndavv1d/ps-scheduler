import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useConsultas } from '../../hooks/useConsulta';
import { ConsultaCard } from '../../components/psicologo/ConsultaCard';
import { ParecerForm } from '../../components/psicologo/ParecerForm';
import { ComunicarEmail } from '../../components/psicologo/ComunicarEmail';

export default function DashboardPsicologo() {
  const { user } = useAuth();
  const { consultas, loading, error, refetch } = useConsultas('psicologo');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bem-vindo, Dr(a). {user?.nome} 🏥
      </h1>
      <p className="text-gray-600 mb-8">Gerencie suas consultas e pareceres</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Suas Consultas</h2>
          <div className="space-y-4">
            {consultas.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhuma consulta agendada</p>
            ) : (
              consultas.map((consulta) => (
                <ConsultaCard key={consulta.id} consulta={consulta} />
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Dar Parecer</h2>
            <ParecerForm onSuccess={refetch} />
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Comunicar por Email</h2>
            <ComunicarEmail />
          </div>
        </div>
      </div>
    </div>
  );
}