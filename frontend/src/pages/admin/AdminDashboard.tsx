import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '300',
            letterSpacing: '0.3em'
          }}>
            DIFFIN
          </h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ffffff',
              color: '#ffffff',
              padding: '10px 24px',
              cursor: 'pointer',
              fontSize: '12px',
              letterSpacing: '0.1em',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            ÇIKIŞ YAP
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '300',
          letterSpacing: '0.15em',
          marginBottom: '80px',
          textAlign: 'center',
          color: '#000000'
        }}>
          YÖNETİM PANELİ
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto 80px'
        }}>
          {/* Siparişler */}
          <Link
            to="/admin/orders"
            style={{
              backgroundColor: '#f9fafb',
              padding: '48px 32px',
              textAlign: 'center',
              textDecoration: 'none',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              const h3 = e.currentTarget.querySelector('h3') as HTMLElement;
              const p = e.currentTarget.querySelector('p') as HTMLElement;
              if (h3) h3.style.color = '#ffffff';
              if (p) p.style.color = '#d1d5db';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              const h3 = e.currentTarget.querySelector('h3') as HTMLElement;
              const p = e.currentTarget.querySelector('p') as HTMLElement;
              if (h3) h3.style.color = '#000000';
              if (p) p.style.color = '#6b7280';
            }}
          >
            <h3 style={{
              fontSize: '24px',
              fontWeight: '400',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              color: '#000000',
              transition: 'color 0.3s'
            }}>
              SİPARİŞLER
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
              transition: 'color 0.3s'
            }}>
              Gelen siparişleri görüntüleyin ve yönetin
            </p>
          </Link>

          {/* Ürün Yönetimi */}
          <Link
            to="/admin/products"
            style={{
              backgroundColor: '#f9fafb',
              padding: '48px 32px',
              textAlign: 'center',
              textDecoration: 'none',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              const h3 = e.currentTarget.querySelector('h3') as HTMLElement;
              const p = e.currentTarget.querySelector('p') as HTMLElement;
              if (h3) h3.style.color = '#ffffff';
              if (p) p.style.color = '#d1d5db';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              const h3 = e.currentTarget.querySelector('h3') as HTMLElement;
              const p = e.currentTarget.querySelector('p') as HTMLElement;
              if (h3) h3.style.color = '#000000';
              if (p) p.style.color = '#6b7280';
            }}
          >
            <h3 style={{
              fontSize: '24px',
              fontWeight: '400',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              color: '#000000',
              transition: 'color 0.3s'
            }}>
              ÜRÜN YÖNETİMİ
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
              transition: 'color 0.3s'
            }}>
              Ürünleri ekleyin, düzenleyin veya silin
            </p>
          </Link>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#e5e7eb',
          margin: '0 0 80px'
        }}></div>

        {/* Hızlı İşlemler */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '400',
            letterSpacing: '0.1em',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#000000'
          }}>
            HIZLI İŞLEMLER
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <Link
              to="/"
              style={{
                backgroundColor: '#f3f4f6',
                padding: '32px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#000000',
                fontSize: '14px',
                letterSpacing: '0.05em',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
              ANA SAYFA
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
