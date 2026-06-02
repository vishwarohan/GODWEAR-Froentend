import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import CartDrawer from '../components/CartDrawer';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { setSeo } from '../utils/seo';

const Cart = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => setSeo('Cart', 'Review your GOD WEAR cart before secure checkout.'), []);

  return (
    <section className="container-god grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-heading text-6xl">Cart</h1>
        <div className="mt-6 grid gap-4">
          {!items.length && <div className="rounded-xl border border-god-border bg-god-card p-8 text-god-muted">Your cart is empty. <Link to="/shop" className="text-god-gold">Shop now</Link></div>}
          {items.map((item) => (
            <article key={item.cartKey} className="grid grid-cols-[88px_1fr] gap-4 rounded-xl border border-god-border bg-god-card p-4">
              <img src={item.image} alt={item.name} className="h-24 w-22 rounded-xl object-cover" />
              <div>
                <div className="flex justify-between gap-3"><h2 className="font-bold">{item.name}</h2><button onClick={() => dispatch(removeFromCart(item.cartKey))} className="text-god-muted hover:text-red-400"><FaTrash /></button></div>
                <p className="mt-1 text-sm text-god-muted">{item.size} / {item.color}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-xl border border-god-border"><button className="p-3" onClick={() => dispatch(updateQuantity({ cartKey: item.cartKey, qty: item.qty - 1 }))}><FaMinus /></button><span className="px-3">{item.qty}</span><button className="p-3" onClick={() => dispatch(updateQuantity({ cartKey: item.cartKey, qty: item.qty + 1 }))}><FaPlus /></button></div>
                  <strong>₹{item.price * item.qty}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <CartDrawer />
    </section>
  );
};

export default Cart;
