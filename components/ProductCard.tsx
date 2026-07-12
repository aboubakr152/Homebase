import Link from 'next/link';
import { type Product, placeholderImage } from '@/lib/products';
import { AmazonButton } from './AmazonButton';
export function ProductCard({ product }: { product: Product }) { const img=product.mainImage?.url||placeholderImage; return <article className="product-card"><div className="product-image"><img src={img} alt={product.mainImage?.alt || product.name} loading="lazy" /></div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.shortDescription}</p><div className="card-actions"><Link className="btn btn-secondary" href={`/products/${product.slug}`}>View Product</Link><AmazonButton product={product}>Check Price on Amazon</AmazonButton></div></article> }
