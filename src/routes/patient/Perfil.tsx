import { useNavigate } from 'react-router-dom';
import { ScreenHeader } from '../../components/ScreenHeader';
import { usePatient } from '../../context/PatientContext';
import type { Level } from '../../api/types';

const LEVELS: Level[] = ['Bronce', 'Plata', 'Oro', 'Diamante'];
const LEVEL_EMOJI = ['🥉', '🥈', '🥇', '💎'];

export function Perfil() {
  const navigate = useNavigate();
  const { profile } = usePatient();
  if (!profile) return null;

  const idx = LEVELS.indexOf(profile.level);

  const mask = (value: string, visible: number) => value.slice(0, visible) + '•'.repeat(Math.max(value.length - visible, 3));

  const rows: [string, string][] = [
    ['Nombre', profile.nombre],
    ['RUT / ID', mask(profile.rut, 6)],
    ['Teléfono', mask(profile.telefono, 6)],
    ['Dirección', profile.direccion.split(',').slice(-2).join(',').trim()],
  ];

  return (
    <div className="h-full overflow-y-auto scrollhide pb-[90px]">
      <ScreenHeader title="Mi perfil" subtitle="Billetera digital y progreso" />

      <div
        onClick={() => navigate('/app/perfil/billetera')}
        className="mx-5 mt-2.5 rounded-2xl px-[18px] py-4 text-white cursor-pointer bg-gradient-to-br from-teal to-teal-dark"
      >
        <div className="flex items-center justify-between">
          <div className="font-heading font-semibold text-[11px] uppercase tracking-wider opacity-85">
            Billetera Welbe
          </div>
          <div className="text-xl">💳</div>
        </div>
        <div className="mt-2 font-heading font-extrabold text-[26px]">{profile.points} pts</div>
        <div className="mt-1 text-[12.5px] opacity-85">
          Cashback disponible: ${profile.cashback} · Ver movimientos ›
        </div>
      </div>

      <div className="px-5 pt-5 font-heading font-bold text-[13px] text-ink">Progreso de nivel</div>
      <div className="mx-5 mt-2.5 rounded-2xl border border-border bg-white p-4">
        <div className="flex justify-between">
          {LEVELS.map((l, i) => (
            <div key={l} className={`flex flex-col items-center gap-1.5 ${i <= idx ? 'opacity-100' : 'opacity-35'}`}>
              <div className="text-xl">{LEVEL_EMOJI[i]}</div>
              <div className="font-heading font-semibold text-[10.5px] text-ink">{l}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-3.5 h-1.5 rounded-full bg-[#EDF2F1]">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-teal"
            style={{ width: `${((idx + 1) / LEVELS.length) * 100}%` }}
          />
        </div>
        <div className="mt-2.5 text-xs text-sub">Completa tu ficha clínica para llegar a Oro (+300 pts)</div>
      </div>

      <div className="px-5 pt-5 font-heading font-bold text-[13px] text-ink">Datos personales</div>
      <div className="mx-5 mt-2.5 rounded-2xl border border-border bg-white px-1.5">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`flex justify-between px-2.5 py-3 ${i < rows.length - 1 ? 'border-b border-[#F2F6F5]' : ''}`}
          >
            <div className="text-[13px] text-sub">{label}</div>
            <div className="font-semibold text-[13px] text-ink">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
