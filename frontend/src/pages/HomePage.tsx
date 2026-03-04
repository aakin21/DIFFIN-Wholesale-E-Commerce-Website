import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api, { getImageUrl } from '../utils/api';
import { Category, Product } from '../types';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products')
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Her kategori için random bir ürün ve renk seç (products yüklenince bir kez hesaplanır)
  const categoryRandomItems = useMemo(() => {
    const map: Record<string, { productId: string; modelName: string; imageUrl: string; pricePerSeries: number } | null> = {};
    categories.forEach(category => {
      const categoryProducts = products.filter(product => {
        const id = product.categoryId && typeof product.categoryId === 'object'
          ? (product.categoryId as Category)._id
          : product.categoryId as string;
        return id === category._id;
      });
      if (categoryProducts.length === 0) { map[category._id] = null; return; }
      const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      const imageUrl = randomProduct.colors[0]?.imageUrl || '';
      map[category._id] = {
        productId: randomProduct._id,
        modelName: randomProduct.modelName,
        imageUrl,
        pricePerSeries: randomProduct.pricePerSeries,
      };
    });
    return map;
  }, [products, categories]);

  return (
    <div className="min-h-screen">
      {/* Ürünler - Beyaz arka plan */}
      <section style={{ backgroundColor: '#ffffff' }}>

        {/* Başlık */}
        <div style={{ padding: isMobile ? '28px 16px 20px' : '52px 24px 36px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: isMobile ? '13px' : '15px',
            fontWeight: '300',
            letterSpacing: '0.35em',
            color: '#000000',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            {t('home.wholesaleProducts')}
          </h2>
        </div>

        {/* İnce ayırıcı çizgi */}
        <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0' }} />

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <div style={{
              width: '32px', height: '32px',
              border: '2px solid #000000', borderTopColor: 'transparent',
              borderRadius: '50%', animation: 'spin 1s linear infinite'
            }} />
          </div>
        ) : categories.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '80px 0' }}>{t('home.noCategories')}</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '1px',
            backgroundColor: '#e5e7eb',
            borderBottom: '1px solid #e5e7eb'
          }}>
            {categories.map((category) => {
              const randomItem = categoryRandomItems[category._id];
              return (
                <div key={category._id} style={{ backgroundColor: '#ffffff' }}>
                  <Link to={`/products/${category._id}`} style={{ textDecoration: 'none', display: 'block', padding: isMobile ? '20px 12px 16px' : '32px 24px 24px' }}>

                    {/* Görsel */}
                    {randomItem ? (
                      <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: isMobile ? '12px' : '16px' }}>
                        <img
                          src={getImageUrl(randomItem.imageUrl)}
                          alt={randomItem.modelName}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s' }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                    ) : (
                      <div style={{ aspectRatio: '3/4', backgroundColor: '#f5f5f5', marginBottom: isMobile ? '12px' : '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '32px', color: '#d1d5db', fontWeight: '200' }}>{category.name.charAt(0).toLocaleUpperCase('en-US')}</span>
                      </div>
                    )}

                    {/* Kategori adı */}
                    <h3 style={{
                      fontSize: isMobile ? '10px' : '11px',
                      fontWeight: '400',
                      letterSpacing: '0.2em',
                      color: '#000000',
                      textAlign: 'center',
                      marginBottom: '4px',
                    }}>
                      {category.name.toLocaleUpperCase('en-US')}
                    </h3>

                    {/* Model ve fiyat */}
                    {randomItem && (
                      <>
                        <p style={{ fontSize: isMobile ? '11px' : '12px', letterSpacing: '0.04em', color: '#000', textAlign: 'center', marginBottom: '2px' }}>
                          DIFFIN — {randomItem.modelName}
                        </p>
                        <p style={{ fontSize: isMobile ? '10px' : '11px', color: '#9ca3af', textAlign: 'center' }}>
                          {randomItem.pricePerSeries.toLocaleString('tr-TR')} ₺ {t('productDetail.perPiece')}
                        </p>
                      </>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 2 Buton */}
      <section style={{padding: isMobile ? '32px 16px' : '64px 24px', backgroundColor: '#f3f4f6'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
            <Link
              to="/create-brand"
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #000000)',
                color: '#ffffff',
                padding: isMobile ? '40px 24px' : '64px 40px',
                textAlign: 'center',
                border: '1px solid #4b5563',
                textDecoration: 'none',
                display: 'block',
                transition: 'opacity 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <h3 style={{
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                marginBottom: '16px',
                color: '#ffffff'
              }}>
{t('home.createBrand.title')}
              </h3>
              <p style={{fontSize: isMobile ? '13px' : '14px', color: '#d1d5db'}}>
                {t('home.createBrand.description')}
              </p>
            </Link>

            <Link
              to="/custom-product"
              style={{
                background: 'linear-gradient(to bottom right, #000000, #1f2937)',
                color: '#ffffff',
                padding: isMobile ? '40px 24px' : '64px 40px',
                textAlign: 'center',
                border: '1px solid #4b5563',
                textDecoration: 'none',
                display: 'block',
                transition: 'opacity 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <h3 style={{
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                marginBottom: '16px',
                color: '#ffffff'
              }}>
{t('home.customProduct.title')}
              </h3>
              <p style={{fontSize: isMobile ? '13px' : '14px', color: '#d1d5db'}}>
                {t('home.customProduct.description')}
              </p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
