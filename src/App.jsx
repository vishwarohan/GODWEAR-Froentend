import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Dashboard from './pages/admin/Dashboard';
import ManageCategories from './pages/admin/ManageCategories';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import NotFound from './pages/NotFound';

const Protected = ({ children, admin = false }) => <PrivateRoute admin={admin}>{children}</PrivateRoute>;

const App = () => (
  <div className="min-h-screen bg-god-bg text-white">
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Protected><Cart /></Protected>} />
        <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
        <Route path="/order-success" element={<Protected><OrderSuccess /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="/orders" element={<Protected><OrderHistory /></Protected>} />
        <Route path="/admin" element={<Protected admin><Dashboard /></Protected>} />
        <Route path="/admin/categories" element={<Protected admin><ManageCategories /></Protected>} />
        <Route path="/admin/products" element={<Protected admin><ManageProducts /></Protected>} />
        <Route path="/admin/orders" element={<Protected admin><ManageOrders /></Protected>} />
        <Route path="/admin/users" element={<Protected admin><ManageUsers /></Protected>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

export default App;
