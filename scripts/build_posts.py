#!/usr/bin/env python3
"""Build HTML sanitized articles from Pages CMS Markdown posts. Dependencies: pyyaml, markdown, bleach."""
from pathlib import Path
from datetime import date, datetime
import json, re, sys
import yaml, mistune, bleach
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / 'content' / 'posts'
OUTPUT = ROOT / 'assets' / 'cms-posts.js'
TAGS = ['p','h2','h3','h4','ul','ol','li','blockquote','strong','em','b','i','code','pre','hr','br','a','img']
ATTRS = {'a': ['href', 'title', 'target', 'rel'], 'img': ['src', 'alt', 'title']}

def extract(source):
    if not source.startswith('---\n'):
        raise ValueError('Frontmatter YAML dibutuhkan (---).')
    parts = source.split('---\n', 2)
    if len(parts) != 3:
        raise ValueError('Penutup frontmatter YAML tidak ditemukan.')
    meta = yaml.safe_load(parts[1]) or {}
    return meta, parts[2]

def normalize_path(url):
    if not isinstance(url, str): return ''
    url = url.strip()
    if url.startswith('/media/') or url.startswith('/unduhan/'):
        return url
    if url.startswith('https://'): return url
    return ''

def clean_body(html):
    cleaned = bleach.clean(html, tags=TAGS, attributes=ATTRS, protocols=['http','https'], strip=True)
    # Images and links from rich editor (media paths + https only); enforce rel for outgoing links.
    def img_rewrite(m):
        tag = m.group(0)
        match = re.search(r'\bsrc="([^"]+)"', tag)
        if not match or not normalize_path(match.group(1)):
            return ''
        return tag
    return re.sub(r'<img\b[^>]*>', img_rewrite, cleaned, flags=re.I)

def parse_one(path):
    meta, body = extract(path.read_text(encoding='utf-8'))
    if meta.get('published') is not True:
        return None
    title = str(meta.get('title', '')).strip()
    if not title: raise ValueError(f'{path}: judul wajib diisi.')
    slug = re.sub(r'[^a-z0-9-]+','-',path.stem.lower()).strip('-')
    kind = str(meta.get('jenis', 'Tulisan'))
    if kind not in {'Cerita','Tulisan','Buku'}: kind = 'Tulisan'
    theme = str(meta.get('theme', 'sand'))
    if theme not in {'sand','leaf','blue','violet'}: theme = 'sand'
    raw_date = meta.get('date', date.today())
    if isinstance(raw_date, (datetime, date)):
        raw_date = raw_date.strftime('%Y-%m-%d')
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', str(raw_date)):
        raise ValueError(f'{path}: date harus YYYY-MM-DD')
    rendered = mistune.create_markdown(escape=True)(body)
    text_only = re.sub('<[^>]+>', '', rendered)
    minutes = max(1, round(len(text_only.split()) / 200))
    return {
        'slug': slug,
        'jenis': kind,
        'kategori': str(meta.get('kategori') or kind),
        'judul': title,
        'ringkasan': str(meta.get('summary') or ''),
        'tanggal': str(raw_date),
        'durasi': f'{minutes} menit baca' if kind != 'Buku' else 'Karya digital',
        'tema': theme,
        'contoh': False,
        'tautan': normalize_path(meta.get('pdf', '')),
        'isi': clean_body(rendered)
    }

def main():
    posts = []
    slugs = set()
    for path in sorted(POSTS.glob('*.md')):
        item = parse_one(path)
        if not item: continue
        if item['slug'] in slugs: raise ValueError('Slug duplikat: ' + item['slug'])
        slugs.add(item['slug'])
        posts.append(item)
    posts.sort(key=lambda item: item['tanggal'], reverse=True)
    payload = json.dumps(posts, ensure_ascii=False).replace('<','\\u003c').replace('>','\\u003e')
    OUTPUT.write_text('/* Generated from Pages CMS; do not edit manually. */\nwindow.CMS_POSTS = '+payload+';\n', encoding='utf-8')
    print(f'{len(posts)} artikel diterbitkan di {OUTPUT.relative_to(ROOT)}')

if __name__ == '__main__':
    try: main()
    except Exception as exc:
        print(f'Gagal: {exc}', file=sys.stderr)
        raise
