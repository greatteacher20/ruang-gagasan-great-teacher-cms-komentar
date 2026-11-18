/*
 * RUANG GAGASAN | GREAT TEACHER
 * INI FILE YANG PALING SERING ANDA EDIT.
 *
 * 1) Ubah SITE_CONFIG untuk profil dan tautan Instagram.
 * 2) Tambahkan tulisan/buku di KONTEN.
 * 3) Hapus atau ganti konten yang memiliki contoh: true sebelum website diterbitkan.
 *
 * PENTING: File ini bisa dibaca publik setelah website online.
 * Jangan simpan password, token, atau data pribadi sensitif di sini.
 */

const SITE_CONFIG = {
  brand: "Ruang Gagasan",
  name: "Great Teacher",               // Nama pena/identitas penulis.
  role: "Cerita, tulisan, dan karya",
  heroDescription: "Tempat saya berbagi cerita, merekam pengalaman, menyimpan karya, dan menuliskan hal-hal yang semoga bermanfaat bagi pembaca.",
  aboutLine1: "Saya menulis tentang pengalaman, hal-hal yang saya pelajari, dan gagasan yang ingin saya bagikan. Ruang Gagasan adalah tempat untuk menyimpan semuanya dalam bentuk yang mudah dibaca.",
  aboutLine2: "Di sini Anda bisa menemukan cerita pribadi, tulisan ringan, dan kelak buku atau e-book karya saya. Selamat membaca.",
  instagram: "",                        // Contoh: "https://www.instagram.com/username/"
  email: "",                            // Opsional: "halo@contoh.com"
  photo: ""                             // Opsional: "assets/foto-profil.jpg"
};

/*
 * JENIS KONTEN: "Cerita", "Tulisan", atau "Buku".
 *
 * Cerita/Tulisan: tambahkan isi: `...` untuk halaman baca lengkap.
 * Buku: tambahkan isi: `...` untuk sinopsis; opsional tautan: "unduhan/judul-buku.pdf".
 * Jika konten hanya berupa PDF/tautan, cukup tambahkan tautan tanpa isi.
 *
 * Catatan: semua contoh di bawah berstatus contoh: true. Bukan karya asli Anda.
 * Setelah menulis konten sendiri, gunakan contoh: false atau hapus properti contoh.
 */
const KONTEN = [
  {
    slug: "belajar-dari-hal-sederhana",
    jenis: "Cerita",
    kategori: "Refleksi sehari-hari",
    judul: "Belajar dari hal-hal sederhana",
    ringkasan: "Contoh format cerita pengalaman yang memuat peristiwa, perasaan, dan pelajaran yang diperoleh.",
    tanggal: "2026-11-12",
    durasi: "2 menit baca",
    tema: "leaf",
    contoh: true,
    isi: `
      <p>Ini merupakan ruang contoh untuk kisah pribadi Anda. Anda dapat memulai dengan satu kejadian yang paling Anda ingat, kemudian menjelaskan konteksnya kepada pembaca.</p>
      <h2>Apa yang terjadi?</h2>
      <p>Tulis kapan peristiwa berlangsung, situasinya, dan mengapa kejadian itu penting bagi Anda. Tidak perlu terlalu panjang.</p>
      <h2>Apa yang saya pelajari?</h2>
      <p>Sampaikan pelajaran secara spesifik. Jika ada perubahan cara berpikir atau kebiasaan setelah kejadian tersebut, ceritakan dengan sederhana.</p>
      <div class="article-note"><strong>Konten contoh:</strong> Ubah judul dan seluruh isinya menjadi cerita asli Anda.</div>
    `
  },
  {
    slug: "menulis-setelah-membaca-buku",
    jenis: "Tulisan",
    kategori: "Membaca & menulis",
    judul: "Cara menyimpan pelajaran setelah membaca buku",
    ringkasan: "Beberapa langkah sederhana untuk membuat catatan bacaan yang bisa dipahami saat dibuka kembali.",
    tanggal: "2026-11-10",
    durasi: "4 menit baca",
    tema: "blue",
    contoh: true,
    isi: `
      <p>Membaca buku dapat memperluas pengetahuan. Namun, gagasan penting mudah terlupakan jika kita tidak mencatatnya.</p>
      <h2>Pilih satu gagasan utama</h2>
      <p>Setelah selesai membaca satu bab, tulis satu kalimat yang menjelaskan hal terpenting dari bab tersebut dengan kata-kata sendiri.</p>
      <h2>Hubungkan dengan pengalaman</h2>
      <p>Periksa apakah gagasan itu berkaitan dengan situasi yang pernah Anda alami. Catatan menjadi lebih mudah diingat ketika mempunyai konteks.</p>
      <h2>Tulis sumber bacaan</h2>
      <p>Catat judul buku, nama penulis, dan halaman yang relevan. Bila Anda mengutip, bedakan kutipan langsung dari pendapat Anda sendiri.</p>
      <div class="article-note"><strong>Konten contoh:</strong> Silakan ganti atau kembangkan dengan bacaan yang benar-benar Anda gunakan.</div>
    `
  },
  {
    slug: "sebelum-membagikan-informasi",
    jenis: "Tulisan",
    kategori: "Literasi informasi",
    judul: "Tiga pertanyaan sebelum membagikan informasi",
    ringkasan: "Cara singkat memeriksa sumber, konteks, dan manfaat informasi sebelum dibagikan kepada orang lain.",
    tanggal: "2026-11-08",
    durasi: "3 menit baca",
    tema: "violet",
    contoh: true,
    isi: `
      <p>Berbagi pengetahuan merupakan kegiatan yang bermanfaat. Agar isi yang dibagikan tidak menyesatkan, lakukan pemeriksaan sederhana terlebih dahulu.</p>
      <h2>Siapa sumbernya?</h2>
      <p>Pastikan informasi berasal dari penulis, lembaga, atau dokumen yang dapat diperiksa. Hindari hanya mengandalkan potongan gambar tanpa sumber.</p>
      <h2>Apakah konteksnya sesuai?</h2>
      <p>Perhatikan tanggal, lokasi, dan batas penggunaan data. Informasi yang benar untuk satu situasi belum tentu berlaku untuk situasi lain.</p>
      <h2>Apa manfaatnya bagi pembaca?</h2>
      <p>Tanyakan apakah informasi membantu pembaca memahami persoalan atau mengambil keputusan yang lebih baik.</p>
      <div class="article-note"><strong>Konten contoh:</strong> Gunakan ini sebagai contoh struktur tulisan bermanfaat.</div>
    `
  },
  {
    slug: "contoh-halaman-karya-buku",
    jenis: "Buku",
    kategori: "Contoh katalog buku",
    judul: "Contoh tampilan buku karya sendiri",
    ringkasan: "Pratinjau cara menampilkan judul, ringkasan, dan nanti tautan PDF dari buku yang Anda tulis.",
    tanggal: "2026-11-07",
    durasi: "Pratinjau buku",
    tema: "sand",
    contoh: true,
    isi: `
      <p>Halaman ini menunjukkan cara menampilkan buku karya Anda. Saat buku asli siap, ganti judul, deskripsi, dan isi sinopsis pada file <strong>assets/data.js</strong>.</p>
      <h2>Ringkasan buku</h2>
      <p>Jelaskan tema utama buku, manfaatnya bagi pembaca, dan siapa yang Anda harapkan akan membacanya. Anda juga dapat menambahkan daftar isi singkat.</p>
      <h2>Unduh atau baca buku</h2>
      <p>Letakkan PDF buku milik Anda di folder <strong>unduhan</strong>. Kemudian tambahkan properti <strong>tautan</strong> dengan nama file PDF tersebut agar tombol unduh muncul otomatis.</p>
      <div class="article-note"><strong>Belum ada buku yang diterbitkan di sini.</strong> Ini hanya contoh penempatan karya dan bukan judul buku yang benar-benar telah Anda terbitkan.</div>
    `
  }
];
