import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';
import { Category } from '../types';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data)).catch(() => {});
  }, []);

  return (
    <footer style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Beyazdan Siyaha Gradient */}
      <div style={{ height: '150px', background: 'linear-gradient(to bottom, #ffffff, #000000)' }} />

      {/* Ana İçerik: Sol = Kategoriler, Sağ = Hakkımızda + Özellikler */}
      <div style={{ padding: isMobile ? '40px 16px' : '80px 24px', borderBottom: '1px solid #2d2d2d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: isMobile ? 'block' : 'flex', gap: '64px', position: 'relative' }}>

            {/* Sol: Kategoriler */}
            <div style={{ flex: 1, marginBottom: isMobile ? '48px' : '0' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '400', letterSpacing: '0.3em', color: '#ffffff', marginBottom: '24px' }}>
                {t('footer.categories')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {categories.map(cat => (
                  <Link
                    key={cat._id}
                    to={`/products/${cat._id}`}
                    style={{ color: '#b0b0b0', textDecoration: 'none', fontSize: isMobile ? '14px' : '15px', letterSpacing: '0.04em' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dikey Çizgi */}
            {!isMobile && (
              <div style={{
                position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px',
                background: 'linear-gradient(to bottom, transparent, #3d3d3d 20%, #3d3d3d 80%, transparent)',
                transform: 'translateX(-50%)'
              }} />
            )}

            {/* Sağ: Hakkımızda + Özellikler */}
            <div style={{ flex: 1, paddingLeft: isMobile ? '0' : '32px' }}>
              <Link
                to="/about"
                style={{
                  fontSize: '11px', fontWeight: '400', letterSpacing: '0.3em',
                  color: '#ffffff', textDecoration: 'none',
                  display: 'inline-block', marginBottom: '28px',
                  borderBottom: '1px solid #ffffff', paddingBottom: '6px'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('header.aboutUs')}
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: '#4d4d4d', marginTop: '3px', flexShrink: 0 }}>—</span>
                    <p style={{ color: '#b0b0b0', margin: 0, fontSize: isMobile ? '13px' : '14px', lineHeight: '1.5' }}>
                      {t(`home.about.feature${n}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* İletişim */}
      <div style={{ padding: isMobile ? '32px 16px' : '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: isMobile ? '12px' : '13px', letterSpacing: '0.2em', marginBottom: '24px', fontWeight: '300', color: '#ffffff' }}>
            {t('home.contact.title')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: isMobile ? '13px' : '14px', alignItems: 'center' }}>
            <a href="mailto:info@diffin.com" style={{ color: '#b0b0b0', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
              {t('home.contact.email')}
            </a>
            <a href="tel:+905531349703" style={{ color: '#b0b0b0', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
              {t('home.contact.phone1')}
            </a>
            <a href="tel:+36202204577" style={{ color: '#b0b0b0', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
              {t('home.contact.phone2')}
            </a>
            <a href="tel:+905313695893" style={{ color: '#b0b0b0', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
              {t('home.contact.phone3')}
            </a>
            <p style={{ fontSize: isMobile ? '11px' : '12px', color: '#6b7280', margin: 0 }}>
              {t('home.contact.workingHours')}
            </p>
          </div>
          <div style={{ borderTop: '1px solid #2d2d2d', marginTop: '32px', paddingTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <p style={{ fontSize: isMobile ? '11px' : '12px', color: '#6b7280', margin: 0 }}>
              &copy; {new Date().getFullYear()} DIFFIN. {t('home.contact.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
