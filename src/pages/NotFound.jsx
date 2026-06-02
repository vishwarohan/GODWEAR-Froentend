import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="container-god grid min-h-[60vh] place-items-center py-16 text-center">
    <div>
      <h1 className="font-heading text-8xl text-god-gold">404</h1>
      <p className="mt-3 text-god-muted">This page does not exist.</p>
      <Link to="/" className="btn-gold mt-6">Back Home</Link>
    </div>
  </section>
);

export default NotFound;
