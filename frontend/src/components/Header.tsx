import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={{
      backgroundColor: '#000000',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '12px 16px' : '16px 24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          {/* Logo - Sol */}
          <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px'}}>
            <Link
              to="/"
              style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: '300',
                letterSpacing: isMobile ? '0.2em' : '0.3em',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'opacity 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              DIFFIN
            </Link>
            <span style={{
              fontSize: isMobile ? '9px' : '12px',
              fontWeight: '300',
              letterSpacing: isMobile ? '0.1em' : '0.15em',
              color: '#b0b0b0'
            }}>
              {t('header.subtitle')}
            </span>
          </div>

          {/* Dil, Sepet ve Hesabım - Sağ */}
          <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px'}}>
            {/* Dil Seçici */}
            <div style={{display: 'flex', gap: isMobile ? '4px' : '8px', alignItems: 'center'}}>
              {['tr', 'en', 'hu'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  style={{
                    background: i18n.language === lang ? '#ffffff' : 'transparent',
                    color: i18n.language === lang ? '#000000' : '#b0b0b0',
                    border: '1px solid ' + (i18n.language === lang ? '#ffffff' : '#4b5563'),
                    padding: isMobile ? '4px 6px' : '6px 12px',
                    fontSize: isMobile ? '10px' : '12px',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    borderRadius: '2px'
                  }}
                  onMouseOver={(e) => {
                    if (i18n.language !== lang) {
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (i18n.language !== lang) {
                      e.currentTarget.style.borderColor = '#4b5563';
                      e.currentTarget.style.color = '#b0b0b0';
                    }
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sepet */}
            <Link
              to="/cart"
              style={{position: 'relative'}}
            >
              <svg
                width={isMobile ? "24" : "28"}
                height={isMobile ? "24" : "28"}
                fill="#ffffff"
                viewBox="0 0 24 24"
                style={{transition: 'opacity 0.3s'}}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Hesabım */}
            <Link
              to="/account"
              style={{position: 'relative'}}
            >
              <svg
                width={isMobile ? "24" : "28"}
                height={isMobile ? "24" : "28"}
                fill="#ffffff"
                viewBox="0 0 24 24"
                style={{transition: 'opacity 0.3s'}}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
