import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-500">Ürün bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black transition-colors mb-8 inline-flex items-center"
        >
          ← Geri Dön
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
              {selectedColor && selectedColor.imageUrl ? (
                <img
                  src={`http://localhost:5000${selectedColor.imageUrl}`}
                  alt={selectedColor.colorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-9xl font-bold text-gray-300">
                    {product.modelName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-black mb-4">
                  {product.modelName}
                </h1>

                <div className="mb-8">
                  <div className="text-3xl font-bold text-black mb-2">
                    {product.pricePerSeries.toLocaleString('tr-TR')} ₺
                  </div>
                  <p className="text-gray-600">1 Seri = 2.250 TL</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Bir seri nedir?</strong><br />
                    Bir seri S, M (2 adet), L, XL bedenlerinden oluşur (toplam 5 ürün)
                  </p>
                  <p className="text-sm text-gray-600 mt-3">
                    Minimum sipariş: 1 seri
                  </p>
                </div>

                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Renk Seçin:</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative overflow-hidden rounded-xl border-4 transition-all ${
                            selectedColor?.colorName === color.colorName
                              ? 'border-black shadow-lg scale-105'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <div className="aspect-square bg-gray-100">
                            {color.imageUrl ? (
                              <img
                                src={`http://localhost:5000${color.imageUrl}`}
                                alt={color.colorName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-2xl text-gray-300">
                                  {color.colorName.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-2 bg-white text-center">
                            <p className="text-sm font-medium truncate">{color.colorName}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Series Count */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Seri Sayısı:</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSeriesCount(Math.max(1, seriesCount - 1))}
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors font-bold text-xl"
                    >
                      -
                    </button>
                    <span className="text-3xl font-bold w-16 text-center">{seriesCount}</span>
                    <button
                      onClick={() => setSeriesCount(seriesCount + 1)}
                      className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-600 mt-3">
                    Toplam: <strong className="text-black text-xl">{(product.pricePerSeries * seriesCount).toLocaleString('tr-TR')} ₺</strong>
                  </p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedColor}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                SEPETE EKLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
