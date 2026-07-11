import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { BottomSheet } from '../../components/BottomSheet';
import { SuccessScreen, LevelBadge } from '../../components/SuccessScreen';
import { api } from '../../api/mockApi';
import type { RegisterInput } from '../../api/types';

const FIELDS: { key: keyof RegisterInput; label: string; placeholder: string }[] = [
  { key: 'nombre', label: 'Nombre completo', placeholder: 'Camila Rodríguez' },
  { key: 'rut', label: 'RUT / ID', placeholder: '18.245.301-K' },
  { key: 'telefono', label: 'Teléfono', placeholder: '+56 9 8765 4321' },
  { key: 'direccion', label: 'Dirección', placeholder: 'Av. Providencia 1234' },
  { key: 'correo', label: 'Correo electrónico', placeholder: 'camila@correo.com' },
];

const EMPTY: RegisterInput = { nombre: '', rut: '', telefono: '', direccion: '', correo: '' };

export function Register() {
  const navigate = useNavigate();
  const [fields, setFields] = useState<RegisterInput>(EMPTY);
  const [tycAccepted, setTycAccepted] = useState(false);
  const [tycOpen, setTycOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const setField = (key: keyof RegisterInput, value: string) => setFields((f) => ({ ...f, [key]: value }));

  const restart = () => {
    setFields(EMPTY);
    setTycAccepted(false);
    setTycOpen(false);
    setDone(false);
  };

  const canSubmit = tycAccepted && !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    await api.registerPatient(fields);
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <SuccessScreen
        emoji="🎉"
        title="Cuenta creada"
        description="Solo pedimos 5 datos para empezar. El resto de tu ficha es opcional — y te da puntos."
        badge={<LevelBadge emoji="🥉" label="Nivel Bronce · +100 pts" />}
      >
        <div className="mt-3 flex flex-col gap-2.5 w-full max-w-[220px]">
          <Button onClick={() => navigate('/onboarding')} className="w-full">
            Continuar
          </Button>
          <Button onClick={restart} variant="outline" className="w-full">
            ↺ Reiniciar demo
          </Button>
        </div>
      </SuccessScreen>
    );
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="px-6 pt-6">
        <div className="font-heading font-extrabold text-2xl text-teal">welbe</div>
        <div className="mt-3.5 font-heading font-extrabold text-xl text-ink">Crea tu cuenta</div>
        <div className="mt-1 text-[13px] text-sub">Solo 5 datos. Rápido y simple.</div>
      </div>

      <div className="flex-1 overflow-y-auto scrollhide px-[22px] pt-4 flex flex-col gap-3">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <div className="mb-1.5 font-heading font-semibold text-xs text-sub">{f.label}</div>
            <input
              value={fields[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => setField(f.key, e.target.value)}
              className="w-full rounded-xl border-[1.5px] border-border-strong bg-white px-3.5 py-3 text-sm font-medium text-ink outline-none focus:border-teal"
            />
          </div>
        ))}
        <div
          onClick={() => (tycAccepted ? setTycAccepted(false) : setTycOpen(true))}
          className="flex gap-2.5 items-start cursor-pointer py-2 px-0.5"
        >
          <div
            className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center text-[13px] text-white ${
              tycAccepted ? 'bg-teal' : 'border-[1.5px] border-[#C6D2CE] bg-white'
            }`}
          >
            {tycAccepted ? '✓' : ''}
          </div>
          <div className="text-xs leading-relaxed text-sub">
            Acepto los <span className="text-teal font-bold underline">términos y condiciones</span> (obligatorio, se
            re-acepta con cada actualización).
          </div>
        </div>
      </div>

      <div className="px-5 pt-2.5 pb-6">
        <Button onClick={submit} disabled={!canSubmit} className="w-full">
          {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </div>

      {tycOpen && (
        <BottomSheet onClose={() => setTycOpen(false)}>
          <div className="font-heading font-extrabold text-[17px] text-ink">Términos y condiciones</div>
          <div className="text-[12.5px] leading-relaxed text-sub overflow-y-auto">
            Tratamiento de datos personales y de salud conforme al marco legal de Chile, Brasil, Colombia y México
            (protección de datos, ficha clínica, resultados de exámenes, comercio de medicamentos y servicios de
            salud). Cada actualización de estos términos requiere tu nueva aceptación para continuar usando la
            plataforma.
          </div>
          <Button onClick={() => { setTycAccepted(true); setTycOpen(false); }} className="w-full">
            Acepto los términos
          </Button>
          <Button onClick={() => setTycOpen(false)} variant="ghost" className="w-full">
            Cerrar
          </Button>
        </BottomSheet>
      )}
    </div>
  );
}
