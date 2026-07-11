# Welbe — patient PWA

Implementation of the `Welbe App Prototype.dc.html` design handoff (see `../README.md`, `../chats/chat1.md`)
as a real routed React app: React + Vite + TypeScript + Tailwind CSS, built as an installable PWA.

## Structure

- `src/api/` — typed API client (`types.ts`, `mockApi.ts`). Mock data with simulated latency today;
  swap `mockApi.ts` for a real client hitting the FastAPI backend without touching callers.
- `src/context/PatientContext.tsx` — shared patient session state (profile, appointments, exams,
  medications, wallet) used across the `/app` tabs.
- `src/components/` — design system primitives matching the prototype's visual language
  (teal palette, Manrope/Inter, rounded cards).
- `src/routes/` — one folder per flow:
  - `patient/` — Register → Onboarding → main app shell (Inicio/Agenda/Salud/Farmacia/Perfil tabs)
  - `whatsapp/` — the WhatsApp assistant demo and its real 4-step booking guide
  - `portal/` — shared Empresa/Admin portal views

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
