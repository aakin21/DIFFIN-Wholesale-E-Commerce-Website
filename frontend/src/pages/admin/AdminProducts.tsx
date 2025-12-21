import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { BASE_URL } from '../../utils/api';
import { Product, Category, ColorVariant } from '../../types';

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newCategory, setNewCategory] = useState('');
  const [productForm, setProductForm] = useState({
    categoryId: '',
    modelName: '',
    pricePerSeries: 2250,
  });
  const [colors, setColors] = useState<{ colorName: string; file: File | null }[]>([
    { colorName: '', file: null }
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if ((error as any).response?.status === 401) {
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: newCategory });
      setNewCategory('');
      setShowCategoryForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Kategori oluşturulurken bir hata oluştu!');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await api.delete(`/categories/${categoryId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Kategori silinirken bir hata oluştu!');
    }
  };

  const handleAddColor = () => {
    setColors([...colors, { colorName: '', file: null }]);
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index: number, field: string, value: string | File) => {
    const newColors = [...colors];
    if (field === 'colorName') {
      newColors[index].colorName = value as string;
    } else {
      newColors[index].file = value as File;
    }
    setColors(newColors);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/products/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.imageUrl;
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const uploadedColors: ColorVariant[] = [];
      for (const color of colors) {
        if (color.colorName && color.file) {
          const imageUrl = await uploadImage(color.file);
          uploadedColors.push({
            colorName: color.colorName,
            imageUrl,
          });
        }
      }

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, {
          ...productForm,
          colors: uploadedColors.length > 0 ? uploadedColors : editingProduct.colors,
        });
      } else {
        await api.post('/products', {
          ...productForm,
          colors: uploadedColors,
        });
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({ categoryId: '', modelName: '', pricePerSeries: 2250 });
      setColors([{ colorName: '', file: null }]);
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Ürün kaydedilirken bir hata oluştu!');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      categoryId: typeof product.categoryId === 'string' ? product.categoryId : product.categoryId._id,
      modelName: product.modelName,
      pricePerSeries: product.pricePerSeries,
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Ürün silinirken bir hata oluştu!');
    }
  };

  const handleToggleFeatured = async (productId: string, colorName: string) => {
    try {
      await api.post('/products/toggle-featured', { productId, colorName });
      fetchData();
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('Öne çıkarma durumu değiştirilirken bir hata oluştu!');
    }
  };

  if (loading) {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #000000',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#ffffff'}}>
      {/* Header */}
      <header style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{maxWidth: '1400px', margin: '0 auto', padding: '24px 16px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '300',
              letterSpacing: '0.3em',
              color: '#ffffff'
            }}>
              ÜRÜN YÖNETİMİ
            </h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '8px 24px',
                fontSize: '13px',
                letterSpacing: '0.05em',
                border: '1px solid #000000',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#000000';
              }}
            >
              ← DASHBOARD
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{maxWidth: '1400px', margin: '0 auto', padding: '48px 16px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '48px'}}>
          {/* Categories Section */}
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '32px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                color: '#000000'
              }}>
                KATEGORİLER
              </h2>
              <button
                onClick={() => setShowCategoryForm(!showCategoryForm)}
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '8px 16px',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                + YENİ
              </button>
            </div>

            {showCategoryForm && (
              <form onSubmit={handleCreateCategory} style={{marginBottom: '24px', padding: '16px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Kategori adı"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <div style={{display: 'flex', gap: '8px'}}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      padding: '8px 16px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    KAYDET
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCategoryForm(false)}
                    style={{
                      backgroundColor: '#e5e7eb',
                      color: '#000000',
                      padding: '8px 16px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    İPTAL
                  </button>
                </div>
              </form>
            )}

            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {categories.map((category) => (
                <div key={category._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb'
                }}>
                  <span style={{fontWeight: '500', fontSize: '14px'}}>{category.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    style={{
                      color: '#000000',
                      fontSize: '12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Product Section */}
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '32px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                color: '#000000'
              }}>
                YENİ ÜRÜN
              </h2>
              <button
                onClick={() => {
                  setShowProductForm(!showProductForm);
                  setEditingProduct(null);
                  setProductForm({ categoryId: '', modelName: '', pricePerSeries: 2250 });
                  setColors([{ colorName: '', file: null }]);
                }}
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '8px 16px',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                + YENİ
              </button>
            </div>

            {showProductForm && (
              <form onSubmit={handleCreateProduct} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '8px'}}>Kategori</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Seçiniz</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '8px'}}>Model Adı</label>
                  <input
                    type="text"
                    value={productForm.modelName}
                    onChange={(e) => setProductForm({ ...productForm, modelName: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '8px'}}>Fiyat (Seri Başı)</label>
                  <input
                    type="number"
                    value={productForm.pricePerSeries}
                    onChange={(e) => setProductForm({ ...productForm, pricePerSeries: Number(e.target.value) })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '8px'}}>Renkler</label>
                  {colors.map((color, index) => (
                    <div key={index} style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
                      <input
                        type="text"
                        placeholder="Renk adı"
                        value={color.colorName}
                        onChange={(e) => handleColorChange(index, 'colorName', e.target.value)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && handleColorChange(index, 'file', e.target.files[0])}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          fontSize: '14px'
                        }}
                      />
                      {colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(index)}
                          style={{
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            padding: '0 12px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddColor}
                    style={{
                      width: '100%',
                      backgroundColor: '#e5e7eb',
                      color: '#000000',
                      padding: '8px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      marginTop: '8px'
                    }}
                  >
                    + RENK EKLE
                  </button>
                </div>

                <div style={{display: 'flex', gap: '8px'}}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      padding: '12px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {editingProduct ? 'GÜNCELLE' : 'KAYDET'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#e5e7eb',
                      color: '#000000',
                      padding: '12px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    İPTAL
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Products List */}
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginBottom: '24px',
            color: '#000000'
          }}>
            TÜM ÜRÜNLER
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px'}}>
            {products.map((product) => (
              <div key={product._id} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
              }}>
                <div style={{aspectRatio: '1/1', backgroundColor: '#f3f4f6'}}>
                  {product.colors.length > 0 && product.colors[0].imageUrl ? (
                    <img
                      src={`${BASE_URL}${product.colors[0].imageUrl}`}
                      alt={product.modelName}
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                      color: '#9ca3af'
                    }}>
                      {product.modelName.charAt(0)}
                    </div>
                  )}
                </div>
                <div style={{padding: '16px'}}>
                  <h3 style={{fontWeight: '500', marginBottom: '4px', fontSize: '14px'}}>{product.modelName}</h3>
                  <p style={{fontSize: '12px', color: '#6b7280', marginBottom: '8px'}}>
                    {typeof product.categoryId === 'object' ? product.categoryId.name : 'N/A'}
                  </p>

                  {/* Renkler ve Öne Çıkar Butonları */}
                  <div style={{marginBottom: '12px', borderTop: '1px solid #e5e7eb', paddingTop: '12px'}}>
                    <p style={{fontSize: '11px', fontWeight: '500', marginBottom: '8px', letterSpacing: '0.05em'}}>RENKLER:</p>
                    {product.colors.map((color, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '6px 0',
                        borderBottom: index < product.colors.length - 1 ? '1px solid #f3f4f6' : 'none'
                      }}>
                        <span style={{fontSize: '12px', color: '#000000'}}>{color.colorName}</span>
                        <button
                          onClick={() => handleToggleFeatured(product._id, color.colorName)}
                          style={{
                            backgroundColor: color.featured ? '#000000' : '#ffffff',
                            color: color.featured ? '#ffffff' : '#000000',
                            border: '1px solid #000000',
                            padding: '4px 12px',
                            fontSize: '10px',
                            cursor: 'pointer',
                            letterSpacing: '0.05em',
                            transition: 'all 0.3s'
                          }}
                          onMouseOver={(e) => {
                            if (!color.featured) {
                              e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!color.featured) {
                              e.currentTarget.style.backgroundColor = '#ffffff';
                            }
                          }}
                        >
                          {color.featured ? '★ ÖNE ÇIKAN' : '☆ ÖNE ÇIKAR'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{display: 'flex', gap: '8px'}}>
                    <button
                      onClick={() => handleEditProduct(product)}
                      style={{
                        flex: 1,
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        padding: '8px',
                        fontSize: '11px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      DÜZENLE
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        padding: '8px',
                        fontSize: '11px',
                        border: '1px solid #000000',
                        cursor: 'pointer'
                      }}
                    >
                      SİL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
