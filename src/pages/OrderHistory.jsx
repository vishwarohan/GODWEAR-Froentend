import { useEffect } from 'react';
import { useGetMyOrdersQuery } from '../redux/api/orderApi';
import Loader from '../components/Loader';
import { setSeo } from '../utils/seo';

const OrderHistory = () => {
  const { data = [], isLoading } = useGetMyOrdersQuery();
  useEffect(() => setSeo('Orders', 'Track GOD WEAR order status and payment history.'), []);
  if (isLoading) return <Loader label="Loading orders" />;
  return (
    <section className="container-god py-10">
      <h1 className="font-heading text-6xl">Orders</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border border-god-border bg-god-card">
        <table className="w-full text-left text-sm"><thead className="text-god-gold"><tr><th className="p-4">ID</th><th>Total</th><th>Status</th><th>Paid</th></tr></thead><tbody>{data.map((order) => <tr key={order._id} className="border-t border-god-border"><td className="p-4">{order._id}</td><td>₹{order.totalPrice}</td><td>{order.status}</td><td>{order.isPaid ? 'Yes' : 'No'}</td></tr>)}</tbody></table>
      </div>
    </section>
  );
};

export default OrderHistory;
