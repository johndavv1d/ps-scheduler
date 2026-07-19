import React from 'react';
import { Consulta } from '../../types';

interface ConsultaCardProps {
  consulta: Consulta;
}

export const ConsultaCard: React.FC<ConsultaCardProps> = ({ consulta }) => {
  return (
    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <p>
          <span className="font-semibold">Paciente:</span>{' '}
          {consulta.paciente.nome}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{' '}
          {consulta.paciente.email}
        </p>
        <p>
          <span className="font-semibold">Data:</span>{' '}
          {new Date(consulta.data).toLocaleString('pt-BR')}
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
          <p className="mt-2 text-sm bg-gray-50 p-2 rounded">
            <span className="font-semibold">Parecer:</span>{' '}
            {consulta.parecer}
          </p>
        )}
      </div>
    </div>
  );
};