import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Inline olarak çevirileri tanımlayalım
const resources = {
  tr: {
    translation: {
      "header": {
        "subtitle": "TOPTAN TEKSTİL",
        "products": "ÜRÜNLER",
        "cart": "SEPET",
        "account": "HESAP",
        "login": "GİRİŞ YAP",
        "logout": "ÇIKIŞ YAP",
        "emptyCart": "Sepetiniz boş"
      },
      "home": {
        "wholesaleProducts": "TOPTAN ÜRÜNLERİMİZ",
        "loading": "Yükleniyor...",
        "noCategories": "Henüz kategori eklenmedi",
        "createBrand": {
          "title": "MARKANIZI OLUŞTURALIM",
          "description": "Kendi markanızı yaratın, size özel çözümler"
        },
        "customProduct": {
          "title": "ÖZEL ÜRÜN ÜRETİMİ",
          "description": "İstediğiniz ürünü, istediğiniz şekilde"
        },
        "about": {
          "title": "HAKKIMIZDA",
          "description": "DIFFIN, en kaliteli ürünleri üretmeyi hedefler. Üretimde en kaliteli hammaddeleri kullanır ve müşteri memnuniyetini ön planda tutar.",
          "feature1": "Premium Kalite Kumaş",
          "feature2": "Detaylı Kalite Kontrol",
          "feature3": "Uzun Ömürlü Dikişler",
          "feature4": "Renk Sabitleme Garantisi"
        },
        "contact": {
          "title": "İLETİŞİM",
          "email": "info@diffin.com",
          "phone1": "+90 553 134 97 03",
          "phone2": "+36 20 220 45 77",
          "phone3": "+90 531 369 58 93",
          "workingHours": "Çalışma Saatleri: 7/24",
          "copyright": "Tüm hakları saklıdır."
        }
      },
      "products": {
        "title": "ÜRÜNLER",
        "allCategories": "Tüm Kategoriler",
        "noProducts": "Bu kategoride ürün bulunamadı",
        "colors": "Renk Seçeneği",
        "viewDetails": "Detayları Gör",
        "backToHome": "Ana Sayfaya Dön"
      },
      "productDetail": {
        "colors": "Renk Seçenekleri",
        "addToCart": "Sepete Ekle",
        "quantity": "Adet",
        "description": "Ürün Açıklaması",
        "features": "Özellikler",
        "wholesale": "Toptan",
        "notFound": "Ürün bulunamadı",
        "backToProducts": "Ürünlere Dön"
      },
      "cart": {
        "title": "SEPETİM",
        "empty": "Sepetiniz boş",
        "emptyAlert": "Sepetiniz boş!",
        "startShopping": "Alışverişe Başla",
        "color": "Renk",
        "seriesCount": "Seri Sayısı",
        "remove": "Kaldır",
        "total": "TOPLAM",
        "orderInfo": "Sipariş Bilgileri",
        "firstName": "İsim",
        "lastName": "Soyisim",
        "email": "Email",
        "phone": "Telefon",
        "address": "Adres",
        "processing": "İşleniyor...",
        "placeOrder": "SİPARİŞ VER",
        "orderReceived": "Siparişiniz Alındı!",
        "willContact": "En kısa sürede sizinle iletişime geçeceğiz.",
        "redirecting": "Ana sayfaya yönlendiriliyorsunuz...",
        "orderError": "Sipariş oluşturulurken bir hata oluştu!"
      },
      "account": {
        "title": "HESABIM",
        "myInfo": "Bilgilerim",
        "fullName": "Ad Soyad",
        "email": "Email",
        "phone": "Telefon",
        "address": "Adres",
        "logout": "ÇIKIŞ YAP",
        "login": "GİRİŞ YAP",
        "register": "KAYIT OL",
        "firstName": "Ad",
        "lastName": "Soyad",
        "password": "Şifre",
        "addressOptional": "Adres (Opsiyonel)",
        "processing": "İŞLEM YAPILIYOR...",
        "noAccount": "Hesabınız yok mu?",
        "haveAccount": "Zaten hesabınız var mı?",
        "errorOccurred": "Bir hata oluştu"
      }
    }
  },
  en: {
    translation: {
      "header": {
        "subtitle": "WHOLESALE TEXTILE",
        "products": "PRODUCTS",
        "cart": "CART",
        "account": "ACCOUNT",
        "login": "LOGIN",
        "logout": "LOGOUT",
        "emptyCart": "Your cart is empty"
      },
      "home": {
        "wholesaleProducts": "WHOLESALE PRODUCTS",
        "loading": "Loading...",
        "noCategories": "No categories added yet",
        "createBrand": {
          "title": "CREATE YOUR BRAND",
          "description": "Build your own brand with custom solutions"
        },
        "customProduct": {
          "title": "CUSTOM PRODUCT MANUFACTURING",
          "description": "The product you want, the way you want it"
        },
        "about": {
          "title": "ABOUT US",
          "description": "DIFFIN aims to produce the highest quality products. We use the finest raw materials in production and prioritize customer satisfaction.",
          "feature1": "Premium Quality Fabric",
          "feature2": "Detailed Quality Control",
          "feature3": "Long-Lasting Stitching",
          "feature4": "Color Fastness Guarantee"
        },
        "contact": {
          "title": "CONTACT",
          "email": "info@diffin.com",
          "phone1": "+90 553 134 97 03",
          "phone2": "+36 20 220 45 77",
          "phone3": "+90 531 369 58 93",
          "workingHours": "Working Hours: 24/7",
          "copyright": "All rights reserved."
        }
      },
      "products": {
        "title": "PRODUCTS",
        "allCategories": "All Categories",
        "noProducts": "No products found in this category",
        "colors": "Color Options",
        "viewDetails": "View Details",
        "backToHome": "Back to Home"
      },
      "productDetail": {
        "colors": "Color Options",
        "addToCart": "Add to Cart",
        "quantity": "Quantity",
        "description": "Product Description",
        "features": "Features",
        "wholesale": "Wholesale",
        "notFound": "Product not found",
        "backToProducts": "Back to Products"
      },
      "cart": {
        "title": "MY CART",
        "empty": "Your cart is empty",
        "emptyAlert": "Your cart is empty!",
        "startShopping": "Start Shopping",
        "color": "Color",
        "seriesCount": "Series Count",
        "remove": "Remove",
        "total": "TOTAL",
        "orderInfo": "Order Information",
        "firstName": "First Name",
        "lastName": "Last Name",
        "email": "Email",
        "phone": "Phone",
        "address": "Address",
        "processing": "Processing...",
        "placeOrder": "PLACE ORDER",
        "orderReceived": "Order Received!",
        "willContact": "We will contact you as soon as possible.",
        "redirecting": "Redirecting to homepage...",
        "orderError": "An error occurred while creating the order!"
      },
      "account": {
        "title": "MY ACCOUNT",
        "myInfo": "My Information",
        "fullName": "Full Name",
        "email": "Email",
        "phone": "Phone",
        "address": "Address",
        "logout": "LOGOUT",
        "login": "LOGIN",
        "register": "REGISTER",
        "firstName": "First Name",
        "lastName": "Last Name",
        "password": "Password",
        "addressOptional": "Address (Optional)",
        "processing": "PROCESSING...",
        "noAccount": "Don't have an account?",
        "haveAccount": "Already have an account?",
        "errorOccurred": "An error occurred"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
