import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { getImageUrl } from '../utils/api';

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#000' : 'none'} stroke="#000" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const FavoritesPage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites, toggleFavorite, isFavorited } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isMobile] = useState(window.innerWidth < 768);

  const handleAddToCart = (item: typeof favorites[0], e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: item.productId,
      modelName: item.modelName,
      colorName: item.colorName,
      colorImage: item.imageUrl,
      seriesCount: 1,
      pricePerSeries: item.pricePerSeries * 5,
      totalPrice: item.pricePerSeries * 5,
    });
    navigate('/cart');
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '60vh' }}>
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '0.2em' }}>{t('favorites.title')}</h1>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '32px 16px' : '48px 24px' }}>
        {favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px', letterSpacing: '0.05em' }}>{t('favorites.empty')}</p>
            <Link to="/" style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#000', textDecoration: 'underline' }}>
              {t('cart.startShopping')}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '24px' : '32px' }}>
            {favorites.map(item => (
              <div key={item.productId} style={{ position: 'relative' }}>
                <Link to={`/product/${item.productId}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#ffffff', overflow: 'hidden', marginBottom: '12px' }}>
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.modelName}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFavorite(item); }}
                      style={{ position: 'absolute', top: '0', right: '0', background: 'transparent', border: 'none', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                    >
                      <HeartIcon filled={isFavorited(item.productId)} />
                    </button>
                  </div>
                  <p style={{ fontSize: '13px', letterSpacing: '0.06em', color: '#000', marginBottom: '4px', textAlign: 'center' }}>DIFFIN — {item.modelName}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', textAlign: 'center' }}>{item.pricePerSeries.toLocaleString('tr-TR')} ₺ / adet</p>
                </Link>
                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '11px', letterSpacing: '0.12em', cursor: 'pointer' }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {t('productDetail.addToCart')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
