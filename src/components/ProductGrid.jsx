import ProductCard from './ProductCard';

const Skeleton = () => (
  <div className="overflow-hidden rounded-xl border border-god-border bg-god-card">
    <div className="aspect-[4/5] animate-pulse bg-white/5" />
    <div className="space-y-3 p-4">
      <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
      <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-white/10" />
    </div>
  </div>
);

const ProductGrid = ({ products = [], isLoading, emptyMessage = 'No products match your filters.' }) => {
  if (isLoading) {
    return <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} />)}</div>;
  }

  if (!products.length) {
    return <div className="rounded-xl border border-god-border bg-god-card p-8 text-center text-god-muted">{emptyMessage}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((product) => <ProductCard key={product._id} product={product} />)}
    </div>
  );
};

export default ProductGrid;
