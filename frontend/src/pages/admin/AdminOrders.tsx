import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { Order } from '../../types';

const AdminOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin');
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      if ((error as any).response?.status === 401) {
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await api.delete(`/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Sipariş silinirken bir hata oluştu!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-black to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              ← Dashboard'a Dön
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl text-gray-500">Henüz sipariş bulunmuyor</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-2xl font-bold text-black mb-4">
                Tüm Siparişler ({orders.length})
              </h2>

              {orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer p-4 ${
                    selectedOrder?._id === order._id ? 'ring-4 ring-black' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        {order.firstName} {order.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{order.phone}</p>
                    </div>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {(order.totalAmount ?? 0).toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2">
              {selectedOrder ? (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold text-black">
                      Sipariş Detayları
                    </h2>
                    <button
                      onClick={() => handleDelete(selectedOrder._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Sil
                    </button>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Müşteri Bilgileri</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">İsim Soyisim</p>
                        <p className="font-semibold">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Telefon</p>
                        <p className="font-semibold">{selectedOrder.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold">{selectedOrder.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sipariş Tarihi</p>
                        <p className="font-semibold">{formatDate(selectedOrder.createdAt)}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Adres</p>
                      <p className="font-semibold">{selectedOrder.address}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Sipariş Ürünleri</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                          <div>
                            <p className="font-semibold">{item.modelName}</p>
                            <p className="text-sm text-gray-600">Renk: {item.colorName}</p>
                            <p className="text-sm text-gray-600">Seri: {item.seriesCount}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{(item.totalPrice ?? 0).toLocaleString('tr-TR')} ₺</p>
                            <p className="text-sm text-gray-600">{(item.pricePerSeries ?? 0).toLocaleString('tr-TR')} ₺ / seri</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-black text-white rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">TOPLAM TUTAR</span>
                      <span className="text-3xl font-bold">{(selectedOrder.totalAmount ?? 0).toLocaleString('tr-TR')} ₺</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <div className="text-6xl mb-4">👈</div>
                  <p className="text-xl text-gray-500">
                    Detayları görmek için bir sipariş seçin
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;
