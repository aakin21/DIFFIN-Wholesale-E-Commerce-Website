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
    const map: Record<string, { productId: string; modelName: string; colorName: string; imageUrl: string } | null> = {};
    categories.forEach(category => {
      const categoryProducts = products.filter(product => {
        const id = product.categoryId && typeof product.categoryId === 'object'
          ? (product.categoryId as Category)._id
          : product.categoryId as string;
        return id === category._id;
      });
      if (categoryProducts.length === 0) { map[category._id] = null; return; }
      const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      if (randomProduct.colors.length === 0) { map[category._id] = null; return; }
      const randomColor = randomProduct.colors[Math.floor(Math.random() * randomProduct.colors.length)];
      map[category._id] = {
        productId: randomProduct._id,
        modelName: randomProduct.modelName,
        colorName: randomColor.colorName,
        imageUrl: randomColor.imageUrl,
      };
    });
    return map;
  }, [products, categories]);

  return (
    <div className="min-h-screen">
      {/* TOPTAN ÜRÜNLERİMİZ - Beyaz arkaplan */}
      <section style={{padding: isMobile ? '32px 16px' : '64px 24px', backgroundColor: '#ffffff'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <h2 style={{
            fontSize: isMobile ? '24px' : '36px',
            fontWeight: '300',
            letterSpacing: isMobile ? '0.1em' : '0.15em',
            marginBottom: isMobile ? '40px' : '80px',
            textAlign: 'center',
            color: '#000000'
          }}>
{t('home.wholesaleProducts')}
          </h2>

          {loading ? (
            <div style={{display: 'flex', justifyContent: 'center', padding: '48px 0'}}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '2px solid #000000',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          ) : categories.length === 0 ? (
            <p style={{textAlign: 'center', color: '#9ca3af'}}>{t('home.noCategories')}</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '32px' : '40px'
            }}>
              {categories.map((category) => {
                const randomItem = categoryRandomItems[category._id];
                return (
                  <div key={category._id}>
                    {/* Kategori Başlığı */}
                    <Link
                      to={`/products/${category._id}`}
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        marginBottom: '24px',
                        textDecoration: 'none'
                      }}
                    >
                      <h3 style={{
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: '300',
                        letterSpacing: isMobile ? '0.08em' : '0.12em',
                        color: '#000000',
                        transition: 'opacity 0.3s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        {category.name.toUpperCase()}
                      </h3>
                    </Link>

                    {/* Random Ürün */}
                    {randomItem && (
                      <Link
                        to={`/product/${randomItem.productId}`}
                        style={{
                          textDecoration: 'none',
                          display: 'block'
                        }}
                      >
                        <div style={{
                          backgroundColor: '#f9fafb',
                          aspectRatio: '3/4',
                          overflow: 'hidden',
                        }}>
                          <img
                            src={getImageUrl(randomItem.imageUrl)}
                            alt={randomItem.modelName}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              transition: 'transform 0.3s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
