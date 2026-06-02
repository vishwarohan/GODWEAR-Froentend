import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useGetMyOrdersQuery } from '../redux/api/orderApi';
import { useUpdateProfileMutation } from '../redux/api/authApi';
import { setCredentials } from '../redux/slices/authSlice';
import { setSeo } from '../utils/seo';
import PasswordField from '../components/PasswordField';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: userInfo.name, email: userInfo.email, password: '', street: '', city: '', state: '', pincode: '', country: 'India', ...userInfo.address });
  const [avatar, setAvatar] = useState(null);
  const { data: orders = [] } = useGetMyOrdersQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  useEffect(() => setSeo('Profile', 'Manage your GOD WEAR profile, address, password, and order history.'), []);

  const submit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append('name', form.name);
    body.append('email', form.email);
    if (form.password) body.append('password', form.password);
    body.append('address', JSON.stringify({ street: form.street, city: form.city, state: form.state, pincode: form.pincode, country: form.country }));
    if (avatar) body.append('avatar', avatar);
    const updated = await updateProfile(body).unwrap();
    dispatch(setCredentials({ ...userInfo, ...updated }));
    toast.success('Profile updated');
  };

  return (
    <section className="container-god grid gap-8 py-10 lg:grid-cols-[420px_1fr]">
      <form onSubmit={submit} className="rounded-xl border border-god-border bg-god-card p-6">
        <h1 className="font-heading text-5xl">Profile</h1>
        <div className="mt-6 flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-xl border border-god-border bg-black/30">
            {avatar ? (
              <img src={URL.createObjectURL(avatar)} alt="Profile preview" className="h-full w-full object-cover" />
            ) : userInfo.avatar ? (
              <img src={userInfo.avatar} alt={userInfo.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-heading text-4xl text-god-gold">{userInfo.name?.[0] || 'U'}</span>
            )}
          </div>
          <label className="btn-outline cursor-pointer">
            Upload Photo
            <input className="hidden" type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
          </label>
        </div>
        <div className="mt-6 grid gap-3">
          {['name', 'email'].map((field) => <input key={field} className="input-god" type={field === 'email' ? 'email' : 'text'} placeholder={field} value={form[field] || ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />)}
          <PasswordField placeholder="New password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {['street', 'city', 'state', 'pincode', 'country'].map((field) => <input key={field} className="input-god" placeholder={field} value={form[field] || ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />)}
          <button className="btn-gold">Save Changes</button>
        </div>
      </form>
      <div>
        <h2 className="font-heading text-5xl">Past Orders</h2>
        <div className="mt-6 grid gap-3">{orders.map((order) => <div key={order._id} className="rounded-xl border border-god-border bg-god-card p-4"><div className="flex justify-between"><span>{order._id}</span><span className="rounded-full bg-god-gold/10 px-3 py-1 text-sm text-god-gold">{order.status}</span></div><p className="mt-2 text-god-muted">₹{order.totalPrice}</p></div>)}</div>
      </div>
    </section>
  );
};

export default Profile;
