export function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="card">
      <p style={{ margin: 0, color: '#475569' }}>{label}</p>
      <h3 style={{ marginBottom: 0 }}>{value}</h3>
    </article>
  );
}
