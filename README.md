# Ruang Gagasan | Great Teacher

Versi CMS dan komentar, dengan desain asli.

**Mulai dari [PANDUAN-PENGELOLAAN-TANPA-KODE.md](PANDUAN-PENGELOLAAN-TANPA-KODE.md).**

- `index.html`: beranda
- `artikel.html`: artikel & komentar
- `buku-tamu.html`: buku tamu pengunjung
- `assets/data.js`: konfigurasi profil dan artikel manual (opsional)
- `content/posts/*.md`: artikel yang dapat diedit melalui Pages CMS
- `assets/cms-posts.js`: data hasil generate otomatis, jangan edit
- `.pages.yml`: konfigurasi CMS
- `.github/workflows/publish-articles.yml`: otomatisasi perubahan artikel
- `assets/comments-config.js`: pengaturan shortname Disqus setelah pendaftaran
- `scripts/build_posts.py`: membangun file artikel dari Markdown

Fitur CMS dan komentar **belum dapat digunakan sepenuhnya** sebelum GitHub, hosting, Pages CMS dan Disqus dikonfigurasi oleh pemilik akun.
