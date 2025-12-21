import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';

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

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/products/:categoryId"
            element={
              <>
                <Header />
                <ProductsPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <>
                <Header />
                <ProductDetailPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <CartPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/account"
            element={
              <>
                <Header />
                <AccountPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/create-brand"
            element={
              <>
                <Header />
                <CreateBrandPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/custom-product"
            element={
              <>
                <Header />
                <CustomProductPage />
                <Footer />
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
    </UserProvider>
  );
}

export default App;
