import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../../components/BackHeader';
import { Button } from '../../components/Button';
import { usePatient } from '../../context/PatientContext';

export function Wallet() {
  const navigate = useNavigate();
  const { profile, walletTransactions } = usePatient();
  if (!profile) return null;

  return (
    <div className="h-full flex flex-col">
      <BackHeader title="Billetera Welbe" onBack={() => navigate('/app/perfil')} />

      <div className="mx-5 mt-3.5 rounded-2xl p-[18px] text-white bg-gradient-to-br from-teal to-teal-dark">
        <div className="flex justify-between">
          <div>
            <div className="font-heading font-semibold text-[11px] uppercase tracking-wider opacity-85">Puntos</div>
            <div className="mt-1 font-heading font-extrabold text-2xl">{profile.points}</div>
          </div>
          <div className="text-right">
            <div className="font-heading font-semibold text-[11px] uppercase tracking-wider opacity-85">
              Cashback
            </div>
            <div className="mt-1 font-heading font-extrabold text-2xl">${profile.cashback}</div>
          </div>
        </div>
        <div className="mt-2.5 text-xs opacity-85">Usa tu cashback como pago en consultas, exámenes y farmacia.</div>
      </div>

      <div className="mx-5 mt-3 grid grid-cols-2 gap-2.5">
        <Button className="text-[13.5px] px-3 py-3">Pagar con cashback</Button>
        <Button variant="ghost" className="text-[13.5px] px-3 py-3">
          Canjear puntos
        </Button>
      </div>

      <div className="px-5 pt-[18px] font-heading font-bold text-[13px] text-ink">Movimientos</div>
      <div className="flex-1 overflow-y-auto scrollhide px-5 pt-2.5 pb-7 flex flex-col gap-2.5">
        {walletTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white px-[15px] py-3.5">
            <div className="w-[38px] h-[38px] rounded-[10px] bg-[#F2F6F5] flex items-center justify-center text-lg shrink-0">
              {tx.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13.5px] text-ink">{tx.label}</div>
              <div className="mt-0.5 text-[11.5px] text-sub">{tx.date}</div>
            </div>
            <div className="text-right shrink-0">
              {tx.points !== undefined && (
                <div className="font-heading font-bold text-[12.5px] text-teal">+{tx.points} pts</div>
              )}
              {tx.cashback !== undefined && (
                <div className={`mt-0.5 font-semibold text-[11.5px] ${tx.cashback < 0 ? 'text-danger' : 'text-sub'}`}>
                  {tx.cashback < 0 ? '-' : '+'}${Math.abs(tx.cashback)}
                  {tx.cashback > 0 ? ' cashback' : ''}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
