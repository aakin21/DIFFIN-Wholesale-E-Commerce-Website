# DIFFIN E-Ticaret Projesi

Modern, responsive toptan tekstil satış websitesi.

## Teknolojiler

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Multer (dosya yükleme)
- bcryptjs (şifreleme)

## Kurulum

### Gereksinimler
- Node.js (v16+)
- MongoDB (yerel veya Atlas)
- npm veya yarn

### Backend Kurulumu

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını yapılandırın:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/diffin
JWT_SECRET=diffin_secret_key_2024_secure
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

4. MongoDB'nin çalıştığından emin olun

5. Backend sunucusunu başlatın:
```bash
npm run dev
```

Backend http://localhost:5000 adresinde çalışacaktır.

### Frontend Kurulumu

1. Frontend klasörüne gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Development sunucusunu başlatın:
```bash
npm run dev
```

Frontend http://localhost:5173 adresinde çalışacaktır.

## Özellikler

### Müşteri Tarafı
- ✅ Modern ve responsive tasarım
- ✅ Kategori bazlı ürün listeleme
- ✅ Ürün detay sayfası
- ✅ Renk seçimi ve görselleme
- ✅ Sepet sistemi (LocalStorage ile kalıcı)
- ✅ Sipariş formu
- ✅ Markanızı Oluşturalım sayfası
- ✅ Özel Ürün Üretimi sayfası
- ✅ Hakkımızda ve İletişim bölümleri

### Admin Paneli
- ✅ Güvenli admin girişi (JWT)
- ✅ Kategori yönetimi (Ekle, Sil)
- ✅ Ürün yönetimi (Ekle, Düzenle, Sil)
- ✅ Çoklu renk ve görsel yükleme
- ✅ Sipariş yönetimi
- ✅ Sipariş detayları görüntüleme

## Kullanım

### Admin Paneline Giriş

1. Tarayıcınızda `/admin` adresine gidin
2. Varsayılan giriş bilgileri:
   - Kullanıcı adı: `admin`
   - Şifre: `admin123`

### Ürün Ekleme

1. Admin paneline giriş yapın
2. "Ürün Yönetimi" sekmesine gidin
3. Önce bir kategori oluşturun (Sweat, Hoodie, T-Shirt, Şort vb.)
4. "Yeni Ürün" butonuna tıklayın
5. Formu doldurun:
   - Kategori seçin
   - Model adını girin
   - Fiyat belirleyin (varsayılan 2250 TL)
   - Renk ekleyin ve her renk için görsel yükleyin
6. "Kaydet" butonuna tıklayın

### Sipariş Verme

1. Ana sayfadan bir kategori seçin
2. Ürün listesinden bir model seçin
3. Renk seçin
4. Seri sayısını belirleyin (minimum 1)
5. "Sepete Ekle" butonuna tıklayın
6. Sepet sayfasında sipariş bilgilerini doldurun
7. "Sipariş Ver" butonuna tıklayın

## Proje Yapısı

```
diffin/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── models/
│   │   │   ├── Admin.ts
│   │   │   ├── Category.ts
│   │   │   ├── Product.ts
│   │   │   └── Order.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── categoryController.ts
│   │   │   ├── productController.ts
│   │   │   └── orderController.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── categoryRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   └── orderRoutes.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── upload.ts
│   │   ├── uploads/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   └── Footer.tsx
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── ProductsPage.tsx
    │   │   ├── ProductDetailPage.tsx
    │   │   ├── CartPage.tsx
    │   │   ├── CreateBrandPage.tsx
    │   │   ├── CustomProductPage.tsx
    │   │   └── admin/
    │   │       ├── AdminLoginPage.tsx
    │   │       ├── AdminDashboard.tsx
    │   │       ├── AdminOrders.tsx
    │   │       └── AdminProducts.tsx
    │   ├── contexts/
    │   │   └── CartContext.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── utils/
    │   │   └── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    └── tailwind.config.js
```

## API Endpoints

### Auth
- `POST /api/auth/login` - Admin girişi

### Categories
- `GET /api/categories` - Tüm kategorileri listele
- `POST /api/categories` - Yeni kategori ekle (Auth gerekli)
- `DELETE /api/categories/:id` - Kategori sil (Auth gerekli)

### Products
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/category/:categoryId` - Kategoriye göre ürünleri listele
- `GET /api/products/:id` - Ürün detayı
- `POST /api/products` - Yeni ürün ekle (Auth gerekli)
- `PUT /api/products/:id` - Ürün güncelle (Auth gerekli)
- `DELETE /api/products/:id` - Ürün sil (Auth gerekli)
- `POST /api/products/upload` - Ürün görseli yükle (Auth gerekli)

### Orders
- `GET /api/orders` - Tüm siparişleri listele (Auth gerekli)
- `GET /api/orders/:id` - Sipariş detayı (Auth gerekli)
- `POST /api/orders` - Yeni sipariş oluştur
- `DELETE /api/orders/:id` - Sipariş sil (Auth gerekli)

## Notlar

- Tüm fiyatlar TL cinsindendir
- 1 Seri = S, M (2 adet), L, XL bedenlerinden oluşur (toplam 5 ürün)
- Minimum sipariş 1 seridir
- Yüklenen görseller `backend/src/uploads/` klasöründe saklanır
- Sepet bilgileri tarayıcının LocalStorage'ında saklanır

## Güvenlik

- Admin şifresi bcrypt ile hashlenmiştir
- JWT token ile authentication
- Dosya yükleme için Multer middleware
- CORS ayarları yapılandırılmıştır

## Geliştirme İçin

```bash
# Backend watch mode
cd backend
npm run dev

# Frontend watch mode
cd frontend
npm run dev
```

## Production Build

```bash
# Backend build
cd backend
npm run build
npm start

# Frontend build
cd frontend
npm run build
```

## Lisans

MIT

## İletişim

Email: info@diffin.com
Telefon: +90 555 123 4567
