"""Export the design review page; preserve all browser-local interactions.

The full TanStack application remains the source of truth. Server-only Q&A
and live Spotify are not simulated in this static, owner-private preview.
Run after `npm run build`, with the dev server serving the current source.
"""
from pathlib import Path
import re
import shutil
import urllib.request

ROOT = Path(__file__).resolve().parents[2]
with urllib.request.urlopen('http://127.0.0.1:5173/', timeout=30) as response:
    page = response.read().decode()
page = re.sub(r'<script\b[^>]*>.*?</script>', '', page, flags=re.S)
page = re.sub(r'<link\b[^>]*(?:modulepreload|stylesheet)[^>]*>', '', page)
page = re.sub(r' data-tsd-source="[^"]*"', '', page)
page = page.replace('</head>', '<link rel="stylesheet" href="/styles.css"></head>')
page = re.sub(r'<div class="project-qa\b.*?(?=</section>)', '', page, flags=re.S)
page = page.replace('Tuning in…', 'Spotify').replace('>—</p>', '>My Spotify profile</p>')
page = page.replace('</body>', '<script src="/contact-form.js" defer></script><script src="/portfolio-interactions.js" defer></script></body>')
css = next((ROOT / '.output/public/assets').glob('styles-*.css'))
for directory in ('design-preview', 'dist'):
    target = ROOT / directory
    target.mkdir(exist_ok=True)
    shutil.copytree(ROOT / 'public', target, dirs_exist_ok=True)
    (target / 'index.html').write_text(page)
    shutil.copy(css, target / 'styles.css')
assert 'echobankapp.app' in page
assert 'id="contact-form"' in page
assert 'Ask about my projects' not in page
assert 'portrait-ornament' not in page and 'heritage-divider' not in page
print('Static design preview exported; full-app routes and server functions preserved in source.')
