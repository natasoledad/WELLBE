import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SPECIALTIES } from '../../api/mockApi';
import { usePatient } from '../../context/PatientContext';

const STEPS = [
  { n: 1, t: 'Elige la especialidad', d: 'Cardiología ya viene seleccionada' },
  { n: 2, t: 'Elige el horario', d: '3 opciones cerca de ti' },
  { n: 3, t: 'Confirma y paga', d: 'Pago online o en clínica' },
  { n: 4, t: 'Recibe recordatorios', d: 'Notificación + WhatsApp' },
];

const CARDIO = SPECIALTIES.find((s) => s.id === 'cardio')!;

export function BookingGuide() {
  const navigate = useNavigate();
  const { bookAppointment } = usePatient();
  const [completed, setCompleted] = useState(0);
  const [booked, setBooked] = useState(false);

  const completeStep = async (index: number) => {
    const next = Math.max(completed, index + 1);
    setCompleted(next);
    if (next === STEPS.length && !booked) {
      setBooked(true);
      await bookAppointment(CARDIO, '11:15');
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg animate-fade-up">
      <div className="flex items-center gap-3 px-[22px] pt-5">
        <div onClick={() => navigate('/whatsapp')} className="cursor-pointer text-lg text-sub">
          ✕
        </div>
        <div className="font-heading font-extrabold text-[17px] text-ink">Agendar en 4 pasos</div>
      </div>

      <div className="flex-1 px-5 pt-[18px] flex flex-col gap-2.5">
        {STEPS.map((step, i) => {
          const done = completed >= i + 1;
          return (
            <div
              key={step.n}
              onClick={() => completeStep(i)}
              className={`flex items-center gap-3.5 rounded-2xl bg-white px-[15px] py-3.5 cursor-pointer ${
                done ? 'border-2 border-teal' : 'border-[1.5px] border-border-strong'
              }`}
            >
              <div
                className={`w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center font-heading font-extrabold text-[13px] ${
                  done ? 'bg-teal text-white' : 'bg-teal-soft text-teal-dark'
                }`}
              >
                {done ? '✓' : step.n}
              </div>
              <div>
                <div className="font-bold text-sm text-ink">{step.t}</div>
                <div className="mt-0.5 text-xs text-sub">{step.d}</div>
              </div>
            </div>
          );
        })}

        {completed >= STEPS.length ? (
          <div className="text-center py-3.5 font-heading font-bold text-sm text-teal animate-pop-in">
            ✅ Cita agendada de verdad — no era solo un tutorial
          </div>
        ) : (
          <div className="text-center text-xs text-[#A6B4B0] py-2">Toca cada paso para completarlo</div>
        )}
      </div>
    </div>
  );
}
