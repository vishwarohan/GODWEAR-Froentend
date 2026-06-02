import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <aside className="rounded-xl border border-god-border bg-god-card p-5 shadow-dark">
      <h2 className="font-heading text-3xl">Order Summary</h2>
      <div className="mt-4 grid gap-3 text-sm text-god-muted">
        <div className="flex justify-between"><span>Subtotal</span><span className="text-white">₹{subtotal}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span className="text-white">{subtotal > 2499 ? 'Free' : '₹99'}</span></div>
        <div className="border-t border-god-border pt-3 flex justify-between text-base font-bold text-white"><span>Total</span><span>₹{subtotal ? subtotal + (subtotal > 2499 ? 0 : 99) : 0}</span></div>
      </div>
      <Link to="/checkout" className="btn-gold mt-6 w-full">Proceed to Checkout</Link>
    </aside>
  );
};

export default CartDrawer;
