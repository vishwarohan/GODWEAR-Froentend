import { Link } from 'react-router-dom';

const AdminShell = ({ title, children }) => (
  <section className="container-god py-10">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-heading text-6xl">{title}</h1>
      <nav className="flex flex-wrap gap-2">
        <Link className="btn-outline" to="/admin">Dashboard</Link>
        <Link className="btn-outline" to="/admin/categories">Categories</Link>
        <Link className="btn-outline" to="/admin/products">Products</Link>
        <Link className="btn-outline" to="/admin/orders">Orders</Link>
        <Link className="btn-outline" to="/admin/users">Users</Link>
      </nav>
    </div>
    {children}
  </section>
);

export default AdminShell;
