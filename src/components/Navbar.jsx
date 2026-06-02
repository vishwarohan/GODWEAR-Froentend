import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaShoppingBag, FaSignOutAlt, FaTimes, FaUserCircle } from 'react-icons/fa';
import { logout } from '../redux/slices/authSlice';

const links = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About', anchor: true },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const count = useSelector((state) => state.cart.cartItems.reduce((sum, item) => sum + item.qty, 0));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-[0.18em] transition ${isActive ? 'text-god-gold' : 'text-god-muted hover:text-white'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-god-border/80 bg-god-bg/90 backdrop-blur">
      <div className="container-god flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/godwear-logo.png" alt="GOD WEAR logo" className="h-12 w-12 rounded-xl border border-god-gold/50 object-cover shadow-gold" />
          <span className="font-heading text-4xl tracking-wide text-god-gold">GOD WEAR</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            link.anchor
              ? <Link key={link.to} to={link.to} className="text-sm font-bold uppercase tracking-[0.18em] text-god-muted transition hover:text-white">{link.label}</Link>
              : <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>
          ))}
          {userInfo?.isAdmin && <NavLink to="/admin" className={navClass}>Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative grid h-11 w-11 place-items-center rounded-xl border border-god-border text-white transition hover:border-god-gold" aria-label="Cart">
            <FaShoppingBag />
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-god-gold px-1 text-xs font-bold text-god-bg">{count}</span>}
          </Link>
          {userInfo ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/profile" className="inline-flex h-11 items-center gap-2 rounded-xl border border-god-border px-3 text-sm font-bold text-white transition hover:border-god-gold hover:text-god-gold">
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} alt={userInfo.name} className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <FaUserCircle className="text-lg" />
                )}
                <span className="max-w-24 truncate">{userInfo.name || 'Profile'}</span>
              </Link>
              <button onClick={handleLogout} className="grid h-11 w-11 place-items-center rounded-xl border border-god-border text-white transition hover:border-red-400 hover:text-red-300" aria-label="Logout">
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden rounded-xl bg-white px-4 py-2 text-sm font-bold text-god-bg sm:inline-flex">Login</Link>
          )}
          <button className="grid h-11 w-11 place-items-center rounded-xl border border-god-border md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-god grid gap-3 pb-5 md:hidden">
          {links.map((link) => (
            link.anchor
              ? <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-sm font-bold uppercase tracking-[0.18em] text-god-muted transition hover:text-white">{link.label}</Link>
              : <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={navClass}>{link.label}</NavLink>
          ))}
          {userInfo && <NavLink to="/profile" onClick={() => setOpen(false)} className={navClass}>Profile</NavLink>}
          {userInfo?.isAdmin && <NavLink to="/admin" onClick={() => setOpen(false)} className={navClass}>Admin</NavLink>}
          {userInfo ? (
            <button onClick={() => { setOpen(false); handleLogout(); }} className="btn-outline">Logout</button>
          ) : (
            <Link to="/login" className="btn-gold">Login</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
