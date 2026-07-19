import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { PacienteListItem, PsicologoListItem } from '../../types';

export const RemoverFicha: React.FC = () => {
  const [tipo, setTipo] = useState<'paciente' | 'psicologo'>('paciente');
  const [selecionadoId, setSelecionadoId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [psicologos, setPsicologos] = useState<PsicologoListItem[]>([]);
  const [pacientes, setPacientes] = useState<PacienteListItem[]>([]);
  const [loadingLista, setLoadingLista] = useState(false);

  const carregarLista = () => {
    setLoadingLista(true);
    setSelecionadoId('');

    if (tipo === 'psicologo') {
      adminService.listarPsicologos()
        .then(setPsicologos)
        .catch(() => alert('Erro ao carregar psicólogos'))
        .finally(() => setLoadingLista(false));
    } else {
      adminService.listarPacientes()
        .then(setPacientes)
        .catch(() => alert('Erro ao carregar pacientes'))
        .finally(() => setLoadingLista(false));
    }
  };

  useEffect(() => {
    carregarLista();
  }, [tipo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selecionadoId) {
      alert('Selecione um usuário para remover');
      return;
    }

    const nomeSelecionado = tipo === 'psicologo'
      ? psicologos.find((p) => p.id === Number(selecionadoId))?.nome
      : pacientes.find((p) => p.id === Number(selecionadoId))?.nome;

    if (!window.confirm(`Tem certeza que deseja remover ${tipo === 'psicologo' ? 'o psicólogo' : 'o paciente'} "${nomeSelecionado}"?`)) {
      return;
    }

    try {
      setIsLoading(true);
      await adminService.removerFicha(tipo, Number(selecionadoId));
      setSelecionadoId('');
      alert('Ficha removida com sucesso!');
      carregarLista();
    } catch (error) {
      alert('Erro ao remover ficha');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {tipo === 'psicologo' ? 'Psicólogo' : 'Paciente'}
        </label>
        {loadingLista ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">Carregando...</p>
        ) : (
          <select
            value={selecionadoId}
            onChange={(e) => setSelecionadoId(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>
              Selecione um {tipo === 'psicologo' ? 'psicólogo' : 'paciente'}
            </option>
            {tipo === 'psicologo'
              ? psicologos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} — ERP: {p.erp}
                  </option>
                ))
              : pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} — Empresa: {p.empresa}
                  </option>
                ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        className="btn-danger w-full disabled:opacity-50"
        disabled={isLoading || loadingLista}
      >
        {isLoading ? 'Removendo...' : 'Remover Ficha'}
      </button>
    </form>
  );
};