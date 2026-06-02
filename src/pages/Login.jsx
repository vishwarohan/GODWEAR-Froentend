import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../redux/api/authApi';
import { setCredentials } from '../redux/slices/authSlice';
import { getApiError } from '../redux/api/baseApi';
import { setSeo } from '../utils/seo';
import PasswordField from '../components/PasswordField';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { isLoading }] = useLoginMutation();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => setSeo('Login', 'Login to your GOD WEAR account and continue checkout.'), []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form).unwrap();
      dispatch(setCredentials(user));
      toast.success('Login successful');
      navigate(redirect);
    } catch (error) {
      toast.error(getApiError(error, 'Login failed.'));
    }
  };

  return (
    <section className="container-god grid min-h-[70vh] place-items-center py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl border border-god-border bg-god-card p-6 shadow-dark">
        <h1 className="font-heading text-5xl">Login</h1>
        {params.get('redirect') && <p className="mt-2 rounded-xl border border-god-gold/40 bg-god-gold/10 p-3 text-sm text-god-gold">Login to continue to your cart</p>}
        <div className="mt-6 grid gap-3">
          <input className="input-god" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <PasswordField value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn-gold" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Login'}</button>
        </div>
        <p className="mt-5 text-sm text-god-muted">New here? <Link className="text-god-gold" to={`/register?redirect=${encodeURIComponent(redirect)}`}>Create account</Link></p>
      </form>
    </section>
  );
};

export default Login;
