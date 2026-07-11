import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenHeader } from '../../components/ScreenHeader';
import { BackHeader } from '../../components/BackHeader';
import { ListRow, Chevron } from '../../components/ListRow';
import { Button } from '../../components/Button';
import { api } from '../../api/mockApi';
import { usePatient } from '../../context/PatientContext';
import type { Specialty } from '../../api/types';

type Step = 'list' | 'slots' | 'confirm';

export function Agenda() {
  const navigate = useNavigate();
  const { bookAppointment } = usePatient();
  const [step, setStep] = useState<Step>('list');
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    api.listSpecialties().then(setSpecialties);
  }, []);

  const pickSpecialty = async (sp: Specialty) => {
    setSelectedSpecialty(sp);
    setStep('slots');
    const s = await api.listSlots(sp.id);
    setSlots(s);
  };

  const pickSlot = async (slot: string) => {
    if (!selectedSpecialty) return;
    setSelectedSlot(slot);
    setBooking(true);
    await bookAppointment(selectedSpecialty, slot);
    setBooking(false);
    setStep('confirm');
  };

  const back = () => {
    if (step === 'confirm') {
      setStep('slots');
      setSelectedSlot(null);
    } else if (step === 'slots') {
      setStep('list');
      setSelectedSpecialty(null);
    }
  };

  const reset = () => {
    setStep('list');
    setSelectedSpecialty(null);
    setSelectedSlot(null);
  };

  if (step === 'list') {
    return (
      <div className="h-full flex flex-col">
        <ScreenHeader title="Agenda" subtitle="Elige una especialidad para ver disponibilidad" />
        <div className="flex-1 overflow-y-auto scrollhide px-5 pt-2.5 pb-[90px] flex flex-col gap-2.5">
          {specialties.map((sp) => (
            <ListRow
              key={sp.id}
              icon={sp.icon}
              title={sp.name}
              subtitle={`${sp.durationMinutes} min · $${sp.price}`}
              trailing={<Chevron />}
              onClick={() => pickSpecialty(sp)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === 'slots' && selectedSpecialty) {
    return (
      <div className="h-full flex flex-col">
        <BackHeader title={selectedSpecialty.name} onBack={back} />
        <div className="px-6 pt-1.5 text-[13px] text-sub">Horarios disponibles hoy · cerca de tu ubicación</div>
        <div className="px-5 pt-[18px] grid grid-cols-2 gap-2.5">
          {slots.map((slot) => (
            <div
              key={slot}
              onClick={() => !booking && pickSlot(slot)}
              className="text-center rounded-2xl border-[1.5px] border-border-strong bg-white px-3.5 py-3.5 font-heading font-bold text-[15px] text-ink cursor-pointer"
            >
              {booking && selectedSlot === slot ? '…' : slot}
            </div>
          ))}
        </div>
        <div className="mx-5 mt-1 flex items-center gap-2.5 rounded-2xl bg-[#F2F6F5] p-3.5">
          <span className="text-lg">📍</span>
          <span className="text-[12.5px] leading-snug text-sub">Clínica Las Condes — 2.4 km de tu dirección</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center px-7 text-center animate-fade-up">
      <div className="w-[78px] h-[78px] rounded-full bg-teal-soft flex items-center justify-center text-4xl">✅</div>
      <div className="mt-4 font-heading font-extrabold text-xl text-ink">Cita confirmada</div>
      <div className="mt-1.5 text-sm leading-relaxed text-sub">
        {selectedSpecialty?.name} · Hoy {selectedSlot}
      </div>
      <div className="mt-[18px] w-full flex flex-col gap-2.5">
        <Button onClick={reset} className="w-full">
          Agendar otra cita
        </Button>
        <Button onClick={() => navigate('/app')} variant="ghost" className="w-full">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
