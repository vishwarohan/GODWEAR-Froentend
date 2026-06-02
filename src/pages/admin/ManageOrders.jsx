import { useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminShell from './AdminShell';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../redux/api/orderApi';
import { useGetWhatsAppStatsQuery } from '../../redux/api/productApi';
import { setSeo } from '../../utils/seo';

const ManageOrders = () => {
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: stats = [] } = useGetWhatsAppStatsQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();
  useEffect(() => setSeo('Manage Orders', 'Update GOD WEAR order status and review WhatsApp product query stats.'), []);

  return (
    <AdminShell title="Orders">
      <div className="overflow-x-auto rounded-xl border border-god-border bg-god-card"><table className="w-full text-left text-sm"><thead className="text-god-gold"><tr><th className="p-4">ID</th><th>User</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order._id} className="border-t border-god-border"><td className="p-4">{order._id}</td><td>{order.user?.email}</td><td>₹{order.totalPrice}</td><td><select className="input-god" value={order.status} onChange={async (e) => { await updateStatus({ id: order._id, status: e.target.value }); toast.success('Status updated'); }}><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></td></tr>)}</tbody></table></div>
      <div className="mt-8 rounded-xl border border-god-border bg-god-card p-5"><h2 className="font-heading text-4xl">WhatsApp Query Stats</h2>{stats.map((row) => <p key={row._id} className="mt-3 flex justify-between border-t border-god-border pt-3 text-god-muted"><span>{row._id || 'General'}</span><span>{row.count}</span></p>)}</div>
    </AdminShell>
  );
};

export default ManageOrders;
