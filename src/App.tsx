import { Navigate, Route, Routes } from 'react-router-dom';
import { AppFrame } from './components/AppFrame';
import { PatientProvider } from './context/PatientContext';
import { Landing } from './routes/Landing';
import { Register } from './routes/patient/Register';
import { Onboarding } from './routes/patient/Onboarding';
import { AppShell } from './routes/patient/AppShell';
import { Home } from './routes/patient/Home';
import { Agenda } from './routes/patient/Agenda';
import { Salud } from './routes/patient/Salud';
import { Farmacia } from './routes/patient/Farmacia';
import { Perfil } from './routes/patient/Perfil';
import { Wallet } from './routes/patient/Wallet';
import { WhatsappDemo } from './routes/whatsapp/WhatsappDemo';
import { BookingGuide } from './routes/whatsapp/BookingGuide';
import { PortalHome } from './routes/portal/PortalHome';
import { PortalDetail } from './routes/portal/PortalDetail';

function App() {
  return (
    <PatientProvider>
      <AppFrame>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route path="/app" element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="salud" element={<Salud />} />
            <Route path="farmacia" element={<Farmacia />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="perfil/billetera" element={<Wallet />} />
          </Route>

          <Route path="/whatsapp" element={<WhatsappDemo />} />
          <Route path="/whatsapp/guia" element={<BookingGuide />} />

          <Route path="/empresa" element={<PortalHome kind="empresa" />} />
          <Route path="/empresa/:section" element={<PortalDetail kind="empresa" />} />
          <Route path="/admin" element={<PortalHome kind="admin" />} />
          <Route path="/admin/:section" element={<PortalDetail kind="admin" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppFrame>
    </PatientProvider>
  );
}

export default App;
