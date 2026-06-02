import { Link } from 'react-router-dom';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import { productMessage, whatsappUrl } from '../utils/whatsapp';

const ProductCard = ({ product }) => {
  const price = product.discountPrice || product.price;
  const productUrl = `${window.location.origin}/product/${product._id}`;

  return (
    <article className="group overflow-hidden rounded-xl border border-god-border bg-god-card shadow-dark">
      <div className="relative aspect-[4/5] overflow-hidden bg-black">
        <Link to={`/product/${product._id}`}>
          <img src={product.images?.[0]} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        <a
          href={whatsappUrl(productMessage({ product, url: productUrl }))}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-x-4 bottom-4 translate-y-4 rounded-xl bg-god-whatsapp px-4 py-3 text-center text-sm font-bold text-white opacity-0 shadow-lg shadow-green-500/20 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2"><FaWhatsapp /> Quick Query</span>
        </a>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/product/${product._id}`} className="font-bold text-white transition hover:text-god-gold">{product.name}</Link>
          <span className="flex items-center gap-1 text-sm text-god-gold"><FaStar /> {product.ratings?.toFixed?.(1) || product.ratings || 0}</span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-god-muted">{product.category}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-bold text-white">₹{price}</span>
          {product.discountPrice && <span className="text-sm text-god-muted line-through">₹{product.price}</span>}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
