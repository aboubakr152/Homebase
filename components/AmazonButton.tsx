import { amazonHref, type Product } from '@/lib/products';

export function AmazonButton({ product, children = 'Shop on Amazon', className = '' }: { product?: Pick<Product, 'amazonAttributionUrl' | 'amazonUrlUS'>; children?: React.ReactNode; className?: string }) {
  return <a className={`btn btn-primary ${className}`} href={amazonHref(product)} target="_blank" rel="noopener noreferrer">{children}</a>;
}
