import React, { useEffect, useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pacienteService } from '../../services/pacienteService';
import { PsicologoListItem } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NovaConsultaFormProps {
  onSuccess: () => void;
}

const HORARIOS_PREDETERMINADOS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function formatDate(date: Date): string {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

const schema = yup.object({
  psicologoId: yup.number().required('Selecione um psicólogo').positive('Selecione um psicólogo válido'),
  data: yup.string().required('Selecione uma data').test('futura', 'A data deve ser hoje ou no futuro', (value) => {
    if (!value) return false;
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const data = new Date(value + 'T00:00:00');
    return data >= hoje;
  }),
  horario: yup.string().required('Selecione um horário'),
}).test('data-futura', 'A data e horário devem ser posteriores ao momento atual', function (values) {
  const { data, horario } = values as { data: string; horario: string };
  if (!data || !horario) return true;
  const dataHora = new Date(`${data}T${horario}:00`);
  return dataHora > new Date();
});

export const NovaConsultaForm: React.FC<NovaConsultaFormProps> = ({ onSuccess }) => {
  const [psicologos, setPsicologos] = useState<PsicologoListItem[]>([]);
  const [loadingPsicologos, setLoadingPsicologos] = useState(true);
  const [psicologoSelecionado, setPsicologoSelecionado] = useState<number | null>(null);

  // Calendário
  const hoje = useMemo(() => {
    const h = new Date(); h.setHours(0, 0, 0, 0); return h;
  }, []);
  const [calendarioMes, setCalendarioMes] = useState(hoje.getMonth());
  const [calendarioAno, setCalendarioAno] = useState(hoje.getFullYear());
  const [dataSelecionada, setDataSelecionada] = useState<string>('');

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { data: '', horario: '', psicologoId: undefined as unknown as number },
  });

  const horariosPsicologo = useMemo(() => {
    const psico = psicologos.find((p) => p.id === psicologoSelecionado);
    if (psico?.horarios) {
      try { return JSON.parse(psico.horarios) as string[]; } catch { return HORARIOS_PREDETERMINADOS; }
    }
    return HORARIOS_PREDETERMINADOS;
  }, [psicologoSelecionado, psicologos]);

  const diasNoMes = useMemo(() => {
    const primeiroDia = new Date(calendarioAno, calendarioMes, 1);
    const ultimoDia = new Date(calendarioAno, calendarioMes + 1, 0);
    const dias: (number | null)[] = [];

    // Preencher com null até o primeiro dia da semana
    for (let i = 0; i < primeiroDia.getDay(); i++) {
      dias.push(null);
    }

    // Adicionar os dias do mês
    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      dias.push(d);
    }

    return dias;
  }, [calendarioMes, calendarioAno]);

  const selecionarData = (dia: number, onChange: (value: string) => void) => {
    const dataObj = new Date(calendarioAno, calendarioMes, dia);
    // Só permite hoje ou futuro
    if (dataObj < hoje) return;
    const formatted = formatDate(dataObj);
    setDataSelecionada(formatted);
    onChange(formatted);
  };

  const mesAnterior = () => {
    if (calendarioMes === 0) {
      setCalendarioMes(11);
      setCalendarioAno(calendarioAno - 1);
    } else {
      setCalendarioMes(calendarioMes - 1);
    }
  };

  const mesSeguinte = () => {
    if (calendarioMes === 11) {
      setCalendarioMes(0);
      setCalendarioAno(calendarioAno + 1);
    } else {
      setCalendarioMes(calendarioMes + 1);
    }
  };

  useEffect(() => {
    pacienteService.listarPsicologos()
      .then(setPsicologos)
      .catch(() => alert('Erro ao carregar psicólogos'))
      .finally(() => setLoadingPsicologos(false));
  }, []);

  const onSubmit = async (formData: { psicologoId: number; data: string; horario: string }) => {
    try {
      const dataHora = `${formData.data}T${formData.horario}:00`;
      await pacienteService.criarConsulta({ psicologoId: formData.psicologoId, data: dataHora });
      reset();
      setDataSelecionada('');
      setCalendarioMes(hoje.getMonth());
      setCalendarioAno(hoje.getFullYear());
      onSuccess();
      alert('Consulta agendada com sucesso!');
    } catch (error) {
      alert('Erro ao agendar consulta');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {loadingPsicologos ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Carregando psicólogos...</p>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Psicólogo</label>
          <Controller
            name="psicologoId"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="input-field"
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  setPsicologoSelecionado(Number(e.target.value) || null);
                }}
              >
                <option value="" disabled>Selecione um psicólogo</option>
                {psicologos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} — ERP: {p.erp}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.psicologoId && (
            <p className="text-red-500 text-xs">{errors.psicologoId.message}</p>
          )}
        </div>
      )}

      {/* Calendário */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Data{dataSelecionada && ` — ${new Date(dataSelecionada + 'T00:00:00').toLocaleDateString('pt-BR')}`}
        </label>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
          {/* Cabeçalho do mês */}
          <div className="flex items-center justify-between mb-2">
            <button type="button" onClick={mesAnterior} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {MESES[calendarioMes]} {calendarioAno}
            </span>
            <button type="button" onClick={mesSeguinte} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DIAS_SEMANA.map((dia) => (
              <div key={dia} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
                {dia}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <Controller
            name="data"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-7 gap-1">
                {diasNoMes.map((dia, idx) => {
                  if (dia === null) {
                    return <div key={`empty-${idx}`} className="h-8" />;
                  }
                  const dataObj = new Date(calendarioAno, calendarioMes, dia);
                  const isPast = dataObj < hoje;
                  const isToday = isSameDay(dataObj, hoje);
                  const isSelected = dataSelecionada === formatDate(dataObj);

                  return (
                    <button
                      key={dia}
                      type="button"
                      disabled={isPast}
                      onClick={() => selecionarData(dia, field.onChange)}
                      className={`h-8 text-xs rounded flex items-center justify-center transition-colors
                        ${isPast ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : ''}
                        ${isSelected ? 'bg-blue-600 text-white font-bold' : ''}
                        ${!isPast && !isSelected ? 'hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer' : ''}
                        ${isToday && !isSelected ? 'border border-blue-400 text-blue-600 font-semibold' : ''}
                      `}
                    >
                      {dia}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>
        {errors.data && (
          <p className="text-red-500 text-xs mt-1">{errors.data.message}</p>
        )}
      </div>

      {/* Horários */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horário</label>
        <Controller
          name="horario"
          control={control}
          render={({ field }) => (
            <select {...field} className="input-field" value={field.value || ''}>
              <option value="" disabled>Selecione um horário</option>
              {horariosPsicologo.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          )}
        />
        {errors.horario && (
          <p className="text-red-500 text-xs">{errors.horario.message}</p>
        )}
      </div>

      {errors.data && Object.keys(errors).length === 1 && errors.data.type === 'required' ? null : (
        Object.values(errors).some(e => e?.message && typeof e.message === 'string' && e.message.includes('posteriores')) && (
          <p className="text-red-500 text-xs">A data e horário devem ser posteriores ao momento atual</p>
        )
      )}

      <button
        type="submit"
        className="btn-success w-full disabled:opacity-50"
        disabled={isSubmitting || loadingPsicologos}
      >
        {isSubmitting ? 'Agendando...' : 'Agendar Consulta'}
      </button>
    </form>
  );
};