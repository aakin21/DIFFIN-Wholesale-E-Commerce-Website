import React from 'react';
import { useTranslation } from 'react-i18next';

const CreateBrandPage: React.FC = () => {
  const { t } = useTranslation();
  const whatsappNumber = '+905531349703';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <div style={{ padding: '120px 24px 80px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          letterSpacing: '0.15em',
          marginBottom: '32px',
          color: '#000000'
        }}>
          {t('createBrand.title')}
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#4b5563',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {t('createBrand.subtitle')}
        </p>
      </div>

      {/* Divider */}
      <div style={{
        width: '80px',
        height: '1px',
        backgroundColor: '#000000',
        margin: '0 auto 80px'
      }}></div>

      {/* Features Grid */}
      <div style={{ padding: '0 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '48px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '400',
              marginBottom: '16px',
              color: '#000000',
              letterSpacing: '0.05em'
            }}>
              {t('createBrand.features.feature1')}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#6b7280' }}>
              {t('createBrand.features.feature1Desc')}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '400',
              marginBottom: '16px',
              color: '#000000',
              letterSpacing: '0.05em'
            }}>
              {t('createBrand.features.feature2')}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#6b7280' }}>
              {t('createBrand.features.feature2Desc')}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '400',
              marginBottom: '16px',
              color: '#000000',
              letterSpacing: '0.05em'
            }}>
              {t('createBrand.features.feature3')}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#6b7280' }}>
              {t('createBrand.features.feature3Desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#e5e7eb',
        margin: '0 0 80px'
      }}></div>

      {/* WhatsApp Contact */}
      <div style={{ padding: '0 24px 80px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '300',
          letterSpacing: '0.1em',
          marginBottom: '24px',
          color: '#000000'
        }}>
          {t('createBrand.contact.title')}
        </h2>
        <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
          {t('createBrand.contact.description')}
        </p>
        <button
          onClick={handleWhatsAppClick}
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '16px 48px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            letterSpacing: '0.1em',
            fontWeight: '400',
            transition: 'opacity 0.3s',
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          {t('createBrand.contact.whatsapp')}
        </button>
      </div>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#e5e7eb',
        margin: '0 0 80px'
      }}></div>

      {/* Minimum Order */}
      <div style={{ padding: '0 24px 120px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '400',
          letterSpacing: '0.1em',
          marginBottom: '12px',
          color: '#6b7280'
        }}>
          {t('createBrand.minOrder.title')}
        </h3>
        <p style={{ fontSize: '24px', fontWeight: '300', color: '#000000', letterSpacing: '0.05em' }}>
          {t('createBrand.minOrder.amount')}
        </p>
      </div>
    </div>
  );
};

export default CreateBrandPage;
