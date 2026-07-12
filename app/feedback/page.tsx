import { FeedbackForm } from '@/components/FeedbackForm';
import { getProducts } from '@/lib/sanity';

export const metadata = { title: 'Share Your Feedback', description: 'Share private product feedback with The Yellow Mango.' };

export default async function Feedback({ searchParams }: { searchParams?: { product?: string } }) {
  const products = await getProducts();
  return (
    <main className="feedback-page-shell">
      <section className="feedback-page-intro">
        <h1>Share Your Feedback</h1>
        <p>Your feedback helps us improve our products and customer experience.</p>
      </section>
      <FeedbackForm products={products} initialProductId={searchParams?.product} />
    </main>
  );
}
