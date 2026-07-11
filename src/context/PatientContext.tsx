import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../api/mockApi';
import type {
  Appointment,
  Dependent,
  Exam,
  Level,
  Medication,
  PatientProfile,
  Specialty,
  WalletTransaction,
} from '../api/types';

interface PatientContextValue {
  profile: PatientProfile | null;
  appointments: Appointment[];
  exams: Exam[];
  medications: Medication[];
  walletTransactions: WalletTransaction[];
  loading: boolean;
  bookAppointment: (specialty: Specialty, slot: string) => Promise<Appointment>;
  applyOnboardingReward: (level: Level, points: number, dependents: Dependent[]) => void;
}

const PatientContext = createContext<PatientContextValue | null>(null);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.getPatientProfile(),
      api.listAppointments(),
      api.listExams(),
      api.listMedications(),
      api.getWalletTransactions(),
    ]).then(([p, a, e, m, w]) => {
      if (cancelled) return;
      setProfile(p);
      setAppointments(a);
      setExams(e);
      setMedications(m);
      setWalletTransactions(w);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const bookAppointment = useCallback(async (specialty: Specialty, slot: string) => {
    const appointment = await api.bookAppointment(specialty, slot);
    setAppointments((prev) => [appointment, ...prev]);
    return appointment;
  }, []);

  const applyOnboardingReward = useCallback((level: Level, points: number, dependents: Dependent[]) => {
    setProfile((prev) => (prev ? { ...prev, level, points, dependents } : prev));
  }, []);

  const value = useMemo(
    () => ({
      profile,
      appointments,
      exams,
      medications,
      walletTransactions,
      loading,
      bookAppointment,
      applyOnboardingReward,
    }),
    [profile, appointments, exams, medications, walletTransactions, loading, bookAppointment, applyOnboardingReward],
  );

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
}

export function usePatient(): PatientContextValue {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatient must be used within a PatientProvider');
  return ctx;
}
