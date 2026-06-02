import { useEffect } from 'react';
import AdminShell from './AdminShell';
import { useGetOrdersQuery } from '../../redux/api/orderApi';
import { useGetUsersQuery } from '../../redux/api/authApi';
import { useGetProductsQuery, useGetWhatsAppStatsQuery } from '../../redux/api/productApi';
import { setSeo } from '../../utils/seo';

const Dashboard = () => {
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: users = [] } = useGetUsersQuery();
  const { data: productsData } = useGetProductsQuery({ limit: 200 });
  const { data: waStats = [] } = useGetWhatsAppStatsQuery();
  useEffect(() => setSeo('Admin Dashboard', 'GOD WEAR admin dashboard for sales, orders, users, and product alerts.'), []);
  const products = productsData?.products || productsData || [];
  const sales = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const lowStock = products.filter((product) => product.stock <= 5);

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        {[['Sales', `₹${sales}`], ['Orders', orders.length], ['Users', users.length], ['WhatsApp Queries', waStats.reduce?.((s, x) => s + x.count, 0) || 0]].map(([label, value]) => <div key={label} className="rounded-xl border border-god-border bg-god-card p-5"><p className="text-sm uppercase tracking-[0.2em] text-god-muted">{label}</p><strong className="mt-2 block text-3xl text-god-gold">{value}</strong></div>)}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-god-border bg-god-card p-5"><h2 className="font-heading text-4xl">Recent Orders</h2>{orders.slice(0, 6).map((order) => <p key={order._id} className="mt-3 flex justify-between border-t border-god-border pt-3 text-sm text-god-muted"><span>{order._id}</span><span>₹{order.totalPrice}</span></p>)}</div>
        <div className="rounded-xl border border-god-border bg-god-card p-5"><h2 className="font-heading text-4xl">Low Stock</h2>{lowStock.map((product) => <p key={product._id} className="mt-3 flex justify-between border-t border-god-border pt-3 text-sm text-god-muted"><span>{product.name}</span><span>{product.stock} left</span></p>)}</div>
      </div>
    </AdminShell>
  );
};

export default Dashboard;
