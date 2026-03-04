import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api, { getImageUrl } from '../utils/api';
import { Product, ColorVariant } from '../types';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [seriesCount, setSeriesCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        if (response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || !selectedColor) return;
    addToCart({
      productId: product._id,
      modelName: product.modelName,
      colorName: selectedColor.colorName,
      colorImage: selectedColor.imageUrl,
      seriesCount,
      pricePerSeries: product.pricePerSeries * 5,
      totalPrice: product.pricePerSeries * 5 * seriesCount,
    });
    navigate('/cart');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: '#9ca3af', fontSize: '18px' }}>{t('productDetail.notFound')}</p>
      </div>
    );
  }

  const mainImgSrc = selectedColor?.imageUrl ? getImageUrl(selectedColor.imageUrl) : null;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '60vh' }}>

      {/* Üst: Ana Sayfa butonu */}
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: isMobile ? '12px 16px' : '12px 40px' }}>
        <Link
          to="/"
          style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.5'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          {t('productDetail.backToHome')}
        </Link>
      </div>

      {/* İçerik */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '60% 40%',
        maxWidth: '1300px',
        margin: '0 auto',
        overflowX: 'hidden',
      }}>

        {/* SOL: Görseller */}
        {isMobile ? (
          /* Mobil: yatay scroll thumbnail + seçilen büyük */
          <div style={{ padding: '0' }}>
            {/* Ana görsel */}
            <div
              style={{ aspectRatio: '3/4', maxHeight: '60vh', backgroundColor: '#f5f5f5', overflow: 'hidden', cursor: mainImgSrc ? 'zoom-in' : 'default' }}
              onClick={() => mainImgSrc && setLightbox(mainImgSrc)}
            >
              {mainImgSrc ? (
                <img src={mainImgSrc} alt={selectedColor?.colorName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '80px', color: '#e5e7eb', fontWeight: '300' }}>{product.modelName.charAt(0)}</span>
                </div>
              )}
            </div>
            {/* Thumbnail şeridi */}
            {product.colors.length > 1 && (
              <div className="no-scrollbar" style={{ display: 'flex', gap: '4px', padding: '8px 4px', overflowX: 'auto', backgroundColor: '#fafafa', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      flexShrink: 0, width: '72px', height: '72px', padding: 0, cursor: 'pointer',
                      backgroundColor: '#f0f0f0', overflow: 'hidden', border: 'none',
                      outline: selectedColor?.colorName === color.colorName ? '2px solid #000' : '2px solid transparent',
                      outlineOffset: '-2px',
                    }}
                  >
                    {color.imageUrl
                      ? <img src={getImageUrl(color.imageUrl)} alt={color.colorName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      : <span style={{ fontSize: '20px', color: '#9ca3af' }}>{color.colorName.charAt(0)}</span>
                    }
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Desktop: sol ince thumbnail sütunu + sağda büyük görsel */
          <div style={{ display: 'flex', gap: '0' }}>
            {/* Thumbnail sütunu */}
            <div className="no-scrollbar" style={{ width: '90px', flexShrink: 0, borderRight: '1px solid #e5e7eb', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '80vh', position: 'sticky', top: '64px', alignSelf: 'flex-start' }}>
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '74px', height: '74px', padding: 0, cursor: 'pointer', flexShrink: 0,
                    backgroundColor: '#f0f0f0', overflow: 'hidden', border: 'none',
                    outline: selectedColor?.colorName === color.colorName ? '2px solid #000' : '2px solid transparent',
                    outlineOffset: '-2px', transition: 'opacity 0.2s',
                  }}
                  onMouseOver={(e) => { if (selectedColor?.colorName !== color.colorName) e.currentTarget.style.opacity = '0.7'; }}
                  onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  {color.imageUrl
                    ? <img src={getImageUrl(color.imageUrl)} alt={color.colorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: '20px', color: '#9ca3af' }}>{color.colorName.charAt(0)}</span>
                  }
                </button>
              ))}
            </div>

            {/* Büyük ana görsel */}
            <div
              style={{ flex: 1, aspectRatio: '3/4', backgroundColor: '#f5f5f5', overflow: 'hidden', cursor: mainImgSrc ? 'zoom-in' : 'default' }}
              onClick={() => mainImgSrc && setLightbox(mainImgSrc)}
            >
              {mainImgSrc ? (
                <img src={mainImgSrc} alt={selectedColor?.colorName} style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.2s' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '120px', color: '#e5e7eb', fontWeight: '300' }}>{product.modelName.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SAĞ: Ürün bilgisi */}
        <div style={{ padding: isMobile ? '24px 16px' : '48px 40px', borderLeft: isMobile ? 'none' : '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '28px', overflowX: 'hidden', minWidth: 0 }}>

          {/* Model adı */}
          <div>
            <h1 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '400', letterSpacing: '0.08em', color: '#000000', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
              {product.modelName}
            </h1>
            {selectedColor && (
              <p style={{ fontSize: '13px', color: '#9ca3af', letterSpacing: '0.05em', margin: 0 }}>
                {selectedColor.colorName}
              </p>
            )}
          </div>

          {/* Stokta Var */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#22c55e', fontWeight: '500' }}>{t('productDetail.inStock')}</span>
          </div>

          {/* Fiyat */}
          <div style={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: '400', color: '#000000' }}>
                {product.pricePerSeries.toLocaleString('tr-TR')} ₺
              </span>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>{t('productDetail.perPiece')}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '6px 0 0 0' }}>
              {t('productDetail.seriesPrice')} <strong style={{ color: '#000' }}>{(product.pricePerSeries * 5).toLocaleString('tr-TR')} ₺</strong>
            </p>
          </div>

          {/* Seri bilgisi */}
          <div style={{ backgroundColor: '#fafafa', padding: '14px 16px', fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
            <p style={{ margin: '0 0 10px 0' }}>{t('productDetail.seriesDescription')}</p>
            <p style={{ margin: 0, lineHeight: '1.7' }}>{t('productDetail.wholesaleNote')}</p>
          </div>

          {/* Seri sayısı */}
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: '12px', textTransform: 'uppercase' }}>{t('productDetail.seriesCount')}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <button
                onClick={() => setSeriesCount(Math.max(1, seriesCount - 1))}
                style={{ width: '44px', height: '44px', backgroundColor: '#ffffff', border: '1px solid #000000', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '300' }}
              >−</button>
              <span style={{ width: '60px', height: '44px', border: '1px solid #e5e7eb', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '400' }}>
                {seriesCount}
              </span>
              <button
                onClick={() => setSeriesCount(seriesCount + 1)}
                style={{ width: '44px', height: '44px', backgroundColor: '#ffffff', border: '1px solid #000000', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '300' }}
              >+</button>
            </div>
            {seriesCount > 1 && (
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                {t('productDetail.totalLabel')} <strong style={{ color: '#000' }}>{(product.pricePerSeries * 5 * seriesCount).toLocaleString('tr-TR')} ₺</strong>
              </p>
            )}
          </div>

          {/* Sepete ekle */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedColor}
            style={{
              width: '100%', padding: '16px', backgroundColor: '#000000', color: '#ffffff',
              border: 'none', fontSize: '13px', letterSpacing: '0.15em', fontWeight: '500',
              cursor: selectedColor ? 'pointer' : 'not-allowed', textTransform: 'uppercase',
              transition: 'background-color 0.2s', opacity: selectedColor ? 1 : 0.4,
            }}
            onMouseOver={(e) => { if (selectedColor) e.currentTarget.style.backgroundColor = '#333333'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000000'; }}
          >
            {t('productDetail.addToCart')}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: '#ffffff', fontSize: '32px', cursor: 'pointer', lineHeight: 1 }}
          >×</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
