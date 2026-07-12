export type Category = 'Kitchen Tools' | 'Drinkware' | 'Home Essentials';

export type Product = {
  _id: string;
  name: string;
  slug: string;
  category: Category;
  status: 'active' | 'archived' | 'draft';
  featured: boolean;
  shortDescription: string;
  description: string;
  mainImage?: { url?: string; alt?: string };
  gallery: { url?: string; alt?: string }[];
  lifestyleImages?: { url?: string; alt?: string }[];
  videoUrl?: string;
  amazonUrlUS: string;
  amazonAttributionUrl?: string;
  asinUS?: string;
  buttonLabel: 'Buy on Amazon' | 'Check Price on Amazon' | 'View on Amazon';
  colors?: string[];
  models?: string[];
  benefits: string[];
  features: { title: string; text: string; icon?: string }[];
  specifications: Record<string, string>;
  included: string[];
  instructions: string[];
  care: string[];
  faqs: { question: string; answer: string }[];
  relatedProducts: string[];
  seoTitle: string;
  seoDescription: string;
  displayOrder: number;
};

export const categories: Category[] = ['Kitchen Tools', 'Drinkware', 'Home Essentials'];

const amazonSearch = (query: string) => `https://www.amazon.com/s?k=${encodeURIComponent(`The Yellow Mango ${query}`)}`;

export const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#fff7df"/><circle cx="860" cy="250" r="190" fill="#ffd45a"/><circle cx="430" cy="520" r="260" fill="#f59e0b" opacity=".24"/><text x="90" y="750" font-family="Arial" font-size="76" font-weight="700" fill="#3f2a12">The Yellow Mango</text></svg>`);

export const fallbackProducts: Product[] = [
  {
    _id: 'manual-juicer', name: 'Manual Juicer', slug: 'manual-juicer', category: 'Kitchen Tools', status: 'active', featured: true,
    shortDescription: 'A heavy-duty manual juicer designed for fresh citrus and fruit juice.',
    description: 'A practical manual juicer for customers who want fresh juice with simple, dependable operation. Final product details can be completed in Sanity when specifications are confirmed.',
    gallery: [], amazonUrlUS: amazonSearch('Manual Juicer'), buttonLabel: 'Check Price on Amazon', benefits: ['Strong manual pressing mechanism', 'Stable base', 'Easy operation', 'Designed for fresh juice', 'Simple cleaning'],
    features: [{ title: 'Manual pressing', text: 'Designed for straightforward fruit and citrus pressing.' }, { title: 'Everyday use', text: 'Made for regular kitchen routines without unnecessary complexity.' }, { title: 'Simple care', text: 'Cleaning guidance can be expanded when final care details are supplied.' }],
    specifications: {}, included: ['Manual juicer'], instructions: ['Place the juicer on a stable surface.', 'Prepare fruit according to the product instructions.', 'Press slowly and steadily.', 'Clean after use following the care guidance.'], care: ['Clean after each use.', 'Follow the final instruction manual when available.'],
    faqs: [{ question: 'Where can I buy this product?', answer: 'Purchases are completed securely through Amazon.com.' }], relatedProducts: ['potato-chipper'], seoTitle: 'Manual Juicer | The Yellow Mango', seoDescription: 'Explore The Yellow Mango Manual Juicer and check availability on Amazon.com.', displayOrder: 1
  },
  {
    _id: 'potato-chipper', name: 'Potato Chipper', slug: 'potato-chipper', category: 'Kitchen Tools', status: 'active', featured: true,
    shortDescription: 'A practical kitchen tool designed to cut potatoes quickly and evenly.', description: 'A kitchen-friendly potato chipper designed to help prepare consistent potato cuts with simple manual operation.', gallery: [], amazonUrlUS: amazonSearch('Potato Chipper'), buttonLabel: 'Check Price on Amazon', benefits: ['Consistent cuts', 'Simple manual operation', 'Kitchen-friendly design', 'Easy cleaning'],
    features: [{ title: 'Consistent preparation', text: 'Helps prepare even potato cuts for everyday meals.' }, { title: 'Manual control', text: 'A simple, hands-on tool for kitchen prep.' }, { title: 'Safety reminders', text: 'Use with care and follow blade safety instructions.' }], specifications: {}, included: ['Potato chipper'], instructions: ['Place on a stable surface.', 'Prepare potatoes to fit the cutter.', 'Press with controlled force.', 'Handle blades carefully during cleaning.'], care: ['Use caution around cutting surfaces.', 'Clean and dry after use.'], faqs: [{ question: 'Are blade specifications final?', answer: 'Final blade material and accessory details will be added after confirmation.' }], relatedProducts: ['manual-juicer'], seoTitle: 'Potato Chipper | The Yellow Mango', seoDescription: 'Explore The Yellow Mango Potato Chipper and check availability on Amazon.com.', displayOrder: 2
  },
  {
    _id: 'tea-kettle', name: 'Tea Kettle', slug: 'tea-kettle', category: 'Home Essentials', status: 'active', featured: true,
    shortDescription: 'A practical kettle designed for everyday tea and hot beverage preparation.', description: 'A practical kettle for tea and hot beverage routines. Heat-source compatibility and capacity should be completed in Sanity after confirmation.', gallery: [], amazonUrlUS: amazonSearch('Tea Kettle'), buttonLabel: 'Check Price on Amazon', benefits: ['Everyday use', 'Comfortable handling', 'Easy pouring', 'Simple care'], features: [{ title: 'Daily beverage prep', text: 'Designed for everyday tea and hot drink routines.' }, { title: 'Comfort-focused', text: 'Product copy can be updated as final handling details are confirmed.' }, { title: 'Expandable specs', text: 'Capacity, material, and heat-source fields are ready in the CMS.' }], specifications: {}, included: ['Tea kettle'], instructions: ['Review final instructions before first use.', 'Fill according to product guidance.', 'Use only with confirmed compatible heat sources.', 'Allow to cool before cleaning.'], care: ['Follow final care instructions.', 'Do not assume heat-source compatibility until confirmed.'], faqs: [{ question: 'Is this induction compatible?', answer: 'Compatibility details will be added only after they are confirmed.' }], relatedProducts: ['thermos-bottle'], seoTitle: 'Tea Kettle | The Yellow Mango', seoDescription: 'Explore The Yellow Mango Tea Kettle and check availability on Amazon.com.', displayOrder: 3
  },
  {
    _id: 'thermos-bottle', name: 'Thermos Bottle', slug: 'thermos-bottle', category: 'Drinkware', status: 'active', featured: true,
    shortDescription: 'A reusable insulated bottle designed for hot and cold drinks.', description: 'A reusable bottle for daily hydration and hot or cold drinks. Capacity and temperature-retention claims should be completed after confirmation.', gallery: [], amazonUrlUS: amazonSearch('Thermos Bottle'), buttonLabel: 'Check Price on Amazon', benefits: ['Portable design', 'Reusable construction', 'Daily hydration', 'Easy carrying'], features: [{ title: 'On-the-go use', text: 'Designed for everyday routines at home, work, or school.' }, { title: 'Reusable choice', text: 'A practical bottle for repeated use.' }, { title: 'CMS-ready details', text: 'Capacity and retention fields are available when final details are confirmed.' }], specifications: {}, included: ['Thermos bottle'], instructions: ['Wash before first use.', 'Fill with your preferred beverage according to product guidance.', 'Secure the lid according to final instructions.', 'Clean after use.'], care: ['Clean regularly.', 'Do not add leakproof or retention claims until confirmed.'], faqs: [{ question: 'How long does it keep drinks hot or cold?', answer: 'Temperature-retention details will be added after confirmation.' }], relatedProducts: ['tea-kettle'], seoTitle: 'Thermos Bottle | The Yellow Mango', seoDescription: 'Explore The Yellow Mango Thermos Bottle and check availability on Amazon.com.', displayOrder: 4
  }
];

export const activeProducts = fallbackProducts.filter((p) => p.status === 'active').sort((a, b) => a.displayOrder - b.displayOrder);
export const getProductBySlug = (slug: string) => activeProducts.find((p) => p.slug === slug);
export const getRelatedProducts = (product: Product) => activeProducts.filter((p) => p.slug !== product.slug && (product.relatedProducts.includes(p.slug) || p.category === product.category)).slice(0, 3);
export const amazonHref = (product?: Pick<Product, 'amazonAttributionUrl' | 'amazonUrlUS'>) => product?.amazonAttributionUrl || product?.amazonUrlUS || 'https://www.amazon.com/s?k=The+Yellow+Mango';
