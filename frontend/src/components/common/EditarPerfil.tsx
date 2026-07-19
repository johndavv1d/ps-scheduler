import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { perfilService } from '../../services/perfilService';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types';

const HORARIOS_PREDETERMINADOS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

interface EditarPerfilProps {
  onSuccess?: () => void;
}

const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  telefone: yup.string(),
  empresa: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

export const EditarPerfil: React.FC<EditarPerfilProps> = ({ onSuccess }) => {
  const { user, setUser } = useAuth();
  const [horariosSelecionados, setHorariosSelecionados] = useState<string[]>(() => {
    if (user?.horarios) {
      try { return JSON.parse(user.horarios); } catch { return []; }
    }
    return [];
  });
  const [mostrarForm, setMostrarForm] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      nome: user?.nome || '',
      email: user?.email || '',
      telefone: user?.telefone || '',
      empresa: user?.empresa || '',
    },
  });

  const toggleHorario = (hora: string) => {
    setHorariosSelecionados((prev) =>
      prev.includes(hora) ? prev.filter((h) => h !== hora) : [...prev, hora].sort()
    );
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const payload: any = { nome: formData.nome, email: formData.email };
      if (user?.tipo === 'paciente' || user?.tipo === 'psicologo') {
        payload.telefone = formData.telefone;
      }
      if (user?.tipo === 'paciente') {
        payload.empresa = formData.empresa;
      }
      if (user?.tipo === 'psicologo') {
        payload.horarios = JSON.stringify(horariosSelecionados);
      }

      const updatedUser = await perfilService.atualizarPerfil(payload);
      const mergedUser = { ...user, ...updatedUser } as User;
      localStorage.setItem('user', JSON.stringify(mergedUser));
      setUser(mergedUser);
      alert('Perfil atualizado com sucesso!');
      setMostrarForm(false);
      onSuccess?.();
    } catch (error: any) {
      alert(error?.response?.data?.error || 'Erro ao atualizar perfil');
    }
  };

  return (
    <div>
      {!mostrarForm ? (
        <button
          onClick={() => setMostrarForm(true)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ✏️ Editar Perfil
        </button>
      ) : (
        <div className="card mt-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Editar Perfil</h3>
            <button
              onClick={() => setMostrarForm(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ✕ Fechar
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
              <input {...register('nome')} className="input-field" placeholder="Nome" />
              {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input {...register('email')} className="input-field" placeholder="Email" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {(user?.tipo === 'paciente' || user?.tipo === 'psicologo') && (
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
                <input {...register('telefone')} className="input-field" placeholder="Telefone" />
              </div>
            )}

            {user?.tipo === 'paciente' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa</label>
                <input {...register('empresa')} className="input-field" placeholder="Empresa" />
              </div>
            )}

            {user?.tipo === 'psicologo' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Horários de Atendimento
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {HORARIOS_PREDETERMINADOS.map((hora) => (
                    <label
                      key={hora}
                      className={`flex items-center justify-center text-xs px-2 py-1.5 rounded border cursor-pointer transition-colors
                        ${horariosSelecionados.includes(hora)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={horariosSelecionados.includes(hora)}
                        onChange={() => toggleHorario(hora)}
                        className="hidden"
                      />
                      {hora}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};