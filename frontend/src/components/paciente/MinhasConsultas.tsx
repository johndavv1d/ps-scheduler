import React from 'react';
import { Consulta } from '../../types';
import { pacienteService } from '../../services/pacienteService';

interface MinhasConsultasProps {
  consultas: Consulta[];
  onUpdate: () => void;
}

export const MinhasConsultas: React.FC<MinhasConsultasProps> = ({ consultas, onUpdate }) => {
  const cancelar = async (id: number) => {
    if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
      try {
        await pacienteService.cancelarConsulta(id);
        onUpdate();
        alert('Consulta cancelada com sucesso!');
      } catch (error) {
        alert('Erro ao cancelar consulta');
      }
    }
  };

  if (consultas.length === 0) {
    return <p className="text-gray-500 text-center py-4">Nenhuma consulta agendada</p>;
  }

  return (
    <ul className="space-y-3">
      {consultas.map((consulta) => (
        <li key={consulta.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Data:</span>{' '}
                {new Date(consulta.data).toLocaleString('pt-BR')}
              </p>
              <p>
                <span className="font-semibold">Psicólogo:</span>{' '}
                {consulta.psicologo.nome}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{' '}
                <span className={`px-2 py-1 rounded text-xs ${
                  consulta.status === 'AGENDADA' ? 'bg-green-100 text-green-800' :
                  consulta.status === 'CANCELADA' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {consulta.status}
                </span>
              </p>
              {consulta.parecer && (
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Parecer:</span>{' '}
                  {consulta.parecer}
                </p>
              )}
            </div>
            {consulta.status === 'AGENDADA' && (
              <button
                onClick={() => cancelar(consulta.id)}
                className="btn-danger text-sm"
              >
                Cancelar
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};