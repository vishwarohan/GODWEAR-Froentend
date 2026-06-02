import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaShoppingBag, FaBolt, FaStar } from 'react-icons/fa';
import Loader from '../components/Loader';
import SizeGuide from '../components/SizeGuide';
import ReviewCard from '../components/ReviewCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { useGetProductQuery } from '../redux/api/productApi';
import { addToCart } from '../redux/slices/cartSlice';
import { setSeo } from '../utils/seo';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [tab, setTab] = useState('description');
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setSeo(product.name, product.description || 'Premium GOD WEAR compression activewear product detail.');
      setImage(product.images?.[0] || '');
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
    }
  }, [product]);

  const cartItem = useMemo(() => product && ({
    product: product._id,
    cartKey: `${product._id}-${selectedSize}-${selectedColor}`,
    name: product.name,
    image: product.images?.[0],
    price: product.discountPrice || product.price,
    size: selectedSize,
    color: selectedColor,
    qty: 1,
  }), [product, selectedSize, selectedColor]);

  const ensureSelection = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color.');
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!userInfo) return navigate('/login?redirect=/cart');
    if (!ensureSelection()) return;
    dispatch(addToCart(cartItem));
    toast.success('Added to cart');
    navigate('/cart');
  };

  const handleBuyNow = () => {
    if (!userInfo) return navigate('/login?redirect=/checkout');
    if (!ensureSelection()) return;
    dispatch(addToCart(cartItem));
    navigate('/checkout');
  };

  if (isLoading) return <Loader label="Loading product" />;
  if (error || !product) return <section className="container-god py-16 text-god-muted">Product not found.</section>;

  return (
    <section className="container-god grid gap-10 py-10 lg:grid-cols-2">
      <div>
        <div className="aspect-[4/5] overflow-hidden rounded-xl border border-god-border bg-god-card">
          <img src={image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {product.images?.map((src) => (
            <button key={src} className={`aspect-square overflow-hidden rounded-xl border ${image === src ? 'border-god-gold' : 'border-god-border'}`} onClick={() => setImage(src)}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-god-gold">{product.category}</p>
        <h1 className="mt-2 font-heading text-6xl">{product.name}</h1>
        <div className="mt-3 flex items-center gap-3 text-god-gold"><FaStar /> {product.ratings} ({product.numReviews} reviews)</div>
        <div className="mt-5 flex items-center gap-3 text-2xl font-bold">
          ₹{product.discountPrice || product.price}
          {product.discountPrice && <span className="text-base text-god-muted line-through">₹{product.price}</span>}
        </div>
        <div className="mt-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-god-muted">Size</p>
          <div className="flex flex-wrap gap-2">{product.sizes?.map((size) => <button key={size} onClick={() => setSelectedSize(size)} className={`h-11 min-w-12 rounded-xl border px-4 font-bold ${selectedSize === size ? 'border-god-gold bg-god-gold text-god-bg' : 'border-god-border text-white'}`}>{size}</button>)}</div>
        </div>
        <div className="mt-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-god-muted">Color</p>
          <div className="flex flex-wrap gap-2">{product.colors?.map((color) => <button key={color} onClick={() => setSelectedColor(color)} className={`rounded-xl border px-4 py-3 font-bold ${selectedColor === color ? 'border-god-gold bg-god-gold text-god-bg' : 'border-god-border text-white'}`}>{color}</button>)}</div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button className="btn-gold" onClick={handleAddToCart}><FaShoppingBag /> Add to Cart</button>
          <button className="btn-outline" onClick={handleBuyNow}><FaBolt /> Buy Now</button>
        </div>
        <div className="mt-3"><WhatsAppButton product={product} selectedSize={selectedSize} selectedColor={selectedColor} /></div>
        <div className="mt-8">
          <div className="flex gap-2 border-b border-god-border">
            {['description', 'specs', 'size guide'].map((name) => <button key={name} className={`px-4 py-3 text-sm font-bold uppercase ${tab === name ? 'text-god-gold' : 'text-god-muted'}`} onClick={() => setTab(name)}>{name}</button>)}
          </div>
          <div className="py-5 text-sm leading-7 text-god-muted">
            {tab === 'description' && product.description}
            {tab === 'specs' && <ul className="list-inside list-disc"><li>Premium compression fit</li><li>Moisture-wicking stretch fabric</li><li>Cloudinary optimized product imagery</li><li>Stock: {product.stock}</li></ul>}
            {tab === 'size guide' && <SizeGuide />}
          </div>
        </div>
        <div className="mt-8 grid gap-4">{product.reviews?.map((review) => <ReviewCard key={review._id || review.name} review={review} />)}</div>
      </div>
    </section>
  );
};

export default ProductDetail;
