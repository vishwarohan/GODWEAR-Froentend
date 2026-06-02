import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearCart, saveShippingAddress } from '../redux/slices/cartSlice';
import { useCreateOrderMutation, useCreateRazorpayOrderMutation, useVerifyPaymentMutation } from '../redux/api/orderApi';
import { getApiError } from '../redux/api/baseApi';
import { setSeo } from '../utils/seo';

const loadRazorpay = () => new Promise((resolve) => {
  if (window.Razorpay) return resolve(true);
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

const Checkout = () => {
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [address, setAddress] = useState({ street: '', city: '', state: '', pincode: '', country: 'India', ...shippingAddress });
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [isPlacing, setIsPlacing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => setSeo('Checkout', 'Complete your secure GOD WEAR order with Razorpay.'), []);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 2499 ? 0 : 99;
  const total = subtotal + shipping;

  const placeCodOrder = async () => {
    const order = await createOrder({
      orderItems: cartItems,
      shippingAddress: address,
      paymentMethod: 'Cash on Delivery',
      paymentResult: { status: 'pending' },
      totalPrice: total,
    }).unwrap();
    dispatch(clearCart());
    toast.success('Order placed');
    navigate(`/order-success?orderId=${order._id}`);
  };

  const placePaidOrder = async (response) => {
    const verified = await verifyPayment(response).unwrap();
    const order = await createOrder({
      orderItems: cartItems,
      shippingAddress: address,
      paymentMethod: 'Razorpay',
      paymentResult: { ...response, status: verified.status || 'captured' },
      totalPrice: total,
    }).unwrap();
    dispatch(clearCart());
    toast.success('Payment successful. Order placed');
    navigate(`/order-success?orderId=${order._id}`);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return toast.error('Your cart is empty.');
    dispatch(saveShippingAddress(address));
    setIsPlacing(true);
    try {
      if (paymentMethod === 'Cash on Delivery') {
        await placeCodOrder();
        return;
      }

      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!key || key.startsWith('your_')) throw new Error('Razorpay key is missing in client/.env.');
      const ready = await loadRazorpay();
      if (!ready) throw new Error('Razorpay failed to load.');
      const paymentOrder = await createRazorpayOrder({ amount: total }).unwrap();
      const options = {
        key,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: 'GOD WEAR',
        description: 'Premium activewear order',
        order_id: paymentOrder.id,
        prefill: { name: userInfo.name, email: userInfo.email },
        theme: { color: '#c9a84c' },
        handler: async (response) => {
          try {
            await placePaidOrder(response);
          } catch (err) {
            toast.error(getApiError(err, 'Payment verification failed.'));
          } finally {
            setIsPlacing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsPlacing(false);
            toast.error('Payment cancelled.');
          },
        },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      toast.error(getApiError(error, error.message || 'Checkout failed.'));
      setIsPlacing(false);
    }
  };

  return (
    <section className="container-god grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <form onSubmit={submit} className="rounded-xl border border-god-border bg-god-card p-6">
        <h1 className="font-heading text-6xl">Checkout</h1>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {['street', 'city', 'state', 'pincode', 'country'].map((field) => (
            <input key={field} className={`input-god ${field === 'street' ? 'md:col-span-2' : ''}`} placeholder={field[0].toUpperCase() + field.slice(1)} value={address[field]} onChange={(e) => setAddress({ ...address, [field]: e.target.value })} required />
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {['Razorpay', 'Cash on Delivery'].map((method) => (
            <label key={method} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-bold ${paymentMethod === method ? 'border-god-gold bg-god-gold/10 text-god-gold' : 'border-god-border text-white'}`}>
              <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} />
              {method}
            </label>
          ))}
        </div>
        <button className="btn-gold mt-6 w-full" disabled={isPlacing}>{isPlacing ? 'Processing...' : paymentMethod === 'Razorpay' ? 'Pay Securely' : 'Place COD Order'}</button>
      </form>
      <aside className="rounded-xl border border-god-border bg-god-card p-5">
        <h2 className="font-heading text-3xl">Summary</h2>
        <div className="mt-4 grid gap-3 text-sm">{cartItems.map((item) => <div key={item.cartKey} className="flex justify-between gap-3 text-god-muted"><span>{item.name} x {item.qty}</span><span className="text-white">₹{item.price * item.qty}</span></div>)}</div>
        <div className="mt-4 border-t border-god-border pt-4 text-sm text-god-muted">
          <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
          <div className="mt-2 flex justify-between text-lg font-bold text-white"><span>Total</span><span>₹{total}</span></div>
        </div>
      </aside>
    </section>
  );
};

export default Checkout;
