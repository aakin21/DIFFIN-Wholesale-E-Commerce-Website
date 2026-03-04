import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import api, { getImageUrl } from '../utils/api';
import { OrderFormData } from '../types';

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, getTotalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) { alert(t('cart.emptyAlert')); return; }
    setLoading(true);
    try {
      await api.post('/orders', {
        ...formData,
        items: cart.map(item => ({
          productId: item.productId,
          modelName: item.modelName,
          colorName: item.colorName,
          seriesCount: item.seriesCount,
          pricePerSeries: item.pricePerSeries,
          totalPrice: item.totalPrice,
        })),
        totalAmount: getTotalAmount(),
      });
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert(t('cart.orderError'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', padding: '64px 32px' }}>
          <div style={{ width: '64px', height: '64px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '28px' }}>✓</div>
          <h2 style={{ fontSize: '24px', fontWeight: '300', letterSpacing: '0.15em', marginBottom: '16px' }}>{t('cart.orderReceived')}</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{t('cart.willContact')}</p>
          <p style={{ color: '#9ca3af', fontSize: '12px' }}>{t('cart.redirecting')}</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '32px', letterSpacing: '0.05em' }}>{t('cart.empty')}</p>
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#000', color: '#fff', padding: '14px 40px', border: 'none', fontSize: '12px', letterSpacing: '0.15em', cursor: 'pointer' }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          {t('cart.startShopping')}
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '60vh' }}>
      {/* Başlık */}
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '0.2em', color: '#000' }}>{t('cart.title')}</h1>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 380px', gap: '0', alignItems: 'start' }}>

          {/* Sol: Sepet ürünleri */}
          <div style={{ borderRight: isMobile ? 'none' : '1px solid #e5e7eb', borderBottom: isMobile ? '1px solid #e5e7eb' : 'none', paddingRight: isMobile ? '0' : '48px', paddingTop: '40px', paddingBottom: '40px' }}>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '20px', paddingBottom: '32px', marginBottom: '32px', borderBottom: index < cart.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                {/* Görsel */}
                <div style={{ width: '100px', height: '120px', backgroundColor: '#f5f5f5', flexShrink: 0, overflow: 'hidden' }}>
                  {item.colorImage ? (
                    <img src={getImageUrl(item.colorImage)} alt={item.colorName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '32px', color: '#e5e7eb' }}>{item.modelName.charAt(0)}</span>
                    </div>
                  )}
                </div>

                {/* Bilgi */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', letterSpacing: '0.08em', marginBottom: '6px', textTransform: 'uppercase' }}>{item.modelName}</h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{t('cart.color')}: {item.colorName}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{t('cart.seriesCount')}: {item.seriesCount}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{ background: 'none', border: 'none', fontSize: '11px', color: '#9ca3af', cursor: 'pointer', padding: 0, textAlign: 'left', letterSpacing: '0.05em', textDecoration: 'underline' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#000'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {t('cart.remove')}
                  </button>
                </div>

                {/* Fiyat */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '16px', fontWeight: '400', color: '#000' }}>{item.totalPrice.toLocaleString('tr-TR')} ₺</p>
                </div>
              </div>
            ))}

            {/* Toplam */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '2px solid #000' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.15em', fontWeight: '500' }}>{t('cart.total')}</span>
              <span style={{ fontSize: '20px', fontWeight: '400' }}>{getTotalAmount().toLocaleString('tr-TR')} ₺</span>
            </div>
          </div>

          {/* Sağ: Sipariş formu */}
          <div style={{ paddingLeft: isMobile ? '0' : '48px', paddingTop: '40px', paddingBottom: '40px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '0.15em', marginBottom: '32px' }}>{t('cart.orderInfo')}</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { name: 'firstName', label: t('cart.firstName'), type: 'text' },
                { name: 'lastName', label: t('cart.lastName'), type: 'text' },
                { name: 'email', label: t('cart.email'), type: 'email' },
                { name: 'phone', label: t('cart.phone'), type: 'tel' },
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {field.label} *
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '12px 0', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: 'transparent', boxSizing: 'border-box' }}
                    onFocus={(e) => e.currentTarget.style.borderBottomColor = '#000'}
                    onBlur={(e) => e.currentTarget.style.borderBottomColor = '#e5e7eb'}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {t('cart.address')} *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  style={{ width: '100%', padding: '12px 0', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: 'transparent', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = '#000'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = '#e5e7eb'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '16px', backgroundColor: loading ? '#6b7280' : '#000', color: '#fff', border: 'none', fontSize: '12px', letterSpacing: '0.2em', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '12px', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#333'; }}
                onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#000'; }}
              >
                {loading ? t('cart.processing') : t('cart.placeOrder')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
