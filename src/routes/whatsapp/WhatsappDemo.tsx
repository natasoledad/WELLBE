import { useNavigate } from 'react-router-dom';

function Bubble({ from, children }: { from: 'user' | 'bot'; children: React.ReactNode }) {
  return (
    <div
      className={`max-w-[82%] px-[13px] py-2.5 text-[13px] leading-relaxed text-[#111B21] shadow-[0_1px_1px_rgba(0,0,0,0.06)] animate-fade-up ${
        from === 'user'
          ? 'self-end rounded-[14px_14px_4px_14px] bg-[#D9FDD3]'
          : 'self-start rounded-[14px_14px_14px_4px] bg-white'
      }`}
    >
      {children}
    </div>
  );
}

export function WhatsappDemo() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-[#EFE7DD]">
      <div className="flex items-center gap-3 bg-[#075E54] px-[18px] py-3.5">
        <div className="w-[38px] h-[38px] rounded-full bg-teal-soft flex items-center justify-center text-lg">🤖</div>
        <div>
          <div className="font-heading font-bold text-[15px] text-white">Welbe Asistente</div>
          <div className="text-[11.5px] text-[#B5D9D3]">en línea · IA</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollhide px-3.5 py-4 flex flex-col gap-2.5">
        <Bubble from="user">Hola, ¿me envías el resultado de mi examen de sangre del 20 de mayo?</Bubble>
        <Bubble from="bot">
          <div>
            Claro ✅ Aquí está tu Hemograma completo (20 may). También lo envié a tu correo.
            <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-[#D5E5E0] bg-[#F0F6F4] px-3 py-2.5 font-semibold text-xs text-teal">
              📄 hemograma_20may.pdf
            </div>
          </div>
        </Bubble>
        <Bubble from="user">¿Cómo agendo una consulta con cardiólogo?</Bubble>
        <Bubble from="bot">
          <div>
            Encontré 3 horarios cerca de tu dirección 📍. Te dejo el enlace — la app te guía en 4 pasos mientras
            agendas de verdad:
            <div
              onClick={() => navigate('/whatsapp/guia')}
              className="mt-2 cursor-pointer rounded-[10px] border border-[#D5E5E0] bg-[#F0F6F4] px-3 py-2.5 text-center font-heading font-bold text-[12.5px] text-teal"
            >
              🔗 welbe.app/agendar — Abrir guía
            </div>
          </div>
        </Bubble>
      </div>

      <div className="flex gap-2 px-3.5 pt-2.5 pb-6">
        <div className="flex-1 rounded-full bg-white px-[15px] py-2.5 text-[13px] text-[#A6B4B0]">
          Escribe un mensaje…
        </div>
        <div className="w-[42px] h-[42px] rounded-full bg-[#075E54] flex items-center justify-center text-white text-base">
          ➤
        </div>
      </div>
    </div>
  );
}
