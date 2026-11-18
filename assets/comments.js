/* Komentar Disqus. Setiap artikel memiliki ID tetap sesuai slug. */
(() => {
  'use strict';
  const holder = document.getElementById('comments-root');
  if (!holder) return;
  const config = window.COMMENTS_CONFIG || {};
  const shortname = String(config.shortname || '').trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,60}$/.test(shortname)) {
    holder.innerHTML = '<p class="comments-help">Kolom komentar belum diaktifkan. Setelah website online, pemilik dapat menghubungkannya dengan Disqus. Panduannya tersedia di README.</p>';
    return;
  }
  const id = holder.getAttribute('data-comments-id') || new URLSearchParams(location.search).get('id') || 'buku-tamu';
  const pagePath = location.pathname.replace(/\/+/g, '/');
  holder.innerHTML = '<p class="comments-help">Komentar dikelola melalui Disqus. Konten dan data yang Anda kirim akan diproses oleh layanan tersebut.</p><button type="button" class="btn btn-primary comments-start">Tampilkan & tulis komentar ↗</button>';
  holder.querySelector('button').addEventListener('click', () => {
    holder.innerHTML = '<div id="disqus_thread"><p class="comments-help">Memuat komentar...</p></div>';
    window.disqus_config = function () {
      this.page.url = location.origin + pagePath + (id === 'buku-tamu' ? '' : '?id=' + encodeURIComponent(id));
      this.page.identifier = id === 'buku-tamu' ? 'ruang-gagasan-buku-tamu' : 'ruang-gagasan-artikel-' + id;
      this.page.title = document.title;
    };
    const script = document.createElement('script');
    script.src = 'https://' + shortname + '.disqus.com/embed.js';
    script.setAttribute('data-timestamp', String(Date.now()));
    script.async = true;
    document.body.appendChild(script);
  }, { once: true });
})();
