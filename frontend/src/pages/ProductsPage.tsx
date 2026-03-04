import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api, { getImageUrl } from '../utils/api';
import { Product, Category } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { toggleFavorite, isFavorited } = useFavorites();

  const useMemo_randomColors = useMemo(() => {
    const map: Record<string, { imageUrl: string; colorName: string } | undefined> = {};
    products.forEach(product => {
      if (product.colors.length === 0) return;
      const idx = Math.floor(Math.random() * product.colors.length);
      map[product._id] = { imageUrl: product.colors[idx].imageUrl, colorName: product.colors[idx].colorName };
    });
    return map;
  }, [products]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoryRes] = await Promise.all([
          api.get(`/products/category/${categoryId}`),
          api.get(`/categories`),
        ]);
        setProducts(productsRes.data);
        const found = categoryRes.data.find((cat: Category) => cat._id === categoryId);
        setCategory(found);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '32px', height: '32px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '60vh' }}>
      {/* Üst bar */}
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: isMobile ? '12px 16px' : '12px 40px' }}>
        <Link
          to="/"
          style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.5'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← {t('products.backToHome')}
        </Link>
      </div>

      {/* Kategori başlığı */}
      <div style={{ padding: isMobile ? '24px 16px 16px' : '40px 40px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '300', letterSpacing: '0.2em', color: '#000' }}>
          {category?.name.toUpperCase() || t('products.title')}
        </h1>
      </div>

      {/* Ürünler */}
      <div style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px' }}>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '80px 0', fontSize: '14px' }}>{t('products.noProducts')}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '24px 16px' : '40px 32px' }}>
            {products.map((product) => {
              const randomColor = useMemo_randomColors[product._id];
              const img = randomColor?.imageUrl || '';
              const favoritePayload = {
                productId: product._id,
                modelName: product.modelName,
                imageUrl: img,
                pricePerSeries: product.pricePerSeries,
                colorName: randomColor?.colorName || '',
              };
              return (
                <div key={product._id} style={{ textAlign: 'center' }}>
                  <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', display: 'block' }}>
                    {/* Görsel */}
                    <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#ffffff', overflow: 'hidden', marginBottom: '10px' }}>
                      {img ? (
                        <img
                          src={getImageUrl(img)}
                          alt={product.modelName}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s' }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '48px', color: '#e5e7eb', fontWeight: '300' }}>{product.modelName.charAt(0)}</span>
                        </div>
                      )}
                      {/* Favori butonu */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleFavorite(favoritePayload); }}
                        style={{ position: 'absolute', top: '0', right: '12px', background: 'transparent', border: 'none', padding: '10px', cursor: 'pointer', lineHeight: 0 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={isFavorited(product._id) ? '#000' : 'none'} stroke="#000" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                    {/* Model adı ve fiyat */}
                    <p style={{ fontSize: isMobile ? '12px' : '13px', letterSpacing: '0.06em', color: '#000', marginBottom: '4px', textAlign: 'center' }}>
                      DIFFIN — {product.modelName}
                    </p>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: '#6b7280', textAlign: 'center' }}>
                      {product.pricePerSeries.toLocaleString('tr-TR')} ₺ / adet
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
