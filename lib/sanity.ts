import { activeProducts, categories, getProductBySlug, type Product } from './products';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-12',
  useCdn: true
};

export function sanityImageUrl(image?: { url?: string }, width = 1200) {
  if (!image?.url) return undefined;
  return image.url.includes('cdn.sanity.io') ? `${image.url}?w=${width}&auto=format` : image.url;
}

export async function getProducts(): Promise<Product[]> {
  // Replace this fallback with @sanity/client GROQ queries once project credentials are configured.
  return activeProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return (await getProducts()).filter((product) => product.featured);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return getProductBySlug(slug);
}

export async function getCategories() {
  return categories;
}
