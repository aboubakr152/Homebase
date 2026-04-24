export function SectionList({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </section>
  );
}
