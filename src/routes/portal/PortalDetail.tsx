import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackHeader } from '../../components/BackHeader';
import { StatusTag } from '../../components/StatCard';
import { Chevron } from '../../components/ListRow';
import { api } from '../../api/mockApi';
import type { AdminData, EmpresaData } from '../../api/types';

type Kind = 'empresa' | 'admin';

const TITLES: Record<Kind, Record<string, string>> = {
  empresa: {
    agendas: 'Configurar agendas',
    productos: 'Productos y servicios',
    promos: 'Promociones',
    empresa: 'Información de la empresa',
  },
  admin: {
    clinicas: 'Clínicas y sucursales',
    usuarios: 'Usuarios y roles',
    config: 'Configuración global',
    finanzas: 'Finanzas y reportes',
  },
};

function Row({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-[13.5px] font-medium text-ink">
      {left}
      {right}
    </div>
  );
}

export function PortalDetail({ kind }: { kind: Kind }) {
  const navigate = useNavigate();
  const { section = '' } = useParams();
  const isAdmin = kind === 'admin';
  const [data, setData] = useState<EmpresaData | AdminData | null>(null);

  useEffect(() => {
    (isAdmin ? api.getAdminData() : api.getEmpresaData()).then(setData);
  }, [isAdmin]);

  if (!data) return null;
  const title = TITLES[kind][section] ?? '';

  let content: React.ReactNode = null;

  if (!isAdmin) {
    const empresa = data as EmpresaData;
    if (section === 'agendas') {
      content = empresa.agendas.map((a) => (
        <Row key={a} left={a} right={<span className="font-heading font-bold text-xs text-teal">Editar</span>} />
      ));
    } else if (section === 'productos') {
      content = empresa.productos.map((p) => (
        <Row key={p.name} left={p.name} right={<span className="font-bold">{p.price}</span>} />
      ));
    } else if (section === 'promos') {
      content = empresa.promos.map((p) => (
        <Row key={p.name} left={p.name} right={<StatusTag label={p.status} tone={p.status === 'Activa' ? 'teal' : 'warn'} />} />
      ));
    } else if (section === 'empresa') {
      content = (
        <div className="rounded-2xl border border-border bg-white p-4 text-[13px] leading-relaxed text-sub">
          {empresa.info}
        </div>
      );
    }
  } else {
    const admin = data as AdminData;
    if (section === 'clinicas') {
      content = admin.clinicas.map((c) => <Row key={c} left={c} right={<Chevron />} />);
    } else if (section === 'usuarios') {
      content = admin.usuarios.map((u) => <Row key={u.label} left={u.label} right={<span className="font-bold">{u.value}</span>} />);
    } else if (section === 'finanzas') {
      content = admin.finanzas.map((f) => <Row key={f.label} left={f.label} right={<span className="font-bold">{f.value}</span>} />);
    } else if (section === 'config') {
      content = (
        <div className="rounded-2xl border border-border bg-white p-4 text-[13px] leading-relaxed text-sub">
          {admin.config}
        </div>
      );
    }
  }

  return (
    <div className="h-full flex flex-col">
      <BackHeader title={title} onBack={() => navigate(`/${kind}`)} />
      <div className="flex-1 overflow-y-auto scrollhide px-5 pt-4 pb-7 flex flex-col gap-2.5">{content}</div>
    </div>
  );
}
