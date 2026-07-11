import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../../components/StatCard';
import { ListRow, Chevron } from '../../components/ListRow';
import { api } from '../../api/mockApi';
import type { AdminData, EmpresaData } from '../../api/types';

type Kind = 'empresa' | 'admin';

const EMPRESA_ITEMS = [
  { id: 'agendas', icon: '📅', t: 'Configurar agendas', d: 'Horarios por profesional y sucursal' },
  { id: 'productos', icon: '🏷️', t: 'Productos y servicios', d: 'Catálogo y precios' },
  { id: 'promos', icon: '📣', t: 'Promociones', d: 'Ofertas para pacientes' },
  { id: 'empresa', icon: 'ℹ️', t: 'Información de la empresa', d: 'Datos, logo, ubicaciones' },
];

const ADMIN_ITEMS = [
  { id: 'clinicas', icon: '🏥', t: 'Clínicas y sucursales', d: '3 clínicas · 5 sucursales' },
  { id: 'usuarios', icon: '👥', t: 'Usuarios y roles', d: 'Pacientes, médicos, empresas' },
  { id: 'config', icon: '⚙️', t: 'Configuración global', d: 'Planes, T&C, integraciones' },
  { id: 'finanzas', icon: '📊', t: 'Finanzas y reportes', d: 'Ledger, split de pagos' },
];

export function PortalHome({ kind }: { kind: Kind }) {
  const navigate = useNavigate();
  const isAdmin = kind === 'admin';
  const items = isAdmin ? ADMIN_ITEMS : EMPRESA_ITEMS;
  const [data, setData] = useState<EmpresaData | AdminData | null>(null);

  useEffect(() => {
    (isAdmin ? api.getAdminData() : api.getEmpresaData()).then(setData);
  }, [isAdmin]);

  if (!data) return null;

  return (
    <div className="h-full overflow-y-auto scrollhide">
      <div className="flex items-center justify-between px-[22px] pt-5 pb-1">
        <div>
          <div className="text-[13px] text-sub">{isAdmin ? 'Administrador' : 'Portal Empresa'}</div>
          <div className="font-heading font-extrabold text-xl text-ink">
            {isAdmin ? 'Welbe Admin' : (data as EmpresaData).clinicName ?? 'Clínica Roma Norte'}
          </div>
        </div>
        <div
          className={`w-[42px] h-[42px] rounded-full flex items-center justify-center text-lg ${
            isAdmin ? 'bg-ink text-white' : 'bg-teal-soft'
          }`}
        >
          {isAdmin ? '🛡️' : '🏥'}
        </div>
      </div>

      <div className="mx-5 mt-3.5 grid grid-cols-2 gap-2.5">
        {data.kpis.map((k) => (
          <StatCard key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <div className="px-5 pt-5 font-heading font-bold text-[13px] text-ink">
        {isAdmin ? 'Acceso total' : 'Gestión'}
      </div>
      <div className="px-5 pt-2.5 pb-6 flex flex-col gap-2.5">
        {items.map((it) => (
          <ListRow
            key={it.id}
            icon={it.icon}
            title={it.t}
            subtitle={it.d}
            trailing={<Chevron />}
            onClick={() => navigate(`/${kind}/${it.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
