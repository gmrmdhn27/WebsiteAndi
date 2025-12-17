# Panduan Deploy ke Vercel (Gratis)

Panduan ini akan membantu Anda meng-online-kan website ini menggunakan layanan **Vercel** secara gratis.

## Prasyarat

1.  Akun **GitHub** (Anda sudah punya).
2.  Akun **Vercel** (Daftar di [vercel.com](https://vercel.com) menggunakan akun GitHub Anda).
3.  Kode proyek sudah ada di GitHub (Repository: `WebsiteAndi`).

---

## Langkah-langkah Deploy

### 1. Login ke Vercel

Buka [vercel.com](https://vercel.com) dan login menggunakan tombol **"Continue with GitHub"**.

### 2. Buat Project Baru

1.  Di halaman dashboard Vercel, klik tombol **"Add New..."** > **"Project"**.
2.  Di bagian "Import Git Repository", cari repository `WebsiteAndi` Anda.
3.  Klik tombol **Import**.

### 3. Konfigurasi Project

Di halaman "Configure Project", Anda perlu mengatur beberapa hal:

- **Project Name**: Bebas (misalnya: `website-andi`).
- **Framework Preset**: Biarkan `Other` (Vercel biasanya otomatis mendeteksi, tapi `Other` aman untuk Node.js custom).
- **Root Directory**: Biarkan `./`.

#### PENTING: Environment Variables

Anda **WAJIB** memasukkan kunci rahasia Midtrans di sini agar pembayaran berfungsi. Jangan tulis di kodingan!

1.  Klik dropdown **Environment Variables**.
2.  Tambahkan variable berikut satu per satu:

    | Name                  | Value                                                    |
    | :-------------------- | :------------------------------------------------------- |
    | `MIDTRANS_SERVER_KEY` | Masukkan Server Key asli Anda (contoh: `Mid-server-...`) |
    | `MIDTRANS_CLIENT_KEY` | Masukkan Client Key asli Anda (contoh: `Mid-client-...`) |

    _(Pastikan Environment-nya dicentang untuk Production, Preview, dan Development)_.

### 4. Deploy

1.  Klik tombol **Deploy**.
2.  Tunggu proses build selesai (biasanya 1-2 menit).
3.  Jika berhasil, Anda akan melihat tampilan "Congratulations!".

### 5. Selesai!

Klik gambar preview atau tombol **"Visit"** untuk membuka website Anda yang sudah online.
Alamat website biasanya berakhiran `.vercel.app` (contoh: `https://website-andi.vercel.app`).

---

## Catatan Tambahan

- **Database**: Karena Vercel bersifat _serverless_ dan _ephemeral_ (sementara), database lokal seperti SQLite (`.db` files) **TIDAK AKAN MENYIMPAN DATA** secara permanen. Jika Anda butuh database yang menyimpan data pesanan selamanya, Anda perlu menggunakan database cloud terpisah (seperti Supabase, Neon, atau MongoDB Atlas).
- **Update Website**: Setiap kali Anda melakukan `git push` ke GitHub, Vercel akan otomatis meng-update website Anda.
