import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { setSeo } from '../utils/seo';

const OrderSuccess = () => {
  const [params] = useSearchParams();
  useEffect(() => setSeo('Order Success', 'Your GOD WEAR order has been placed successfully.'), []);
  return (
    <section className="container-god grid min-h-[65vh] place-items-center py-10 text-center">
      <div>
        <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-god-gold text-4xl text-god-bg shadow-gold"><FaCheck /></motion.div>
        <h1 className="mt-6 font-heading text-6xl">Order Confirmed</h1>
        <p className="mt-2 text-god-muted">Order ID: <span className="text-white">{params.get('orderId') || 'Processing'}</span></p>
        <Link to="/shop" className="btn-gold mt-6">Continue Shopping</Link>
      </div>
    </section>
  );
};

export default OrderSuccess;
