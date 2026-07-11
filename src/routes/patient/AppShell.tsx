import { Outlet } from 'react-router-dom';
import { TabBar } from '../../components/TabBar';
import { usePatient } from '../../context/PatientContext';

export function AppShell() {
  const { loading } = usePatient();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-sub text-sm">Cargando tu cuenta…</div>
    );
  }

  return (
    <div className="relative h-full">
      <Outlet />
      <TabBar />
    </div>
  );
}
