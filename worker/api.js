const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const fallback = { configured: false, isPlaying: false };
const track = t => ({ title: t.name, artist: t.artists.map(a => a.name).join(', '), albumArt: t.album.images?.[0]?.url, url: t.external_urls.spotify });
export async function api(request, env, fetcher = fetch) {
  const path = new URL(request.url).pathname;
  if (path === '/api/contact') {
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
    if (request.headers.get('Origin') !== new URL(request.url).origin) return json({ error: 'Please submit from this website.' }, 403);
    if (Number(request.headers.get('Content-Length')) > 20000) return json({ error: 'Message is too long.' }, 413);
    let data;
    try { const raw = await request.text(); if (raw.length > 20000) return json({error:'Message is too long.'},413); data = JSON.parse(raw); } catch { return json({ error: 'Invalid submission.' }, 400); }
    if (data.website) return json({ ok: true });
    const { name, email, message, submissionId } = data;
    if (typeof name !== 'string' || !name.trim() || name.length > 120 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email) || typeof message !== 'string' || !message.trim() || message.length > 5000 || typeof submissionId !== 'string' || !/^[\w-]{16,80}$/.test(submissionId)) return json({ error: 'Please check your name, email and message.' }, 400);
    if (!env.RESEND_API_KEY || !env.CONTACT_FROM) return json({ error: 'Contact delivery is being connected. Please email nika@hamid.com directly for now.' }, 503);
    try {
      const result = await fetcher('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': submissionId }, body: JSON.stringify({ from: env.CONTACT_FROM, to: ['nika@hamid.com'], reply_to: email, subject: 'Portfolio enquiry', text: `From: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}` }), signal: AbortSignal.timeout(10000) });
      if (!result.ok) return json({ error: 'Your message could not be sent. Please try again or email nika@hamid.com.' }, 502);
      return json({ ok: true });
    } catch { return json({ error: 'Delivery is unavailable. Please try again or email nika@hamid.com.' }, 502); }
  }
  if (path === '/api/spotify') {
    if (request.method !== 'GET') return json({error:'Method not allowed.'},405);
    if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_REFRESH_TOKEN) return json(fallback);
    try {
      const tokenResponse = await fetcher('https://accounts.spotify.com/api/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...(env.SPOTIFY_CLIENT_SECRET ? { Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}` } : {}) }, body: new URLSearchParams({grant_type:'refresh_token',refresh_token:env.SPOTIFY_REFRESH_TOKEN,...(!env.SPOTIFY_CLIENT_SECRET ? {client_id:env.SPOTIFY_CLIENT_ID}: {})}), signal: AbortSignal.timeout(8000) });
      if (!tokenResponse.ok) return json({ ...fallback, unavailable: true }, 502);
      const token = await tokenResponse.json();
      // PKCE refresh tokens may rotate; preserve the replacement in runtime secrets before it expires.
      const headers = { Authorization: `Bearer ${token.access_token}` };
      const now = await fetcher('https://api.spotify.com/v1/me/player/currently-playing', {headers,signal:AbortSignal.timeout(8000)});
      if (now.status === 200) { const item = await now.json(); if (item.is_playing && item.item?.type === 'track') return json({configured:true,isPlaying:true,...track(item.item)}); }
      const recent = await fetcher('https://api.spotify.com/v1/me/player/recently-played?limit=1', {headers,signal:AbortSignal.timeout(8000)});
      if (!recent.ok) return json({ ...fallback, unavailable: true }, 502);
      const item = (await recent.json()).items?.[0];
      return json(item ? {configured:true,isPlaying:false,playedAt:item.played_at,...track(item.track)} : {configured:true,isPlaying:false});
    } catch { return json({ ...fallback, unavailable:true },502); }
  }
  return json({error:'Not found.'},404);
}
