import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Product, Category } from '../types';

const ProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoryRes] = await Promise.all([
          api.get(`/products/category/${categoryId}`),
          api.get(`/categories`),
        ]);

        setProducts(productsRes.data);
        const foundCategory = categoryRes.data.find((cat: Category) => cat._id === categoryId);
        setCategory(foundCategory);
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <Link to="/" className="text-gray-600 hover:text-black transition-colors inline-flex items-center">
            ← Ana Sayfaya Dön
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
          {category?.name || 'Ürünler'}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">Bu kategoride henüz ürün bulunmuyor</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {product.colors.length > 0 && product.colors[0].imageUrl ? (
                    <img
                      src={`http://localhost:5000${product.colors[0].imageUrl}`}
                      alt={product.modelName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-gray-300">
                        {product.modelName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                    {product.modelName}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {product.colors.length} Renk Seçeneği
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-black">
                      {product.pricePerSeries.toLocaleString('tr-TR')} ₺
                    </span>
                    <span className="text-sm text-gray-500">/ seri</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
