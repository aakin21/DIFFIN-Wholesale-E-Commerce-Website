import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { BASE_URL } from '../utils/api';
import { Category, Product } from '../types';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
      <section style={{padding: '64px 24px', backgroundColor: '#ffffff'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            letterSpacing: '0.15em',
            marginBottom: '80px',
            textAlign: 'center',
            color: '#000000'
          }}>
            TOPTAN ÜRÜNLERİMİZ
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
            <p style={{textAlign: 'center', color: '#9ca3af'}}>Henüz kategori eklenmedi</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px'
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
                        fontSize: '24px',
                        fontWeight: '300',
                        letterSpacing: '0.15em',
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
      <section style={{padding: '64px 24px', backgroundColor: '#f3f4f6'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
            <Link
              to="/create-brand"
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #000000)',
                color: '#ffffff',
                padding: '64px 40px',
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
                fontSize: '28px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                marginBottom: '16px',
                color: '#ffffff'
              }}>
                MARKANIZI OLUŞTURALIM
              </h3>
              <p style={{fontSize: '14px', color: '#d1d5db'}}>
                Kendi markanızı yaratın, size özel çözümler
              </p>
            </Link>

            <Link
              to="/custom-product"
              style={{
                background: 'linear-gradient(to bottom right, #000000, #1f2937)',
                color: '#ffffff',
                padding: '64px 40px',
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
                fontSize: '28px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                marginBottom: '16px',
                color: '#ffffff'
              }}>
                ÖZEL ÜRÜN ÜRETİMİ
              </h3>
              <p style={{fontSize: '14px', color: '#d1d5db'}}>
                İstediğiniz ürünü, istediğiniz şekilde
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Beyazdan Siyaha Gradient Geçiş */}
      <div style={{
        height: '150px',
        background: 'linear-gradient(to bottom, #f3f4f6, #000000)'
      }}></div>

      {/* HAKKIMIZDA VE İLETİŞİM - FULL SİYAH */}
      <section style={{backgroundColor: '#000000', color: '#ffffff'}}>
        {/* HAKKIMIZDA */}
        <div style={{padding: '80px 24px', borderBottom: '1px solid #2d2d2d'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{display: 'flex', gap: '64px', alignItems: 'center', position: 'relative'}}>
              {/* Sol - HAKKIMIZDA */}
              <div style={{flex: 1, paddingRight: '32px'}}>
                <h2 style={{fontSize: '30px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '24px', color: '#ffffff'}}>
                  HAKKIMIZDA
                </h2>
                <p style={{lineHeight: '1.6', color: '#b0b0b0'}}>
                  DIFFIN, en kaliteli ürünleri üretmeyi hedefler. Üretimde en kaliteli hammaddeleri kullanır ve müşteri memnuniyetini ön planda tutar.
                </p>
              </div>

              {/* Ortada tarz beyaz çizgi */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(to bottom, transparent, #ffffff 20%, #ffffff 80%, transparent)',
                transform: 'translateX(-50%)'
              }}></div>

              {/* Sağ - 4 madde */}
              <div style={{flex: 1, paddingLeft: '32px'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0}}>Premium Kalite Kumaş</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0}}>Detaylı Kalite Kontrol</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0}}>Uzun Ömürlü Dikişler</p>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                  <span style={{color: '#ffffff', marginTop: '4px'}}>—</span>
                  <p style={{color: '#b0b0b0', margin: 0}}>Renk Sabitleme Garantisi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İLETİŞİM */}
        <div style={{padding: '48px 24px'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
            <h3 style={{fontSize: '18px', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: '300', color: '#ffffff'}}>
              İLETİŞİM
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', alignItems: 'center'}}>
              <p style={{margin: 0}}>
                <a href="mailto:info@diffin.com" style={{color: '#b0b0b0', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                  info@diffin.com
                </a>
              </p>
              <p style={{margin: 0}}>
                <a href="tel:+905551234567" style={{color: '#b0b0b0', textDecoration: 'none', transition: 'color 0.3s'}} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                  +90 555 123 4567
                </a>
              </p>
              <p style={{fontSize: '12px', color: '#b0b0b0', margin: 0}}>Çalışma Saatleri: 7/24</p>
            </div>
            <div style={{borderTop: '1px solid #2d2d2d', marginTop: '32px', paddingTop: '24px'}}>
              <p style={{fontSize: '12px', color: '#6b7280', margin: 0}}>
                &copy; {new Date().getFullYear()} DIFFIN. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
