export type Level = 'Bronce' | 'Plata' | 'Oro' | 'Diamante';

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  durationMinutes: number;
  price: number;
}

export interface Appointment {
  id: string;
  specialtyId: string;
  specialtyName: string;
  slot: string;
  date: string;
  location: string;
  status: 'confirmada' | 'completada';
}

export type ExamStatus = 'listo' | 'en_proceso';

export interface Exam {
  id: string;
  name: string;
  date: string;
  status: ExamStatus;
  fileUrl?: string;
}

export interface Medication {
  id: string;
  name: string;
  qty: string;
  price: number;
}

export interface WalletTransaction {
  id: string;
  icon: string;
  label: string;
  date: string;
  points?: number;
  cashback?: number;
}

export interface Dependent {
  id: string;
  name: string;
  age?: string;
}

export interface RegisterInput {
  nombre: string;
  rut: string;
  telefono: string;
  direccion: string;
  correo: string;
}

export interface OnboardingAnswers {
  motivo: string | null;
  condicion: string | null;
  actividad: string | null;
  alergias: string | null;
  seguro: string | null;
}

export interface PatientProfile {
  nombre: string;
  rut: string;
  telefono: string;
  direccion: string;
  correo: string;
  level: Level;
  points: number;
  cashback: number;
  dependents: Dependent[];
}

export interface EmpresaKpi {
  label: string;
  value: string;
}

export interface EmpresaData {
  clinicName: string;
  kpis: EmpresaKpi[];
  agendas: string[];
  productos: { name: string; price: string }[];
  promos: { name: string; status: 'Activa' | 'Borrador' }[];
  info: string;
}

export interface AdminData {
  kpis: EmpresaKpi[];
  clinicas: string[];
  usuarios: { label: string; value: string }[];
  finanzas: { label: string; value: string }[];
  config: string;
}
