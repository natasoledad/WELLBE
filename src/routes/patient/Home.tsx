import { useNavigate } from 'react-router-dom';
import { usePatient } from '../../context/PatientContext';

const ACTIONS = [
  { id: 'agenda', label: 'Agendar consulta', icon: '📅', to: '/app/agenda' },
  { id: 'tele', label: 'Telemedicina', icon: '📱', to: '/app/agenda' },
  { id: 'salud', label: 'Laboratorio', icon: '🧪', to: '/app/salud' },
  { id: 'farmacia', label: 'Farmacia', icon: '💊', to: '/app/farmacia' },
];

const PROMOS = [
  { title: 'Chequeo preventivo -20%', color: '#FCEFE7' },
  { title: 'Odontología familiar 2x1', color: '#EAF1FF' },
];

export function Home() {
  const navigate = useNavigate();
  const { profile, appointments } = usePatient();
  if (!profile) return null;

  return (
    <div className="h-full overflow-y-auto scrollhide pb-[90px]">
      <div className="flex items-start justify-between px-[22px] pt-5 pb-1">
        <div>
          <div className="text-[13px] text-sub">Hola,</div>
          <div className="font-heading font-extrabold text-xl text-ink">{profile.nombre}</div>
        </div>
        <div className="w-[42px] h-[42px] rounded-full bg-teal-soft flex items-center justify-center text-lg">👩</div>
      </div>

      <div className="mx-5 mt-4 flex items-center justify-between rounded-2xl px-[18px] py-4 text-white bg-gradient-to-br from-teal to-teal-dark">
        <div>
          <div className="font-heading font-semibold text-[11px] uppercase tracking-wider opacity-85">
            Nivel {profile.level}
          </div>
          <div className="mt-0.5 font-heading font-extrabold text-xl">{profile.points} pts</div>
        </div>
        <div className="text-3xl">🥈</div>
      </div>

      {appointments.length > 0 && (
        <div className="mx-5 mt-3 rounded-2xl border border-teal-soft bg-teal-soft px-4 py-3">
          <div className="font-heading font-bold text-[13px] text-teal-dark">Próxima cita</div>
          <div className="mt-0.5 text-[12.5px] text-ink">
            {appointments[0].specialtyName} · {appointments[0].date} {appointments[0].slot}
          </div>
        </div>
      )}

      <div className="px-5 pt-5 font-heading font-bold text-[13px] text-ink">Acciones rápidas</div>
      <div className="px-5 pt-2.5 grid grid-cols-2 gap-2.5">
        {ACTIONS.map((a) => (
          <div
            key={a.id}
            onClick={() => navigate(a.to)}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-white px-3.5 py-4 cursor-pointer"
          >
            <div className="text-[22px]">{a.icon}</div>
            <div className="text-[13px] font-semibold text-ink">{a.label}</div>
          </div>
        ))}
      </div>

      <div className="px-5 pt-[22px] font-heading font-bold text-[13px] text-ink">Asistente Welbe</div>
      <div
        onClick={() => navigate('/whatsapp')}
        className="mx-5 mt-2.5 flex gap-3 items-start rounded-2xl border border-[#CDEEE1] bg-[#E9FBF4] p-4 cursor-pointer"
      >
        <div className="text-[22px]">💬</div>
        <div>
          <div className="text-[13.5px] font-bold text-ink">Pregunta por WhatsApp</div>
          <div className="mt-0.5 text-[12.5px] leading-relaxed text-sub">
            "¿Cuándo está listo mi examen de sangre?" — el bot te responde al instante.
          </div>
        </div>
      </div>

      <div className="px-5 pt-[22px] font-heading font-bold text-[13px] text-ink">Promociones para ti</div>
      <div className="px-5 pt-2.5 flex gap-2.5 overflow-x-auto scrollhide">
        {PROMOS.map((p) => (
          <div
            key={p.title}
            style={{ background: p.color }}
            className="min-w-[160px] rounded-2xl p-3.5 text-[12.5px] leading-snug font-bold text-ink"
          >
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}
