import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api, { BASE_URL } from '../utils/api';
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

  // Her kategori için öne çıkan ürünü bul (sadece 1 tane)
  const getFeaturedProductsForCategory = (categoryId: string) => {
    return products
      .filter(product => product.categoryId === categoryId)
      .flatMap(product =>
        product.colors
          .filter(color => color.featured)
          .map(color => ({
            productId: product._id,
            modelName: product.modelName,
            colorName: color.colorName,
            imageUrl: color.imageUrl
          }))
      )
      .slice(0, 1); // Sadece ilk öne çıkan ürünü al
  };

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
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: isMobile ? '32px' : '64px'
            }}>
              {categories.map((category) => {
                const featuredProducts = getFeaturedProductsForCategory(category._id);
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
                        fontSize: isMobile ? '16px' : '20px',
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

                    {/* Öne Çıkan Ürün */}
                    {featuredProducts.length > 0 && (
                      <div>
                        {featuredProducts.map((item, index) => (
                          <Link
                            key={index}
                            to={`/product/${item.productId}`}
                            style={{
                              textDecoration: 'none',
                              display: 'block'
                            }}
                          >
                            <div style={{
                              backgroundColor: '#f9fafb',
                              aspectRatio: '1/1',
                              overflow: 'hidden',
                              marginBottom: '12px'
                            }}>
                              <img
                                src={`${BASE_URL}${item.imageUrl}`}
                                alt={`${item.modelName} - ${item.colorName}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transition: 'transform 0.3s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                              />
                            </div>
                            <p style={{
                              fontSize: '13px',
                              color: '#000000',
                              textAlign: 'center',
                              letterSpacing: '0.05em'
                            }}>
                              {item.modelName} - {item.colorName}
                            </p>
                          </Link>
                        ))}
                      </div>
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

      {/* WHO WE ARE Section */}
      <section style={{padding: isMobile ? '64px 16px' : '100px 24px', backgroundColor: '#ffffff'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto'}}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '40px',
            fontWeight: '300',
            letterSpacing: '0.12em',
            marginBottom: isMobile ? '32px' : '48px',
            textAlign: 'center',
            color: '#000000'
          }}>
            {t('home.whoWeAre.title')}
          </h2>

          {/* Text Content */}
          <div style={{textAlign: 'center', marginBottom: isMobile ? '48px' : '64px'}}>
            <p style={{
              fontSize: isMobile ? '15px' : '17px',
              lineHeight: '1.9',
              color: '#374151',
              marginBottom: '20px',
              maxWidth: '800px',
              margin: '0 auto 20px'
            }}>
              {t('home.whoWeAre.description')}
            </p>
            <p style={{
              fontSize: isMobile ? '15px' : '17px',
              lineHeight: '1.9',
              color: '#374151',
              marginBottom: '20px',
              maxWidth: '800px',
              margin: '0 auto 20px'
            }}>
              {t('home.whoWeAre.description2')}
            </p>
            <p style={{
              fontSize: isMobile ? '15px' : '17px',
              lineHeight: '1.9',
              color: '#374151',
              fontWeight: '500',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {t('home.whoWeAre.description4')}
            </p>
          </div>

          {/* Facilities Title */}
          <h3 style={{
            fontSize: isMobile ? '20px' : '26px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginBottom: isMobile ? '32px' : '40px',
            textAlign: 'center',
            color: '#000000'
          }}>
            {t('home.whoWeAre.facilitiesTitle')}
          </h3>

          {/* Image Placeholders Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '16px' : '24px',
            marginBottom: isMobile ? '48px' : '64px'
          }}>
            {['production', 'showroom', 'productDetails', 'office', 'packaging'].map((key, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  aspectRatio: '1/1',
                  backgroundColor: '#f9fafb',
                  border: '2px dashed #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <p style={{
                  fontSize: isMobile ? '11px' : '13px',
                  color: '#6b7280',
                  fontWeight: '500',
                  letterSpacing: '0.05em'
                }}>
                  {t(`home.whoWeAre.${key}`)}
                </p>
              </div>
            ))}
          </div>

          {/* Office Location */}
          <div style={{textAlign: 'center'}}>
            <p style={{
              fontSize: isMobile ? '14px' : '16px',
              color: '#6b7280',
              marginBottom: '8px',
              letterSpacing: '0.05em'
            }}>
              {t('home.whoWeAre.location')}
            </p>
            <p style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '300',
              color: '#000000',
              marginBottom: '8px'
            }}>
              {t('home.whoWeAre.locationCity')}
            </p>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#9ca3af'
            }}>
              {t('home.whoWeAre.locationNote')}
            </p>
          </div>
        </div>
      </section>

      {/* Beyazdan Siyaha Gradient Geçiş */}
      <div style={{
        height: '150px',
        background: 'linear-gradient(to bottom, #ffffff, #000000)'
      }}></div>

      {/* HAKKIMIZDA VE İLETİŞİM - FULL SİYAH */}
      <section style={{backgroundColor: '#000000', color: '#ffffff'}}>
        {/* HAKKIMIZDA */}
        <div style={{padding: isMobile ? '40px 16px' : '80px 24px', borderBottom: '1px solid #2d2d2d'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{display: isMobile ? 'block' : 'flex', gap: isMobile ? '0' : '64px', alignItems: 'center', position: 'relative'}}>
              {/* Sol - HAKKIMIZDA */}
              <div style={{flex: 1, paddingRight: isMobile ? '0' : '32px', marginBottom: isMobile ? '32px' : '0'}}>
                <h2 style={{fontSize: isMobile ? '24px' : '30px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '24px', color: '#ffffff'}}>
                  {t('home.about.title')}
                </h2>
                <p style={{lineHeight: '1.6', color: '#b0b0b0', fontSize: isMobile ? '14px' : '16px'}}>
                  {t('home.about.description')}
                </p>
              </div>

              {/* Ortada tarz beyaz çizgi - Sadece desktop'ta görünsün */}
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'linear-gradient(to bottom, transparent, #ffffff 20%, #ffffff 80%, transparent)',
                  transform: 'translateX(-50%)'
                }}></div>
              )}

              {/* Sağ - 4 madde */}
              <div style={{flex: 1, paddingLeft: isMobile ? '0' : '32px'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0, fontSize: isMobile ? '14px' : '16px'}}>{t('home.about.feature1')}</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0, fontSize: isMobile ? '14px' : '16px'}}>{t('home.about.feature2')}</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0, fontSize: isMobile ? '14px' : '16px'}}>{t('home.about.feature3')}</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0, fontSize: isMobile ? '14px' : '16px'}}>{t('home.about.feature4')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İLETİŞİM */}
        <div style={{padding: isMobile ? '32px 16px' : '48px 24px'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
            <h3 style={{fontSize: isMobile ? '16px' : '18px', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: '300', color: '#ffffff'}}>
              {t('home.contact.title')}
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: isMobile ? '13px' : '14px', alignItems: 'center'}}>
              <p style={{margin: 0}}>
                <a href="mailto:info@diffin.com" style={{color: '#b0b0b0', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                  {t('home.contact.email')}
                </a>
              </p>
              <p style={{margin: 0}}>
                <a href="tel:+905531349703" style={{color: '#b0b0b0', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                  {t('home.contact.phone1')}
                </a>
              </p>
              <p style={{margin: 0}}>
                <a href="tel:+36202204577" style={{color: '#b0b0b0', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                  {t('home.contact.phone2')}
                </a>
              </p>
              <p style={{margin: 0}}>
                <a href="tel:+905313695893" style={{color: '#b0b0b0', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                  {t('home.contact.phone3')}
                </a>
              </p>
              <p style={{fontSize: isMobile ? '11px' : '12px', color: '#b0b0b0', margin: 0}}>{t('home.contact.workingHours')}</p>
            </div>
            <div style={{borderTop: '1px solid #2d2d2d', marginTop: '32px', paddingTop: '24px'}}>
              <p style={{fontSize: isMobile ? '11px' : '12px', color: '#6b7280', margin: 0}}>
                &copy; {new Date().getFullYear()} DIFFIN. {t('home.contact.copyright')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
