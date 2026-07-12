import { FeedbackForm } from '@/components/FeedbackForm';
import { getProducts } from '@/lib/sanity';
export const metadata={title:'Share Your Feedback',description:'Share private product feedback with The Yellow Mango.'};
export default async function Feedback(){const products=await getProducts();return <main><section className="page-hero"><h1>Share Your Feedback</h1><p>Your feedback helps us improve our products and customer experience. Select your product below and tell us about your experience.</p></section><FeedbackForm products={products}/></main>}
