import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
