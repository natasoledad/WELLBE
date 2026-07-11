import { ScreenHeader } from '../../components/ScreenHeader';
import { Button } from '../../components/Button';
import { usePatient } from '../../context/PatientContext';

export function Farmacia() {
  const { medications } = usePatient();

  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="Farmacia" subtitle="Tus medicamentos recetados" />
      <div className="flex-1 overflow-y-auto scrollhide px-5 pt-2.5 pb-[90px] flex flex-col gap-2.5">
        {medications.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-[#F2F6F5] flex items-center justify-center text-lg shrink-0">
              💊
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-ink">{m.name}</div>
              <div className="mt-0.5 text-xs text-sub">{m.qty}</div>
            </div>
            <div className="font-heading font-bold text-sm text-ink">${m.price}</div>
          </div>
        ))}

        <Button className="w-full mt-1">Enviar pedido por WhatsApp</Button>

        <div className="mt-1.5 flex items-center gap-2.5 rounded-2xl bg-[#F2F6F5] p-3.5">
          <span className="text-lg">📍</span>
          <span className="text-[12.5px] leading-snug text-sub">Farmacia más cercana: a 800 m de tu ubicación</span>
        </div>
      </div>
    </div>
  );
}
