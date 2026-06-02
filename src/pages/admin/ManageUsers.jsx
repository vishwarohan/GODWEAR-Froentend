import { useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminShell from './AdminShell';
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux/api/authApi';
import { setSeo } from '../../utils/seo';

const ManageUsers = () => {
  const { data: users = [] } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  useEffect(() => setSeo('Manage Users', 'Manage GOD WEAR customers and admin users.'), []);

  return (
    <AdminShell title="Users">
      <div className="grid gap-3">{users.map((user) => <div key={user._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-god-border bg-god-card p-4"><div><p className="font-bold">{user.name}</p><p className="text-sm text-god-muted">{user.email} {user.isAdmin ? '• Admin' : ''}</p></div><button className="btn-outline" onClick={async () => { await deleteUser(user._id); toast.success('User deleted'); }}>Delete</button></div>)}</div>
    </AdminShell>
  );
};

export default ManageUsers;
