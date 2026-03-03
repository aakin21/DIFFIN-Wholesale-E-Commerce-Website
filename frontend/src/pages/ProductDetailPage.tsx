import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { BASE_URL } from '../utils/api';
import { Product, ColorVariant } from '../types';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [seriesCount, setSeriesCount] = useState(1);
  const [loading, setLoading] = useState(true);

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
      pricePerSeries: product.pricePerSeries,
      totalPrice: product.pricePerSeries * seriesCount,
    });

    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Ürün bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-14">

        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-black transition-colors mb-8 inline-flex items-center text-sm tracking-wider"
        >
          ← Geri Dön
        </button>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20">

          {/* Sol: Galeri */}
          <div>
            {/* Ana Görsel */}
            <div className="aspect-square bg-gray-100 overflow-hidden mb-3">
              {selectedColor?.imageUrl ? (
                <img
                  src={`${BASE_URL}${selectedColor.imageUrl}`}
                  alt={selectedColor.colorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl font-light text-gray-300">
                    {product.modelName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Şeridi */}
            {product.colors.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      flexShrink: 0,
                      width: '72px',
                      height: '72px',
                      padding: 0,
                      cursor: 'pointer',
                      backgroundColor: '#f5f5f5',
                      overflow: 'hidden',
                      border: selectedColor?.colorName === color.colorName
                        ? '2px solid #000000'
                        : '2px solid transparent',
                    }}
                  >
                    {color.imageUrl ? (
                      <img
                        src={`${BASE_URL}${color.imageUrl}`}
                        alt={color.colorName}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    ) : (
                      <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span style={{fontSize: '18px', color: '#9ca3af'}}>{color.colorName.charAt(0)}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ: Ürün Bilgisi */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-light tracking-widest text-black uppercase mb-2">
                {product.modelName}
              </h1>

              {selectedColor && (
                <p className="text-sm text-gray-400 tracking-wider uppercase mb-8">
                  {selectedColor.colorName}
                </p>
              )}

              <div className="mb-10">
                <span className="text-2xl font-light text-black">
                  {product.pricePerSeries.toLocaleString('tr-TR')} ₺
                </span>
                <span className="text-sm text-gray-400 ml-2">/ seri</span>
              </div>

              <div className="border border-gray-200 p-5 mb-10">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-medium text-black">1 seri</span> = S, M (×2), L, XL — toplam 5 adet
                </p>
                <p className="text-xs text-gray-400 mt-2">Minimum sipariş: 1 seri</p>
              </div>

              {/* Seri Sayısı */}
              <div className="mb-10">
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Seri Sayısı</p>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setSeriesCount(Math.max(1, seriesCount - 1))}
                    className="w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors text-xl font-light flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-2xl font-light w-8 text-center">{seriesCount}</span>
                  <button
                    onClick={() => setSeriesCount(seriesCount + 1)}
                    className="w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors text-xl font-light flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                {seriesCount > 1 && (
                  <p className="text-sm text-gray-500 mt-3">
                    Toplam: <strong className="text-black">{(product.pricePerSeries * seriesCount).toLocaleString('tr-TR')} ₺</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Sepete Ekle */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedColor}
              className="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              SEPETE EKLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
