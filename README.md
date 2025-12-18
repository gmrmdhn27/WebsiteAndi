# Website Andi - Panduan Instalasi dan Penggunaan

Berikut adalah panduan untuk menjalankan server aplikasi ini.

## Prasyarat

Pastikan Anda sudah menginstal **Node.js** di komputer Anda.

## Instalasi

1. Buka folder proyek ini di terminal / command prompt.
2. Install semua dependency yang dibutuhkan dengan perintah:
   ```bash
   npm install
   ```

## Menjalankan Server

Anda memiliki dua cara untuk menjalankan server:

1. **Mode Development** (Disarankan untuk pengembangan)
   Menggunakan `nodemon`, server akan otomatis restart jika ada perubahan file.

   ```bash
   npm run dev
   ```

2. **Mode Production** (Biasa)
   Menjalankan server sekali saja dengan `node`.
   ```bash
   npm start
   ```
   _Atau bisa juga langsung:_
   ```bash
   node server.js
   ```

Setelah server berjalan, buka browser dan akses: [http://localhost:3000](http://localhost:3000)

## Konfigurasi API Midtrans

Sesuai konfigurasi saat ini, `server.js` menggunakan credential berikut:

- **Server Key**: `YOUR_SERVER_KEY`
- **Client Key**: `YOUR_CLIENT_KEY`

> [!WARNING] > **PENTING UNTUK GITHUB PUSH:**
> Key di atas bersifat RAHASIA. Jika Anda mencoba melakukan `git push` dengan key ini tertulis langsung di dalam file `server.js`, GitHub akan **memblokir** push Anda (seperti yang terjadi sebelumnya).
>
> **Solusi Aman:**
>
> 1. Buat file bernama `.env` di root folder.
> 2. Salin isi dari `.env.example` ke `.env`.
> 3. Isi key asli Anda di dalam file `.env` tersebut.
> 4. Ubah `server.js` untuk mengambil key dari `process.env`.
