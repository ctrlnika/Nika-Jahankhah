from pathlib import Path
import urllib.request,re,shutil
s=urllib.request.urlopen('http://127.0.0.1:5173/').read().decode()
s=re.sub(r'<script\b[^>]*>.*?</script>','',s,flags=re.S)
s=re.sub(r'<link\b[^>]*(?:modulepreload|stylesheet)[^>]*>',lambda m:m[0] if 'fonts.googleapis.com' in m[0] else '',s)
s=s.replace('</head>','<link rel="stylesheet" href="/styles.css"></head>')
s=re.sub(r'<div class="project-qa\b.*?(?=</section>)','',s,flags=re.S)
s=re.sub(r' data-tsd-source="[^"]*"','',s)
s=s.replace('Tuning in…','Spotify').replace('>—</p>','>My Spotify profile</p>')
s=s.replace('</body>','<script src="/contact-form.js" defer></script><script src="/spotify-listening.js" defer></script></body>')
for name in ['design-preview','dist']:
 (Path(name)/'index.html').write_text(s)
 shutil.copy(next(Path('.output/public/assets').glob('styles-*.css')),Path(name)/'styles.css')
