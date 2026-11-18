/* Logika website. Untuk mengganti nama, tautan dan konten, cukup edit assets/data.js. */
(() => {
  'use strict';
  const cfg = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : {};
  const manualPosts = typeof KONTEN !== 'undefined' && Array.isArray(KONTEN) ? KONTEN : [];
  const cmsPosts = Array.isArray(window.CMS_POSTS) ? window.CMS_POSTS : [];
  const content = [...cmsPosts, ...manualPosts.filter(post => !cmsPosts.some(newPost => newPost.slug === post.slug))];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const safe = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const local = value => typeof value === 'string' && /^(\.?\.?\/)?[\w\-./%]+$/.test(value) && !value.includes('..');
  const external = value => { try { const u = new URL(value); return u.protocol === 'https:'; } catch { return false; } };
  const address = value => external(value) || local(value) ? value : '';
  const articleUrl = item => 'artikel.html?id=' + encodeURIComponent(item.slug || '');
  const hasBody = item => typeof item.isi === 'string' && item.isi.trim().length > 0;
  const itemUrl = item => hasBody(item) ? articleUrl(item) : address(item.tautan);
  const openAttrs = item => !hasBody(item) && external(item.tautan) ? ' target="_blank" rel="noopener noreferrer"' : '';
  const formatDate = date => {
    const d = new Date(String(date) + 'T00:00:00');
    return isNaN(d.getTime()) ? 'Tanggal belum diisi' : new Intl.DateTimeFormat('id-ID', {day:'numeric',month:'short',year:'numeric'}).format(d);
  };
  const initials = text => String(text || 'NA').trim().split(/\s+/).slice(0,2).map(s => s.slice(0,1).toUpperCase()).join('') || 'NA';

  function setupIdentity() {
    $$('[data-brand]').forEach(el => el.textContent = cfg.brand || 'Ruang Gagasan');
    $$('[data-person-name]').forEach(el => el.textContent = cfg.name || 'Great Teacher');
    $$('[data-person-role]').forEach(el => el.textContent = cfg.role || 'Cerita, tulisan, dan karya');
    $$('[data-hero-description]').forEach(el => el.textContent = cfg.heroDescription || 'Cerita pengalaman, tulisan, dan karya di satu tempat.');
    $$('[data-about-line1]').forEach(el => el.textContent = cfg.aboutLine1 || 'Selamat datang di Ruang Gagasan.');
    $$('[data-about-line2]').forEach(el => el.textContent = cfg.aboutLine2 || 'Terima kasih sudah berkunjung.');
    if ($('#hero-initials')) $('#hero-initials').textContent = initials(cfg.name);
    const avatar = $('#hero-avatar');
    if (avatar && local(cfg.photo) && cfg.photo) {
      avatar.style.backgroundImage = `url("${encodeURI(cfg.photo).replace(/"/g,'%22')}")`;
      avatar.classList.add('has-photo');
    }
    const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
    if (cfg.name && cfg.name !== 'Great Teacher') {
      document.title = (cfg.brand || 'Ruang Gagasan') + ' | ' + cfg.name + ' - Cerita, Tulisan & Buku';
    }
    const contact = $('#contact-actions');
    if (contact) {
      const links = [];
      if (external(cfg.instagram)) links.push(['Instagram', cfg.instagram, '↗']);
      
      if (typeof cfg.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.email)) links.push(['Email saya', 'mailto:' + cfg.email, '→']);
      if (links.length) contact.innerHTML = links.map(([label,href,icon]) => `<a class="contact-link" href="${safe(href)}" ${href.startsWith('https:') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${safe(label)} <span aria-hidden="true">${icon}</span></a>`).join('');
    }
  }

  function setupNavigation() {
    const menuBtn = $('.mobile-toggle');
    const menu = $('#mobile-nav');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        menuBtn.setAttribute('aria-label', expanded ? 'Buka menu' : 'Tutup menu');
        menu.hidden = expanded;
      });
      $$('a', menu).forEach(link => link.addEventListener('click', () => {
        menu.hidden = true;
        menuBtn.setAttribute('aria-expanded','false');
        menuBtn.setAttribute('aria-label','Buka menu');
      }));
    }
    let saved = null;
    try { saved = localStorage.getItem('ruang-gagasan-theme'); } catch {}
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
    $$('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
      const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = newTheme;
      try { localStorage.setItem('ruang-gagasan-theme',newTheme); } catch {}
      btn.setAttribute('aria-label', newTheme === 'dark' ? 'Gunakan tema terang' : 'Gunakan tema gelap');
    }));
  }

  function cardHtml(item) {
    const link = itemUrl(item);
    const name = safe(item.judul || 'Tanpa judul');
    const symbol = item.jenis === 'Cerita' ? '“' : item.jenis === 'Tulisan' ? 'Aa' : '✦';
    const label = item.jenis === 'Buku' ? (hasBody(item) ? 'Lihat karya' : 'Lihat PDF') : item.jenis === 'Cerita' ? 'Baca cerita' : 'Baca tulisan';
    const title = link ? `<a href="${safe(link)}"${openAttrs(item)}>${name}</a>` : name;
    const action = link ? `<a class="card-read" href="${safe(link)}"${openAttrs(item)}>${label} <span aria-hidden="true">↗</span></a>` : '<span class="card-read">Segera hadir</span>';
    return `<article class="content-card">
      <div class="card-thumb thumb-${['leaf','sand','blue','violet'].includes(item.tema) ? item.tema : 'leaf'}">
        <span class="thumb-label">${safe(item.jenis || 'Konten')}</span>
        <span class="shape-ring" aria-hidden="true"></span><span class="thumb-symbol" aria-hidden="true">${symbol}</span><span class="thumb-accent" aria-hidden="true">✧</span>
      </div>
      <div class="card-body">
        <span class="card-category">${safe(item.kategori || item.jenis)}</span>
        ${item.contoh ? '<span class="sample-label">CONTOH</span>' : ''}
        <h3 class="card-title">${title}</h3>
        <p class="card-excerpt">${safe(item.ringkasan || '')}</p>
        <div class="card-meta"><small>${safe(formatDate(item.tanggal))}</small>${action}</div>
      </div></article>`;
  }

  function setupCollection() {
    const grid = $('#content-grid'); if (!grid) return;
    const input = $('#search-input'); const empty = $('#empty-state');
    const filters = $$('.filter-btn'); const count = $('#total-count');
    if (count) count.textContent = String(content.length).padStart(2,'0');
    let active = 'Semua';
    const sorted = content.slice().sort((a,b) => (b.tanggal || '').localeCompare(a.tanggal || ''));
    function render() {
      const q = (input?.value || '').toLocaleLowerCase('id').trim();
      const results = sorted.filter(item => (active === 'Semua' || item.jenis === active) && [item.judul,item.ringkasan,item.kategori,item.jenis].join(' ').toLocaleLowerCase('id').includes(q));
      grid.innerHTML = results.map(cardHtml).join('');
      empty.hidden = results.length !== 0;
    }
    function choose(category) {
      active = category;
      filters.forEach(btn => { const selected = btn.dataset.filter === category; btn.classList.toggle('active',selected); btn.setAttribute('aria-pressed', String(selected)); });
      render();
    }
    filters.forEach(btn => btn.addEventListener('click', () => choose(btn.dataset.filter)));
    input?.addEventListener('input', render);
    $('#reset-search')?.addEventListener('click', () => { if (input) input.value = '';choose('Semua');input?.focus(); });
    $$('[data-quick-filter]').forEach(link => link.addEventListener('click', () => { choose(link.dataset.quickFilter); if (input) input.value = '';render(); }));
    render();
  }

  function setupArticle() {
    const root = $('#article-root'); if (!root) return;
    const slug = new URLSearchParams(location.search).get('id') || '';
    const item = content.find(entry => entry.slug === slug && hasBody(entry));
    if (!item) {
      root.innerHTML = '<section class="article-not-found"><h1>Tulisan tidak ditemukan.</h1><p>Periksa tautan atau pilih bacaan lain dari beranda.</p><a class="btn btn-primary" href="index.html#koleksi">Kembali ke beranda ↗</a></section>';
      document.title = 'Tulisan tidak ditemukan | ' + (cfg.brand || 'Ruang Gagasan');
      return;
    }
    document.title = item.judul + ' | ' + (cfg.brand || 'Ruang Gagasan');
    const metaDesc = $('meta[name="description"]'); if (metaDesc) metaDesc.content = item.ringkasan || '';
    const ogTitle = $('meta[property="og:title"]'); if (ogTitle) ogTitle.content = item.judul;
    if (item.contoh) {
      const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex,follow'; document.head.appendChild(robots);
    }
    const download = item.jenis === 'Buku' && address(item.tautan)
      ? `<p class="book-download"><a class="btn btn-primary" href="${safe(address(item.tautan))}"${external(item.tautan) ? ' target="_blank" rel="noopener noreferrer"' : ''}>Buka PDF buku <span aria-hidden="true">↗</span></a></p>`
      : '';
    root.innerHTML = `<section class="article-header"><div class="container"><a class="article-breadcrumb" href="index.html#koleksi">← &nbsp; Kembali ke semua tulisan</a><div class="article-heading"><div class="article-type">${safe(item.kategori || item.jenis)} · ${safe(item.jenis)} ${item.contoh ? '<span class="sample-label">CONTOH</span>' : ''}</div><h1>${safe(item.judul)}</h1><p class="article-subtitle">${safe(item.ringkasan || '')}</p><div class="article-info"><span>${safe(formatDate(item.tanggal))}</span><span>${safe(item.durasi || 'Artikel')}</span><span>${safe(cfg.name || 'Penulis')}</span></div></div></div></section>
      <section class="container article-layout"><article class="article-content">${item.isi || '<p>Isi tulisan belum tersedia.</p>'}${download}<div class="article-bottom"><a href="index.html#koleksi">← Lihat tulisan lain</a><button class="aside-copy copy-article" type="button">Salin tautan tulisan</button></div></article><aside class="article-aside" aria-label="Bagikan tulisan"><div class="aside-card"><div class="aside-kicker">RUANG GAGASAN</div><h3>Ingin membagikan bacaan ini?</h3><p>Salin tautannya atau jelajahi cerita dan karya lainnya.</p><a class="aside-link" href="index.html#koleksi">Jelajahi koleksi ↗</a><button class="aside-copy copy-article" type="button">Salin tautan artikel</button></div></aside></section>
      <section class="container comments-section" aria-labelledby="comments-title"><div class="comments-panel"><p class="section-kicker">RUANG DISKUSI</p><h2 id="comments-title">Tinggalkan <em>komentar.</em></h2><p>Silakan berbagi tanggapan dengan sopan dan tetap menghargai privasi orang lain.</p><div id="comments-root" data-comments-id="${safe(item.slug)}"></div></div></section>`;
    $$('.copy-article').forEach(btn => btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); btn.textContent = 'Tautan tersalin ✓'; }
      catch { btn.textContent = 'Salin dari bilah alamat browser'; }
    }));
    if (!item.contoh) {
      const structuredData = item.jenis === 'Buku'
        ? { '@context':'https://schema.org','@type':'Book',name:item.judul,description:item.ringkasan || '',author:{'@type':'Person',name:cfg.name || 'Penulis'},inLanguage:'id-ID' }
        : { '@context':'https://schema.org','@type':'BlogPosting',headline:item.judul,description:item.ringkasan || '',datePublished:item.tanggal,author:{'@type':'Person',name:cfg.name || 'Penulis'},inLanguage:'id-ID' };
      const script = document.createElement('script'); script.type = 'application/ld+json';script.textContent = JSON.stringify(structuredData);document.head.appendChild(script);
    }
  }

  setupIdentity();
  setupNavigation();
  setupCollection();
  setupArticle();
})();
