import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Giriş denemesi:', credentials);
      const response = await api.post('/auth/login', credentials);
      console.log('Giriş başarılı:', response.data);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Giriş hatası:', error);
      console.error('Hata detayı:', error.response?.data);
      setError(error.response?.data?.message || 'Giriş başarısız. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '300',
            letterSpacing: '0.3em',
            marginBottom: '12px',
            color: '#000000'
          }}>
            DIFFIN
          </h1>
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {error && (
            <div style={{
              border: '1px solid #fca5a5',
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              padding: '12px 16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              color: '#6b7280',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Kullanıcı Adı
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                padding: '14px 16px',
                outline: 'none',
                fontSize: '14px',
                transition: 'border-color 0.3s'
              }}
              placeholder="diffin_admin"
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              color: '#6b7280',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Şifre
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                padding: '14px 16px',
                outline: 'none',
                fontSize: '14px',
                transition: 'border-color 0.3s'
              }}
              placeholder="••••••••"
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9ca3af' : '#000000',
              color: '#ffffff',
              padding: '14px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              letterSpacing: '0.1em',
              transition: 'opacity 0.3s',
              marginTop: '8px'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.opacity = '0.8')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.opacity = '1')}
          >
            {loading ? 'GİRİŞ YAPILIYOR...' : 'GİRİŞ YAP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
