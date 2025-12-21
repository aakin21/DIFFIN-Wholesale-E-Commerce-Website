import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import api, { BASE_URL } from '../utils/api';
import { OrderFormData } from '../types';

const CartPage: React.FC = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

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

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Sipariş oluşturulurken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
          <div className="text-6xl mb-6">✓</div>
          <h2 className="text-3xl font-bold text-black mb-4">
            Siparişiniz Alındı!
          </h2>
          <p className="text-gray-600 mb-6">
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <p className="text-sm text-gray-500">
            Ana sayfaya yönlendiriliyorsunuz...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
          SEPETİM
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-8">Sepetiniz boş</p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
            >
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    {item.colorImage ? (
                      <img
                        src={`${BASE_URL}${item.colorImage}`}
                        alt={item.colorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-300">
                          {item.modelName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-black mb-1">
                      {item.modelName}
                    </h3>
                    <p className="text-gray-600 mb-2">Renk: {item.colorName}</p>
                    <p className="text-gray-600">Seri Sayısı: {item.seriesCount}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-black mb-3">
                      {item.totalPrice.toLocaleString('tr-TR')} ₺
                    </p>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-black text-white rounded-2xl p-6">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>TOPLAM</span>
                  <span>{getTotalAmount().toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Sipariş Bilgileri</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İsim *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyisim *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'İşleniyor...' : 'SİPARİŞ VER'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
