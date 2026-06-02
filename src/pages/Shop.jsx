import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useGetCategoriesQuery, useGetProductsQuery } from '../redux/api/productApi';
import { getApiError } from '../redux/api/baseApi';
import { setSeo } from '../utils/seo';

const sizes = ['', 'S', 'M', 'L', 'XL', 'XXL'];

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const query = useMemo(() => Object.fromEntries(params.entries()), [params]);
  const { data, isLoading } = useGetProductsQuery({ ...query, limit: 12 });
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();
  useEffect(() => setSeo('Shop', 'Browse GOD WEAR compression activewear with category, size, price, and rating filters.'), []);
  const products = data?.products || data || [];
  const page = Number(data?.page || query.page || 1);
  const pages = Number(data?.pages || 1);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    if (key !== 'page') next.set('page', '1');
    setParams(next);
  };

  return (
    <section className="container-god py-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-god-gold">Collection</p>
        <h1 className="font-heading text-6xl">Shop GOD WEAR</h1>
      </div>
      <div className="mb-8 grid gap-3 rounded-xl border border-god-border bg-god-card p-4 md:grid-cols-5">
        <select className="input-god" value={query.category || ''} disabled={categoriesLoading} onChange={(e) => update('category', e.target.value)}>
          <option value="">{categoriesLoading ? 'Loading categories...' : 'All categories'}</option>
          {query.category && !categories.some((category) => category.name === query.category) && <option value={query.category}>{query.category}</option>}
          {categories.filter((category) => category.isActive).map((category) => <option key={category._id} value={category.name}>{category.name}</option>)}
        </select>
        <select className="input-god" value={query.size || ''} onChange={(e) => update('size', e.target.value)}>{sizes.map((x) => <option key={x} value={x}>{x || 'All sizes'}</option>)}</select>
        <input className="input-god" placeholder="Min price" value={query.minPrice || ''} onChange={(e) => update('minPrice', e.target.value)} />
        <input className="input-god" placeholder="Max price" value={query.maxPrice || ''} onChange={(e) => update('maxPrice', e.target.value)} />
        <select className="input-god" value={query.sort || 'newest'} onChange={(e) => update('sort', e.target.value)}>
          <option value="newest">Newest</option><option value="price-asc">Price low/high</option><option value="price-desc">Price high/low</option><option value="rating">Rating</option>
        </select>
      </div>
      {categoriesError && <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{getApiError(categoriesError, 'Could not load categories.')}</div>}
      <ProductGrid products={products} isLoading={isLoading} />
      <div className="mt-8 flex justify-center gap-3">
        <button className="btn-outline" disabled={page <= 1} onClick={() => update('page', String(page - 1))}>Prev</button>
        <span className="grid place-items-center rounded-xl border border-god-border px-4 text-sm text-god-muted">Page {page} of {pages}</span>
        <button className="btn-outline" disabled={page >= pages} onClick={() => update('page', String(page + 1))}>Next</button>
      </div>
    </section>
  );
};

export default Shop;
