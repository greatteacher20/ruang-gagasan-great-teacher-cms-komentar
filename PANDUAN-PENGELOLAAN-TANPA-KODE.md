# PANDUAN RUANG GAGASAN: ARTIKEL DAN KOMENTAR TANPA EDIT JAVASCRIPT

Versi ini mempertahankan desain Ruang Gagasan dan menambahkan dua integrasi: **Pages CMS** untuk menulis lewat formulir, serta **Disqus** untuk komentar artikel dan buku tamu. Komponen tersebut membutuhkan pendaftaran dan pengaturan awal oleh pemilik akun. Paket ZIP **belum** mengaktifkan layanan online apa pun.

## A. Tes website di Visual Studio Code

1. Cadangkan folder website yang lama.
2. Ekstrak ZIP paket ini. Buka foldernya dari VS Code (`File > Open Folder`).
3. Klik kanan `index.html` > **Open with Live Server**.
4. Coba membuka tulisan pembuka dan tautan **Buka Buku Tamu**.
5. Artikel pembuka sudah menjadi file `content/posts/mengapa-saya-membuat-ruang-gagasan.md`, tetapi tampilan situs membaca salinan yang sudah diproses di `assets/cms-posts.js`. Setelah artikel diubah melalui CMS online, proses GitHub Actions mengolah file itu otomatis.

## B. Menyiapkan akun Github dan publikasi otomatis (sekali saja)

1. Buat akun GitHub di https://github.com/ (jika belum punya).
2. Buat **repository baru** bernama misalnya `ruang-gagasan`, dan atur sebagai **public** untuk integrasi paling sederhana. Catatan: semua file yang diunggah ke repository publik dapat dilihat siapa saja. Jangan taruh password, dokumen pribadi, atau draft rahasia. Jika memilih repo private, pastikan batasan layanan hosting/CMS sesuai.
3. Unggah **semua file dan folder di dalam folder utama**, termasuk `.pages.yml` dan `.github/workflows/publish-articles.yml` (folder yang diawali titik tersembunyi di beberapa sistem). Jangan mengunggah folder induk sebagai satu tingkat tambahan di atas `index.html`.
4. Masuk ke repo > `Settings > Actions > General` > izin workflow, pilih **Read and write permissions**, jika pengaturannya tersedia. Workflow memerlukan izin menulis ke `assets/cms-posts.js`.
5. Pada tab `Actions`, pilih **Terbitkan Artikel Ruang Gagasan**, tekan `Run workflow` jika diperlukan. Tunggu status hijau dan periksa apakah `assets/cms-posts.js` telah diperbarui. Jika pengguna pemula, jalankan sekali ini setelah upload supaya artikel termuat.
6. Buka https://app.netlify.com/ dan login. Pilih `Add new project > Import an existing project > GitHub` (nama menu dapat berubah). Pilih repo `ruang-gagasan`, set folder publikasi ke akar situs (`.`) dan tanpa perintah build, lalu **Deploy**. Perubahan yang sudah tersimpan ke repo akan memicu deploy otomatis via Netlify Git integration.
7. Jika sebelumnya website pernah diunggah dengan **Netlify Drop** saja, sambungkan repo GitHub untuk **continuous deployment** pada proyek yang sesuai atau buat proyek baru bila belum dapat dihubungkan. Jangan memakai dua tautan berbeda di Instagram tanpa sengaja.

## C. Mengelola artikel lewat formulir Pages CMS

1. Kunjungi https://app.pagescms.org/ lalu **Sign in with GitHub**.
2. Setujui instalasi Pages CMS GitHub App untuk repo Anda (beri akses hanya repo yang diperlukan).
3. Pilih repository dan cabang `main`. Konfigurasi `.pages.yml` dalam ZIP sudah menjelaskan formulir penulisan.
4. Buka koleksi **Cerita, Tulisan & Buku**, lalu pilih **New** untuk membuat artikel.
5. Isi judul, jenis `Cerita/Tulisan/Buku`, kategori, ringkasan, tanggal, dan isi tulisan dengan editor. Gambar dapat ditambahkan, dan untuk jenis `Buku` ada kolom file PDF (opsional).
6. Setel **Tampilkan di website = ON**, lalu simpan melalui Pages CMS. Jika OFF, konten tetap draft dan tidak muncul di website.
7. Pages CMS menyimpan file Markdown di `content/posts/` pada GitHub. GitHub Actions memprosesnya menjadi `assets/cms-posts.js`, dan Netlify menerbitkan perubahan dari repository yang terhubung.
8. Jika tulisan tidak terlihat, periksa `Actions` untuk melihat apakah proses sukses. Jangan mengedit `assets/cms-posts.js` karena file itu dibuat otomatis.

**Catatan:** Pages CMS adalah dashboard pihak ketiga yang mengedit isi website Anda di GitHub. Ia **bukan** login admin yang tersedia langsung di domain pribadi. Website tetap milik Anda, dan artikel tersimpan sebagai file di repository Anda.

## D. Mengaktifkan komentar dan buku tamu via Disqus

1. Publikasikan situs dahulu dan dapatkan URL aktif (misalnya `https://ruanggagasan.netlify.app`).
2. Daftar/masuk Disqus melalui https://disqus.com/admin/ lalu pilih opsi **I want to install Disqus on my site**. Daftarkan website dan ambil **shortname** situs, bukan alamat email.
3. Buka `assets/comments-config.js`, cari `shortname: ""` dan ganti dengan nilai shortname Anda, contohnya `shortname: "ruang-gagasan-saya"`.
4. Simpan, lalu unggah/commit perubahan tersebut ke GitHub. Netlify akan memperbarui website yang terhubung.
5. Buka artikel atau **Buku Tamu** pada website yang online. Klik tombol **Tampilkan & tulis komentar** untuk memuat layanan Disqus.
6. Uji dengan akun/pengunjung lain. Atur **moderasi komentar** di dashboard Disqus. Untuk komentar tamu tanpa akun, periksa pengaturan moderasi/guest comments sesuai kebijakan Disqus.

**Perlu diketahui:** Disqus Basic tersedia gratis dengan iklan pada kondisi yang berlaku. Untuk pengunjung, komentar dilayani Disqus, bukan database pribadi Anda. Privasi dan tampilan mengikuti ketentuan Disqus. Pilihan mengaktifkan komentar hanya setelah klik pada halaman mengurangi pemuatan script pihak ketiga saat pengunjung hanya membaca.

## E. Cara manual memasukkan tulisan (jika diperlukan)

1. Buka `assets/data.js`, cari `const KONTEN = [`.
2. Tambahkan blok artikel di dalamnya, contoh:

```js
{
  slug: "cerita-baru-saya",
  jenis: "Cerita",
  kategori: "Pengalaman pribadi",
  judul: "Cerita Baru Saya",
  ringkasan: "Cerita tentang pengalaman yang ingin saya bagikan.",
  tanggal: "2026-11-18",
  durasi: "3 menit baca",
  tema: "sand",
  contoh: false,
  isi: `<p>Paragraf pembuka saya.</p><h2>Pelajaran</h2><p>Isi cerita saya.</p>`
},
```

3. Tekan `Ctrl+S`; reload Live Server. Pastikan koma di akhir objek benar, dan `slug` berbeda dari artikel lain.
4. **Metode ini alternatif saja.** Artikel baru sebaiknya dibuat melalui Pages CMS setelah integrasi siap, supaya Anda tidak perlu lagi menulis JavaScript.

## F. Membaca dan mengedit tulisan pembuka pertama

File `content/posts/mengapa-saya-membuat-ruang-gagasan.md` berisi artikel pertama Anda. Setelah Pages CMS terhubung, file ini juga dapat diedit langsung melalui dashboard tanpa perlu menyalin kode.

## G. Menjaga keamanan dan kenyamanan pembaca

- Jangan menyimpan token atau kata sandi di JavaScript publik.
- Hindari menerbitkan pengalaman yang mengandung data pribadi orang lain tanpa izin.
- Moderasi komentar untuk mencegah spam atau ujaran tidak pantas.
- Unggah buku/PDF hanya jika Anda memiliki hak untuk membagikannya.
- Jika file konten HTML/Markdown berisi kode HTML tidak aman, builder website akan membatasi tag yang boleh diterbitkan.
- Cadangkan repository berkala. Media dan tulisan tersimpan di GitHub; komentar berada di Disqus dan tunduk pada layanan mereka.

Referensi resmi:
- Pages CMS: https://pagescms.org/docs/quick-start/
- Disqus: https://help.disqus.com/en/articles/1717112-universal-embed-code
- GitHub Actions: https://docs.github.com/en/actions
- Netlify Git: https://docs.netlify.com/build/configure-builds/repo-permissions-linking/
