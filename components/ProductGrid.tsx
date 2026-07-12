import { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';
export function ProductGrid({ products }: { products: Product[] }) { return <div className="product-grid">{products.map((product)=><ProductCard key={product.slug} product={product}/>)}</div> }
