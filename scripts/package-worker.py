from pathlib import Path
import json,base64,mimetypes
root=Path(__file__).resolve().parent.parent
assets={}
for p in (root/'dist').rglob('*'):
 if p.is_file() and 'server' not in p.relative_to(root/'dist').parts:
  assets['/'+p.relative_to(root/'dist').as_posix()]={'type':mimetypes.guess_type(p.name)[0] or 'application/octet-stream','data':base64.b64encode(p.read_bytes()).decode()}
source=(root/'worker/api.js').read_text()+'\nconst assets = '+json.dumps(assets,separators=(',',':'))+''';
export default { async fetch(request, env) {
 const url = new URL(request.url);
 if(url.pathname.startsWith('/api/')) return api(request, env);
 if(!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed',{status:405});
 const asset = assets[url.pathname === '/' ? '/index.html' : url.pathname];
 if(!asset) return new Response('Not found',{status:404});
 const bytes = Uint8Array.from(atob(asset.data), c=>c.charCodeAt(0));
 return new Response(request.method === 'HEAD' ? null : bytes,{headers:{'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':url.pathname==='/'?'no-cache':'public, max-age=3600'}});
}};
'''
(root/'dist/server').mkdir(exist_ok=True)
(root/'dist/server/index.js').write_text(source)
(root/'dist/.openai').mkdir(exist_ok=True)
(root/'dist/.openai/hosting.json').write_text((root/'.openai/hosting.json').read_text())
