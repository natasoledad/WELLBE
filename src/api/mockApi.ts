import type {
  AdminData,
  Appointment,
  Dependent,
  EmpresaData,
  Exam,
  Level,
  Medication,
  OnboardingAnswers,
  PatientProfile,
  RegisterInput,
  Specialty,
  WalletTransaction,
} from './types';

/**
 * Mock implementation of the Welbe API client. Every function has the same
 * async shape a real fetch-based client would have, so this module can be
 * swapped for one hitting the FastAPI backend without touching callers.
 */

const LATENCY = 260;

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export const SPECIALTIES: Specialty[] = [
  { id: 'gen', name: 'Médico general', icon: '🩺', durationMinutes: 30, price: 450 },
  { id: 'cardio', name: 'Cardiología', icon: '❤️', durationMinutes: 40, price: 700 },
  { id: 'gine', name: 'Ginecología', icon: '⚕️', durationMinutes: 40, price: 650 },
  { id: 'psico', name: 'Psicología', icon: '🧠', durationMinutes: 50, price: 550 },
  { id: 'nutri', name: 'Nutrición', icon: '🥗', durationMinutes: 30, price: 500 },
  { id: 'dent', name: 'Odontología', icon: '🦷', durationMinutes: 45, price: 600 },
  { id: 'tele', name: 'Telemedicina 24/7', icon: '📱', durationMinutes: 20, price: 350 },
];

const SLOTS = ['09:00', '10:30', '11:15', '15:00', '16:45', '18:30'];

const DEMO_PATIENT: PatientProfile = {
  nombre: 'Camila Rodríguez',
  rut: '18.245.301-K',
  telefono: '+56 9 8765 4321',
  direccion: 'Av. Providencia 1234, Providencia, Santiago',
  correo: 'camila@correo.com',
  level: 'Plata',
  points: 1240,
  cashback: 124,
  dependents: [],
};

const EXAMS: Exam[] = [
  { id: uid('ex'), name: 'Hemograma completo', date: '20 may 2026', status: 'listo', fileUrl: 'hemograma_20may.pdf' },
  { id: uid('ex'), name: 'Perfil lipídico', date: '20 may 2026', status: 'listo', fileUrl: 'perfil_lipidico_20may.pdf' },
  { id: uid('ex'), name: 'Radiografía panorámica (dental)', date: '02 jun 2026', status: 'en_proceso' },
];

const MEDS: Medication[] = [
  { id: uid('med'), name: 'Losartán 50mg', qty: '30 comprimidos', price: 180 },
  { id: uid('med'), name: 'Omeprazol 20mg', qty: '14 cápsulas', price: 95 },
];

const WALLET_TXNS: WalletTransaction[] = [
  { id: uid('tx'), icon: '🩺', label: 'Consulta general', date: '08 jul', points: 45, cashback: 22 },
  { id: uid('tx'), icon: '📋', label: 'Ficha clínica completada', date: '02 jul', points: 150 },
  { id: uid('tx'), icon: '💊', label: 'Compra en farmacia', date: '28 jun', points: 18, cashback: 9 },
  { id: uid('tx'), icon: '💳', label: 'Pago con cashback', date: '20 jun', cashback: -35 },
  { id: uid('tx'), icon: '🦷', label: 'Limpieza dental', date: '12 jun', points: 60, cashback: 30 },
];

const APPOINTMENTS: Appointment[] = [];

const EMPRESA_DATA: EmpresaData = {
  clinicName: 'Clínica Roma Norte',
  kpis: [
    { label: 'Citas hoy', value: '18' },
    { label: 'Ingresos mes', value: '$12,400' },
  ],
  agendas: [
    'Dra. Nátaly — Lun a Vie 9:00–18:00',
    'Dr. Fuentes (Gral.) — Lun, Mié, Vie',
    'Nutrición — Mar y Jue 10:00–17:00',
  ],
  productos: [
    { name: 'Consulta general', price: '$450' },
    { name: 'Limpieza dental', price: '$600' },
    { name: 'Perfil lipídico', price: '$320' },
    { name: 'Plan mensual individual', price: '$199/mes' },
  ],
  promos: [
    { name: 'Chequeo preventivo -20%', status: 'Activa' },
    { name: 'Odontología familiar 2x1', status: 'Activa' },
    { name: 'Primera telemedicina gratis', status: 'Borrador' },
  ],
  info: 'Nombre, logo, descripción, horarios de atención y ubicaciones que ven los pacientes en el mapa.',
};

const ADMIN_DATA: AdminData = {
  kpis: [
    { label: 'Pacientes', value: '120' },
    { label: 'Citas hoy', value: '31' },
  ],
  clinicas: ['Clínica Roma Norte — CDMX', 'Clínica Condesa — CDMX', 'Sucursal Polanco — CDMX'],
  usuarios: [
    { label: 'Pacientes activos', value: '120' },
    { label: 'Profesionales', value: '9' },
    { label: 'Empresas B2B', value: '4' },
  ],
  finanzas: [
    { label: 'Ingresos del mes', value: '$48,200' },
    { label: 'Split a profesionales', value: '$28,900' },
    { label: 'Cashback emitido', value: '$1,240' },
  ],
  config: 'Planes mensuales (individual, empresas, sistema público federal/estatal/municipal), términos y condiciones por país, e integraciones de WhatsApp/IA.',
};

function levelForPoints(points: number): Level {
  if (points >= 3000) return 'Diamante';
  if (points >= 1500) return 'Oro';
  if (points >= 300) return 'Plata';
  return 'Bronce';
}

export const api = {
  async registerPatient(input: RegisterInput): Promise<PatientProfile> {
    const profile: PatientProfile = {
      ...input,
      level: 'Bronce',
      points: 100,
      cashback: 0,
      dependents: [],
    };
    return delay(profile);
  },

  async submitOnboarding(
    _answers: OnboardingAnswers,
    dependents: Dependent[],
  ): Promise<{ level: Level; points: number }> {
    const points = DEMO_PATIENT.points + (dependents.length > 0 ? 50 : 0);
    return delay({ level: levelForPoints(points), points });
  },

  async listSpecialties(): Promise<Specialty[]> {
    return delay(SPECIALTIES);
  },

  async listSlots(_specialtyId: string): Promise<string[]> {
    return delay(SLOTS);
  },

  async bookAppointment(specialty: Specialty, slot: string): Promise<Appointment> {
    const appointment: Appointment = {
      id: uid('appt'),
      specialtyId: specialty.id,
      specialtyName: specialty.name,
      slot,
      date: 'Hoy',
      location: 'Clínica Las Condes — 2.4 km de tu dirección',
      status: 'confirmada',
    };
    APPOINTMENTS.unshift(appointment);
    return delay(appointment);
  },

  async listAppointments(): Promise<Appointment[]> {
    return delay(APPOINTMENTS);
  },

  async listExams(): Promise<Exam[]> {
    return delay(EXAMS);
  },

  async listMedications(): Promise<Medication[]> {
    return delay(MEDS);
  },

  async getPatientProfile(): Promise<PatientProfile> {
    return delay(DEMO_PATIENT);
  },

  async getWalletTransactions(): Promise<WalletTransaction[]> {
    return delay(WALLET_TXNS);
  },

  async getEmpresaData(): Promise<EmpresaData> {
    return delay(EMPRESA_DATA);
  },

  async getAdminData(): Promise<AdminData> {
    return delay(ADMIN_DATA);
  },
};
