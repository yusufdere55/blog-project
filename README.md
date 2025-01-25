# Blog API Projesi

Bu proje, blog yazılarının yönetimi için geliştirilmiş bir REST API'dir. Kullanıcılar makaleler yayınlayabilir ve yönetebilir.

## Teknolojiler

- Node.js
- Express.js
- SQLite
- Sequelize ORM
- JSON Web Token (JWT)
- Joi (Validasyon)
- bcryptjs (Şifreleme)

## Kurulum

1. Projeyi klonlayın
```bash
git clone [repo-url]
cd blog
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. `.env` dosyasını oluşturun
```env
PORT=3000
JWT_SECRET=your-super-secret-key-change-in-production
```

4. Uygulamayı başlatın
```bash
npm run dev
```

## Veritabanı Yapısı

### Users Tablosu
- username (string, unique) - Kullanıcı adı
- email (string, unique) - E-posta adresi
- password (string) - Şifrelenmiş parola
- status (enum) - active | passive | banned
- role (enum) - admin | user
- createDate (datetime) - Kayıt tarihi
- updateDate (datetime) - Güncelleme tarihi
- lastLoginDate (datetime) - Son giriş tarihi

## API Endpoint'leri

### Authentication

#### Kayıt Ol
```http
POST /api/auth/register
Content-Type: application/json

{
    "username": "test_user",
    "email": "test@example.com",
    "password": "123456"
}
```

#### Giriş Yap
```http
POST /api/auth/login
Content-Type: application/json

{
    "login": "test_user",  // veya email adresi
    "password": "123456"
}
```

#### Kullanıcı Bilgilerini Al
```http
GET /api/auth/me
Authorization: Bearer <token>
```

## Güvenlik Özellikleri

1. Şifre Hashleme
   - Kullanıcı şifreleri bcrypt ile hashlenip saklanır
   - Hash işlemi Sequelize hooks ile otomatik yapılır

2. JWT Authentication
   - Giriş başarılı olduğunda JWT token üretilir
   - Token süresi 24 saat olarak ayarlanmıştır

3. Validasyonlar
   - Joi ile request body validasyonu
   - Özel hata mesajları
   - Email ve username uniqueness kontrolü

4. Durum Kontrolleri
   - Aktif olmayan kullanıcılar giriş yapamaz
   - Token kontrolü
   - Rol bazlı yetkilendirme (gelecek özellik)

## Yapılacaklar

1. Blog Post Yönetimi
   - Post oluşturma
   - Post düzenleme
   - Post silme
   - Post listeleme
   - Post detay görüntüleme

2. Kategori Yönetimi
   - Kategori oluşturma
   - Kategori düzenleme
   - Kategori silme
   - Kategori listeleme

3. Yorum Sistemi
   - Yorum ekleme
   - Yorum düzenleme
   - Yorum silme
   - Yorumları listeleme

4. Admin Panel Endpoint'leri
   - Kullanıcı yönetimi
   - İçerik moderasyonu
   - Sistem ayarları

5. Dosya Yükleme
   - Resim yükleme
   - Dosya yükleme
   - Medya kütüphanesi

6. Arama ve Filtreleme
   - Post arama
   - Kategori filtreleme
   - Tarih filtreleme

7. Cache Sistemi
   - Redis entegrasyonu
   - Önbellek yönetimi

8. API Dokümantasyonu
   - Swagger/OpenAPI entegrasyonu
   - Endpoint dokümantasyonu
   - Örnek kullanımlar

