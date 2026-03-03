import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* HAKKIMIZDA */}
      <div style={{ padding: isMobile ? '40px 16px' : '80px 24px', borderBottom: '1px solid #2d2d2d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: isMobile ? 'block' : 'flex', gap: isMobile ? '0' : '64px', alignItems: 'center', position: 'relative' }}>
            {/* Sol */}
            <div style={{ flex: 1, paddingRight: isMobile ? '0' : '32px', marginBottom: isMobile ? '32px' : '0' }}>
              <h2 style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '24px', color: '#ffffff' }}>
                {t('home.about.title')}
              </h2>
              <p style={{ lineHeight: '1.6', color: '#b0b0b0', fontSize: isMobile ? '14px' : '16px' }}>
                {t('home.about.description')}
              </p>
            </div>

            {/* Ortada çizgi */}
            {!isMobile && (
              <div style={{
                position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
                background: 'linear-gradient(to bottom, transparent, #ffffff 20%, #ffffff 80%, transparent)',
                transform: 'translateX(-50%)'
              }} />
            )}

            {/* Sağ */}
            <div style={{ flex: 1, paddingLeft: isMobile ? '0' : '32px' }}>
              {[1, 2, 3, 4].map((n, i) => (
                <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: i < 3 ? '20px' : '0' }}>
                  <span style={{ color: '#ffffff', marginTop: '4px' }}>—</span>
                  <p style={{ color: '#b0b0b0', margin: 0, fontSize: isMobile ? '14px' : '16px' }}>
                    {t(`home.about.feature${n}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* İLETİŞİM */}
      <div style={{ padding: isMobile ? '32px 16px' : '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: '300', color: '#ffffff' }}>
            {t('home.contact.title')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: isMobile ? '13px' : '14px', alignItems: 'center' }}>
            <p style={{ margin: 0 }}>
              <a href="mailto:info@diffin.com" style={{ color: '#b0b0b0', textDecoration: 'none' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                {t('home.contact.email')}
              </a>
            </p>
            <p style={{ margin: 0 }}>
              <a href="tel:+905531349703" style={{ color: '#b0b0b0', textDecoration: 'none' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                {t('home.contact.phone1')}
              </a>
            </p>
            <p style={{ margin: 0 }}>
              <a href="tel:+36202204577" style={{ color: '#b0b0b0', textDecoration: 'none' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                {t('home.contact.phone2')}
              </a>
            </p>
            <p style={{ margin: 0 }}>
              <a href="tel:+905313695893" style={{ color: '#b0b0b0', textDecoration: 'none' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                {t('home.contact.phone3')}
              </a>
            </p>
            <p style={{ fontSize: isMobile ? '11px' : '12px', color: '#b0b0b0', margin: 0 }}>
              {t('home.contact.workingHours')}
            </p>
          </div>
          <div style={{ borderTop: '1px solid #2d2d2d', marginTop: '32px', paddingTop: '24px' }}>
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
