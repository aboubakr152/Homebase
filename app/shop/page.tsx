import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/sanity';
import { categories } from '@/lib/products';
export const metadata={title:'Shop All',description:'Browse all active The Yellow Mango products for the United States and check prices on Amazon.com.'};
export default async function Shop(){const products=await getProducts();return <main><section className="page-hero"><p className="eyebrow">United States catalogue</p><h1>Shop The Yellow Mango</h1><p>Browse active products and complete purchases securely through Amazon.com.</p><div className="filter-row"><a href="/shop">All Products</a>{categories.map((c)=><a key={c} href={`/shop?category=${encodeURIComponent(c)}`}>{c}</a>)}</div></section><ProductGrid products={products}/></main>}
