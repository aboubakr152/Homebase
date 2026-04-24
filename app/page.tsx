import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="card">
        <h1>Homebase Unified Project</h1>
        <p>All 13 modules are integrated into one ready-to-run Next.js app.</p>
        <p>
          Continue to the <Link href="/dashboard">dashboard</Link>.
        </p>
      </section>
    </main>
  );
}
