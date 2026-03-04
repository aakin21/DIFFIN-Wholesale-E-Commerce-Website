import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const WhatsAppButton: React.FC = () => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  if (pathname.startsWith('/admin')) return null;
  return (
    <a
      href="https://wa.me/905531349703"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: isMobile ? '90px' : '24px', right: '24px',
        width: '56px', height: '56px', backgroundColor: '#25D366',
        borderRadius: '50%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 1000,
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)', textDecoration: 'none',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.37 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.31C14.22 13.43 13.9 13.88 13.73 14.05C13.56 14.23 13.4 14.26 13.15 14.14C12.9 14.03 12.06 13.76 11.07 12.88C10.29 12.19 9.77 11.35 9.61 11.1C9.46 10.86 9.6 10.73 9.71 10.61C9.81 10.5 9.96 10.32 10.07 10.15C10.18 9.99 10.22 9.87 10.3 9.7C10.38 9.53 10.35 9.37 10.28 9.26C10.21 9.15 9.7 7.93 9.5 7.43C9.3 6.95 9.09 7.01 8.93 7H8.53Z"/>
      </svg>
    </a>
  );
};
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import CreateBrandPage from './pages/CreateBrandPage';
import CustomProductPage from './pages/CustomProductPage';
import WhoWeArePage from './pages/WhoWeArePage';
import FavoritesPage from './pages/FavoritesPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';

function App() {
  return (
    <UserProvider>
      <FavoritesProvider>
      <CartProvider>
        <Router>
        <WhatsAppButton />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <HomePage />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/products/:categoryId"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <ProductsPage />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <ProductDetailPage />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <CartPage />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/account"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <AccountPage />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/create-brand"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <CreateBrandPage />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/custom-product"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <CustomProductPage />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <WhoWeArePage />
                  <Footer />
                </div>
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '64px' }}>
                  <FavoritesPage />
                  <Footer />
                </div>
              </>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
        </Router>
      </CartProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}

export default App;
