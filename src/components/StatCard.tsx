export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-border rounded-2xl px-4 py-3.5">
      <div className="text-xs text-sub">{label}</div>
      <div className="mt-1 font-heading font-extrabold text-[22px] text-ink">{value}</div>
    </div>
  );
}

export function StatusTag({ label, tone = 'teal' }: { label: string; tone?: 'teal' | 'warn' }) {
  const classes =
    tone === 'teal' ? 'text-teal bg-teal-soft' : 'text-warn bg-warn-bg';
  return <span className={`font-heading font-bold text-[11px] px-2.5 py-1 rounded-full ${classes}`}>{label}</span>;
}
