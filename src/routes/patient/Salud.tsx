import { ScreenHeader } from '../../components/ScreenHeader';
import { StatusTag } from '../../components/StatCard';
import { usePatient } from '../../context/PatientContext';

export function Salud() {
  const { exams } = usePatient();

  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="Mi salud" subtitle="Exámenes, resultados y ficha clínica" />
      <div className="flex-1 overflow-y-auto scrollhide px-5 pt-2.5 pb-[90px] flex flex-col gap-2.5">
        {exams.map((ex) => (
          <div key={ex.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-[#F2F6F5] flex items-center justify-center text-lg shrink-0">
              🧪
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-ink">{ex.name}</div>
              <div className="mt-0.5 text-xs text-sub">{ex.date}</div>
            </div>
            <StatusTag label={ex.status === 'listo' ? 'Listo' : 'En proceso'} tone={ex.status === 'listo' ? 'teal' : 'warn'} />
          </div>
        ))}

        <div className="mt-1.5 rounded-2xl border-[1.5px] border-dashed border-[#B9D4CE] text-center text-teal-dark font-heading font-bold text-sm py-4 cursor-pointer">
          📎 Subir examen por WhatsApp/PDF
        </div>

        <div className="pt-3.5 font-heading font-bold text-[13px] text-ink">Odontograma</div>
        <div className="rounded-2xl border border-border bg-white p-4 grid grid-cols-8 gap-1.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-md border border-border-strong ${
                i === 4 || i === 11 ? 'bg-[#F6D9CF]' : 'bg-[#F2F6F5]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
