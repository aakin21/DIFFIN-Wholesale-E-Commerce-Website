import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WhoWeArePage: React.FC = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Placeholder images - admin panelden değiştirilebilecek
  const facilities = [
    { key: 'production', placeholder: true },
    { key: 'showroom', placeholder: true },
    { key: 'productDetails', placeholder: true },
    { key: 'office', placeholder: true },
    { key: 'packaging', placeholder: true },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <div style={{
        padding: isMobile ? '80px 16px 60px' : '120px 24px 80px',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: '300',
          letterSpacing: '0.15em',
          marginBottom: '48px',
          color: '#000000'
        }}>
          {t('home.whoWeAre.title')}
        </h1>

        {/* Description paragraphs */}
        <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            lineHeight: '1.9',
            color: '#374151',
            marginBottom: '24px'
          }}>
            {t('home.whoWeAre.description')}
          </p>
          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            lineHeight: '1.9',
            color: '#374151',
            marginBottom: '24px'
          }}>
            {t('home.whoWeAre.description2')}
          </p>
          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            lineHeight: '1.9',
            color: '#374151',
            marginBottom: '24px'
          }}>
            {t('home.whoWeAre.description3')}
          </p>
          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            lineHeight: '1.9',
            color: '#374151',
            fontWeight: '500'
          }}>
            {t('home.whoWeAre.description4')}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: '80px',
        height: '1px',
        backgroundColor: '#000000',
        margin: '0 auto 80px'
      }}></div>

      {/* Facilities Section */}
      <div style={{ padding: isMobile ? '0 16px 80px' : '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: '300',
          letterSpacing: '0.1em',
          marginBottom: '48px',
          textAlign: 'center',
          color: '#000000'
        }}>
          {t('home.whoWeAre.facilitiesTitle')}
        </h2>

        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '16px' : '24px'
        }}>
          {facilities.map((facility, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              {/* Placeholder Box */}
              <div style={{
                aspectRatio: '1/1',
                backgroundColor: '#f3f4f6',
                border: '2px dashed #d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                    style={{ marginBottom: '8px' }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    margin: 0
                  }}>
                    Image Placeholder
                  </p>
                </div>
              </div>
              {/* Caption */}
              <p style={{
                fontSize: isMobile ? '12px' : '14px',
                color: '#374151',
                fontWeight: '500',
                letterSpacing: '0.05em'
              }}>
                {t(`home.whoWeAre.${facility.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#e5e7eb',
        margin: '0 0 80px'
      }}></div>

      {/* Office Location */}
      <div style={{
        padding: isMobile ? '0 16px 120px' : '0 24px 120px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: isMobile ? '18px' : '24px',
          fontWeight: '300',
          letterSpacing: '0.1em',
          marginBottom: '16px',
          color: '#000000'
        }}>
          {t('home.whoWeAre.location')}
        </h3>
        <p style={{
          fontSize: isMobile ? '20px' : '28px',
          fontWeight: '300',
          color: '#000000',
          marginBottom: '12px'
        }}>
          {t('home.whoWeAre.locationCity')}
        </p>
        <p style={{
          fontSize: isMobile ? '13px' : '14px',
          color: '#6b7280'
        }}>
          {t('home.whoWeAre.locationNote')}
        </p>
      </div>
    </div>
  );
};

export default WhoWeArePage;
