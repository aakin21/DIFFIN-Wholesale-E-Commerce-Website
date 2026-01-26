import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Inline olarak çevirileri tanımlayalım
const resources = {
  hu: {
    translation: {
      "header": {
        "subtitle": "NAGYKERESKEDELMI TEXTIL",
        "products": "TERMÉKEK",
        "cart": "KOSÁR",
        "account": "FIÓK",
        "login": "BEJELENTKEZÉS",
        "logout": "KIJELENTKEZÉS",
        "emptyCart": "A kosár üres",
        "aboutUs": "RÓLUNK"
      },
      "home": {
        "wholesaleProducts": "NAGYKERESKEDELMI TERMÉKEINK",
        "loading": "Betöltés...",
        "noCategories": "Még nincsenek kategóriák",
        "createBrand": {
          "title": "HOZZA LÉTRE MÁRKÁJÁT",
          "description": "Építse fel saját márkáját egyedi megoldásokkal"
        },
        "customProduct": {
          "title": "EGYEDI TERMÉKGYÁRTÁS",
          "description": "A kívánt terméket, ahogyan szeretné"
        },
        "about": {
          "title": "RÓLUNK",
          "description": "A DIFFIN célja a legmagasabb minőségű termékek gyártása. A legjobb alapanyagokat használjuk, és az ügyfél-elégedettséget helyezzük előtérbe.",
          "feature1": "Prémium Minőségű Szövet",
          "feature2": "Részletes Minőségellenőrzés",
          "feature3": "Tartós Varrás",
          "feature4": "Színtartósság Garancia"
        },
        "contact": {
          "title": "KAPCSOLAT",
          "email": "info@diffin.com",
          "phone1": "+90 553 134 97 03",
          "phone2": "+36 20 220 45 77",
          "phone3": "+90 531 369 58 93",
          "workingHours": "Munkaidő: 24/7",
          "copyright": "Minden jog fenntartva."
        },
        "whoWeAre": {
          "title": "KIK VAGYUNK",
          "description": "A DIFFIN egy törökországi székhelyű nagykereskedelmi ruházati gyártó, amely kiskereskedőkkel és márkákkal dolgozik Európa-szerte.",
          "description2": "Saját gyártóhálózattal, bemutatóteremmel és irodával működünk, amely lehetővé teszi a minőség-ellenőrzés, mintázás és tömeges gyártás hatékony kezelését.",
          "description3": "Fókuszunk a nagykereskedelmi ruházat és egyedi gyártás, megbízható termeléssel, következetes minőséggel és világos kommunikációval.",
          "description4": "Hosszú távú partnerségeket építünk azzal, hogy teljesítjük ígéreteinket — időben és megfelelő színvonalon.",
          "facilitiesTitle": "Irodánk és Létesítményeink",
          "production": "Gyártási Terület",
          "showroom": "Bemutatóterem",
          "productDetails": "Termék Részletek",
          "office": "Iroda",
          "packaging": "Csomagolás és Szállítás",
          "location": "Iroda Helyszín",
          "locationCity": "Isztambul, Törökország",
          "locationNote": "Teljes cím kapcsolatfelvételkor elérhető."
        }
      },
      "products": {
        "title": "TERMÉKEK",
        "allCategories": "Összes Kategória",
        "noProducts": "Nem található termék ebben a kategóriában",
        "colors": "Szín Opciók",
        "viewDetails": "Részletek",
        "backToHome": "Vissza a Főoldalra"
      },
      "productDetail": {
        "colors": "Szín Opciók",
        "addToCart": "Kosárba",
        "quantity": "Mennyiség",
        "description": "Termék Leírás",
        "features": "Jellemzők",
        "wholesale": "Nagykereskedelem",
        "notFound": "Termék nem található",
        "backToProducts": "Vissza a Termékekhez"
      },
      "cart": {
        "title": "KOSARAM",
        "empty": "A kosár üres",
        "emptyAlert": "A kosár üres!",
        "startShopping": "Vásárlás Indítása",
        "color": "Szín",
        "seriesCount": "Sorozat Száma",
        "remove": "Eltávolítás",
        "total": "ÖSSZESEN",
        "orderInfo": "Rendelési Információk",
        "firstName": "Keresztnév",
        "lastName": "Vezetéknév",
        "email": "Email",
        "phone": "Telefon",
        "address": "Cím",
        "processing": "Feldolgozás...",
        "placeOrder": "RENDELÉS",
        "orderReceived": "Rendelés Fogadva!",
        "willContact": "Hamarosan felvesszük Önnel a kapcsolatot.",
        "redirecting": "Átirányítás a főoldalra...",
        "orderError": "Hiba történt a rendelés létrehozásakor!"
      },
      "account": {
        "title": "FIÓKOM",
        "myInfo": "Információim",
        "fullName": "Teljes Név",
        "email": "Email",
        "phone": "Telefon",
        "address": "Cím",
        "logout": "KIJELENTKEZÉS",
        "login": "BEJELENTKEZÉS",
        "register": "REGISZTRÁCIÓ",
        "firstName": "Keresztnév",
        "lastName": "Vezetéknév",
        "password": "Jelszó",
        "addressOptional": "Cím (Opcionális)",
        "processing": "FELDOLGOZÁS...",
        "noAccount": "Nincs még fiókja?",
        "haveAccount": "Már van fiókja?",
        "errorOccurred": "Hiba történt"
      },
      "createBrand": {
        "title": "HOZZA LÉTRE MÁRKÁJÁT",
        "subtitle": "Rendeljen nagykereskedelmi termékeinkből, vagy küldje el mintáját. Gyártás, címkézés, csomagolás — mindent mi intézünk.",
        "features": {
          "feature1": "MINTAGYÁRTÁS",
          "feature1Desc": "Küldje el mintáját, a kívánt minőségben gyártunk",
          "feature2": "CÍMKÉZÉS & CSOMAGOLÁS",
          "feature2Desc": "Egyedi címkézési és csomagolási megoldások márkájához",
          "feature3": "TELJES SZOLGÁLTATÁS",
          "feature3Desc": "A tervezéstől a kiszállításig minden szakaszban támogatjuk"
        },
        "contact": {
          "title": "RÉSZLETES INFORMÁCIÓKÉRT",
          "description": "Lépjen kapcsolatba velünk projektje megbeszéléséhez és egyedi ajánlatáért",
          "whatsapp": "KAPCSOLAT WHATSAPPON"
        },
        "minOrder": {
          "title": "MINIMUM RENDELÉS",
          "amount": "Színenként és modellenként 6 sorozat (30 darab)"
        }
      },
      "customProduct": {
        "title": "EGYEDI TERMÉKGYÁRTÁS",
        "subtitle": "Gyártsuk le a kívánt terméket, ahogyan szeretné. A DIFFIN-nél valóra váltjuk egyedi tervezési és gyártási igényeit.",
        "features": {
          "feature1": "AZ ÖN TERVEZÉSE",
          "feature1Desc": "Küldje el tervezését, vagy dolgozzon csapatunkkal",
          "feature2": "MINŐSÉGI GYÁRTÁS",
          "feature2Desc": "Prémium anyagokkal és szakértelemmel gyártunk",
          "feature3": "RUGALMAS MENNYISÉGEK",
          "feature3Desc": "Kis tételektől a nagyüzemi gyártásig"
        },
        "contact": {
          "title": "INDÍTSA EL PROJEKTJÉT",
          "description": "Lépjen kapcsolatba velünk egyedi termékigényeinek megbeszéléséhez",
          "whatsapp": "KAPCSOLAT WHATSAPPON"
        },
        "minOrder": {
          "title": "MINIMUM RENDELÉS",
          "amount": "Színenként és modellenként 6 sorozat (30 darab)"
        }
      }
    }
  },
  tr: {
    translation: {
      "header": {
        "subtitle": "TOPTAN TEKSTİL",
        "products": "ÜRÜNLER",
        "cart": "SEPET",
        "account": "HESAP",
        "login": "GİRİŞ YAP",
        "logout": "ÇIKIŞ YAP",
        "emptyCart": "Sepetiniz boş",
        "aboutUs": "HAKKIMIZDA"
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
        },
        "whoWeAre": {
          "title": "BİZ KİMİZ",
          "description": "DIFFIN, Avrupa genelinde perakendeciler ve markalarla çalışan Türkiye merkezli bir toptan giyim üreticisidir.",
          "description2": "Kendi üretim ağımız, showroom'umuz ve ofisimiz ile çalışarak kalite kontrol, numune ve seri üretimi verimli bir şekilde yönetiyoruz.",
          "description3": "Odak noktamız toptan giyim ve özel üretim; güvenilir üretim, tutarlı kalite ve süreç boyunca net iletişim sunuyoruz.",
          "description4": "Söz verdiğimizi yerine getirerek uzun vadeli ortaklıklar kuruyoruz — zamanında ve doğru standartta.",
          "facilitiesTitle": "Ofisimiz ve Tesislerimiz",
          "production": "Üretim Alanı",
          "showroom": "Showroom",
          "productDetails": "Ürün Detayları",
          "office": "Ofis",
          "packaging": "Paketleme ve Sevkiyat",
          "location": "Ofis Konumu",
          "locationCity": "İstanbul, Türkiye",
          "locationNote": "Tam adres iletişim sonrası paylaşılır."
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
      },
      "createBrand": {
        "title": "MARKANIZI OLUŞTURALIM",
        "subtitle": "Toptan satış yaptığımız ürünlerden sipariş verin ya da numune gönderin. Üretim, etiket, paket — geri kalan her şeyi biz ayarlıyoruz.",
        "features": {
          "feature1": "NUMUNE ÜRETİMİ",
          "feature1Desc": "Numunenizi gönderin, istediğiniz kalitede üretim sağlıyoruz",
          "feature2": "ETİKET & PAKETLEME",
          "feature2Desc": "Markanıza özel etiket ve paketleme çözümleri",
          "feature3": "TAM HİZMET",
          "feature3Desc": "Tasarımdan teslimata kadar her aşamada yanınızdayız"
        },
        "contact": {
          "title": "DETAYLI BİLGİ İÇİN",
          "description": "Projenizi görüşmek ve özel teklifinizi almak için bizimle iletişime geçin",
          "whatsapp": "WHATSAPP İLE İLETİŞİME GEÇ"
        },
        "minOrder": {
          "title": "MİNİMUM SİPARİŞ",
          "amount": "Renk ve model başı 6 seri (30 adet)"
        }
      },
      "customProduct": {
        "title": "ÖZEL ÜRÜN ÜRETİMİ",
        "subtitle": "İstediğiniz ürünü, istediğiniz şekilde üretelim. DIFFIN olarak özel tasarım ve üretim taleplerinizi gerçeğe dönüştürüyoruz.",
        "features": {
          "feature1": "SİZİN TASARIMINIZ",
          "feature1Desc": "Tasarımınızı gönderin veya ekibimizle çalışın",
          "feature2": "KALİTELİ ÜRETİM",
          "feature2Desc": "Premium malzemeler ve ustalıkla üretim",
          "feature3": "ESNEK MİKTARLAR",
          "feature3Desc": "Küçük partilerden büyük ölçekli üretime"
        },
        "contact": {
          "title": "PROJENİZİ BAŞLATIN",
          "description": "Özel ürün gereksinimlerinizi görüşmek için bizimle iletişime geçin",
          "whatsapp": "WHATSAPP İLE İLETİŞİME GEÇ"
        },
        "minOrder": {
          "title": "MİNİMUM SİPARİŞ",
          "amount": "Renk ve model başı 6 seri (30 adet)"
        }
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
        "emptyCart": "Your cart is empty",
        "aboutUs": "ABOUT US"
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
        },
        "whoWeAre": {
          "title": "WHO WE ARE",
          "description": "DIFFIN is a Turkey-based wholesale clothing manufacturer working with retailers and brands across Europe.",
          "description2": "We operate with our own production network, showroom, and office, allowing us to manage quality control, sampling, and bulk production efficiently.",
          "description3": "Our focus is on wholesale apparel and custom manufacturing, offering reliable production, consistent quality, and clear communication throughout the process.",
          "description4": "We build long-term partnerships by delivering what we promise — on time and at the right standard.",
          "facilitiesTitle": "Our Office & Facilities",
          "production": "Production Area",
          "showroom": "Showroom",
          "productDetails": "Product Details",
          "office": "Office",
          "packaging": "Packaging & Dispatch",
          "location": "Office Location",
          "locationCity": "Istanbul, Turkey",
          "locationNote": "Full address available upon contact."
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
      "createBrand": {
        "title": "CREATE YOUR BRAND",
        "subtitle": "Order from our wholesale products or send us your sample. Production, labeling, packaging — we handle everything.",
        "features": {
          "feature1": "SAMPLE PRODUCTION",
          "feature1Desc": "Send your sample, we produce at your desired quality",
          "feature2": "LABELING & PACKAGING",
          "feature2Desc": "Custom labeling and packaging solutions for your brand",
          "feature3": "FULL SERVICE",
          "feature3Desc": "We support you at every stage from design to delivery"
        },
        "contact": {
          "title": "FOR DETAILED INFO",
          "description": "Contact us to discuss your project and get your custom quote",
          "whatsapp": "CONTACT VIA WHATSAPP"
        },
        "minOrder": {
          "title": "MINIMUM ORDER",
          "amount": "6 series per color and model (30 pieces)"
        }
      },
      "customProduct": {
        "title": "CUSTOM PRODUCT MANUFACTURING",
        "subtitle": "Let us manufacture the product you want, the way you want it. At DIFFIN, we turn your custom design and production requests into reality.",
        "features": {
          "feature1": "YOUR DESIGN",
          "feature1Desc": "Send your design or work with our team",
          "feature2": "QUALITY PRODUCTION",
          "feature2Desc": "Manufacturing with premium materials and craftsmanship",
          "feature3": "FLEXIBLE QUANTITIES",
          "feature3Desc": "From small batches to large scale production"
        },
        "contact": {
          "title": "START YOUR PROJECT",
          "description": "Contact us to discuss your custom product requirements",
          "whatsapp": "CONTACT VIA WHATSAPP"
        },
        "minOrder": {
          "title": "MINIMUM ORDER",
          "amount": "6 series per color and model (30 pieces)"
        }
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
