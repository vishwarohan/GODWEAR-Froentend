import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../redux/api/authApi';
import { setCredentials } from '../redux/slices/authSlice';
import { getApiError } from '../redux/api/baseApi';
import { setSeo } from '../utils/seo';
import PasswordField from '../components/PasswordField';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [register, { isLoading }] = useRegisterMutation();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => setSeo('Register', 'Create your GOD WEAR account.'), []);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match.');
    try {
      const user = await register({ name: form.name, email: form.email, password: form.password }).unwrap();
      dispatch(setCredentials(user));
      toast.success('Account created');
      navigate(redirect);
    } catch (error) {
      toast.error(getApiError(error, 'Registration failed.'));
    }
  };

  return (
    <section className="container-god grid min-h-[70vh] place-items-center py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl border border-god-border bg-god-card p-6 shadow-dark">
        <h1 className="font-heading text-5xl">Register</h1>
        <div className="mt-6 grid gap-3">
          <input className="input-god" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input-god" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <PasswordField value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <PasswordField placeholder="Confirm password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
          <button className="btn-gold" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Account'}</button>
        </div>
        <p className="mt-5 text-sm text-god-muted">Already registered? <Link className="text-god-gold" to={`/login?redirect=${encodeURIComponent(redirect)}`}>Login</Link></p>
      </form>
    </section>
  );
};

export default Register;
