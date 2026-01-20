import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext';
import api from '../utils/api';

const AccountPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, isLoggedIn, login, logout } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Giriş yap
        const response = await api.post('/user-auth/login', {
          email: formData.email,
          password: formData.password,
        });
        login(response.data.token, response.data.user);
      } else {
        // Kayıt ol
        const response = await api.post('/user-auth/register', formData);
        login(response.data.token, response.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t('account.errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn && user) {
    return (
      <div style={{ minHeight: '80vh', padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '40px', color: '#000000' }}>
            {t('account.title')}
          </h1>

          <div style={{ backgroundColor: '#f9fafb', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '24px', color: '#000000' }}>
              {t('account.myInfo')}
            </h2>
            <div style={{ display: 'grid', gap: '16px', color: '#4b5563' }}>
              <p><strong>{t('account.fullName')}:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>{t('account.email')}:</strong> {user.email}</p>
              <p><strong>{t('account.phone')}:</strong> {user.phone}</p>
              {user.address && <p><strong>{t('account.address')}:</strong> {user.address}</p>}
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '12px 32px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              letterSpacing: '0.1em',
              transition: 'opacity 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            {t('account.logout')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', padding: '80px 24px', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '40px', textAlign: 'center', color: '#000000' }}>
          {isLogin ? t('account.login') : t('account.register')}
        </h1>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px', marginBottom: '24px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder={t('account.firstName')}
                value={formData.firstName}
                onChange={handleInputChange}
                required
                style={{
                  padding: '14px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <input
                type="text"
                name="lastName"
                placeholder={t('account.lastName')}
                value={formData.lastName}
                onChange={handleInputChange}
                required
                style={{
                  padding: '14px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <input
                type="tel"
                name="phone"
                placeholder={t('account.phone')}
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{
                  padding: '14px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <textarea
                name="address"
                placeholder={t('account.addressOptional')}
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                style={{
                  padding: '14px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder={t('account.email')}
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              padding: '14px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
            }}
          />

          <input
            type="password"
            name="password"
            placeholder={t('account.password')}
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{
              padding: '14px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '14px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              letterSpacing: '0.1em',
              opacity: loading ? '0.5' : '1',
              transition: 'opacity 0.3s',
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.opacity = '0.8')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.opacity = '1')}
          >
            {loading ? t('account.processing') : (isLogin ? t('account.login') : t('account.register'))}
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', color: '#6b7280' }}>
          {isLogin ? t('account.noAccount') : t('account.haveAccount')}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#000000',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {isLogin ? t('account.register') : t('account.login')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
