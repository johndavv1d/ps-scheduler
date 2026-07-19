import React, { useState } from 'react';
import { adminService } from '../../services/adminService';

export const RemoverFicha: React.FC = () => {
  const [tipo, setTipo] = useState<'paciente' | 'psicologo'>('paciente');
  const [id, setId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      alert('ID é obrigatório');
      return;
    }

    if (!window.confirm(`Tem certeza que deseja remover ${tipo} ID ${id}?`)) {
      return;
    }

    try {
      setIsLoading(true);
      await adminService.removerFicha(tipo, Number(id));
      setId('');
      alert('Ficha removida com sucesso!');
    } catch (error) {
      alert('Erro ao remover ficha');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value as 'paciente' | 'psicologo')}
          className="input-field"
        >
          <option value="paciente">Paciente</option>
          <option value="psicologo">Psicólogo</option>
        </select>
      </div>

      <div>
        <input
          type="number"
          placeholder="ID do usuário"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input-field"
        />
      </div>

      <button
        type="submit"
        className="btn-danger w-full disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Removendo...' : 'Remover Ficha'}
      </button>
    </form>
  );
};