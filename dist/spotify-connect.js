const STORAGE_KEY = 'nika.spotify.pkce';
const SCOPES = 'user-read-currently-playing user-read-recently-played';
const encode = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export async function challengeFor(verifier, provider = globalThis.crypto) {
  return encode(new Uint8Array(await provider.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
}

export function authorizeUrl(clientId, redirectUri, state, challenge) {
  const url = new URL('https://accounts.spotify.com/authorize');
  url.search = new URLSearchParams({client_id: clientId, response_type: 'code', redirect_uri: redirectUri, scope: SCOPES, state, code_challenge_method: 'S256', code_challenge: challenge}).toString();
  return url.toString();
}

export function validateCallback(query, pending, now = Date.now()) {
  if (!pending || !pending.state || !pending.verifier || !pending.clientId || !pending.redirectUri || !Number.isFinite(pending.createdAt)) throw new Error('Setup session missing. Start again in the same browser tab.');
  if (now - pending.createdAt > 10 * 60 * 1000 || now < pending.createdAt) throw new Error('Setup session expired. Start again.');
  if (query.get('state') !== pending.state) throw new Error('Authorization state did not match. Start again.');
  if (query.has('error')) throw new Error('Spotify approval was cancelled or declined. You can try again.');
  const code = query.get('code');
  if (!code) throw new Error('Spotify returned no authorization code. Start again.');
  return code;
}

async function setup() {
  const byId = (id) => document.getElementById(id);
  const status = (message) => { byId('status').textContent = message; };
  const redirectUri = new URL('/spotify-connect.html', location.origin).toString();
  byId('redirect-uri').value = redirectUri;
  async function copy(value, message) {
    try { await navigator.clipboard.writeText(value); status(message); }
    catch { status('Select and copy the value from its field.'); }
  }
  byId('copy-redirect').addEventListener('click', () => copy(redirectUri, 'Redirect URI copied. Add it to your Spotify app settings and save.'));
  byId('copy-token').addEventListener('click', () => copy(byId('refresh-token').value, 'Refresh Token copied. Paste it into your hosting server secrets.'));
  byId('spotify-start').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    const clientId = byId('client-id').value.trim();
    if (!clientId) { status('Enter your Spotify Client ID.'); return; }
    const button = byId('connect-button'); button.disabled = true;
    try {
      const verifier = encode(crypto.getRandomValues(new Uint8Array(64)));
      const state = encode(crypto.getRandomValues(new Uint8Array(32)));
      const challenge = await challengeFor(verifier);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({clientId, redirectUri, state, verifier, createdAt: Date.now()}));
      location.assign(authorizeUrl(clientId, redirectUri, state, challenge));
    } catch {
      button.disabled = false;
      status('This browser could not start secure setup. Allow session storage and use this HTTPS page in a regular browser tab.');
    }
  });
  const query = new URLSearchParams(location.search);
  if (!query.has('code') && !query.has('error')) return;
  byId('setup-panel').hidden = true;
  history.replaceState(null, '', location.pathname); // Remove the authorization code before any request.
  status('Finishing your Spotify connection…');
  try {
    let pending;
    try { pending = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null'); }
    finally { sessionStorage.removeItem(STORAGE_KEY); }
    const code = validateCallback(query, pending);
    if (pending.redirectUri !== redirectUri) throw new Error('Redirect URI changed. Start setup again.');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({client_id: pending.clientId, grant_type: 'authorization_code', code, redirect_uri: redirectUri, code_verifier: pending.verifier}),
    });
    if (!response.ok) throw new Error(`Spotify could not finish authorization (HTTP ${response.status}). Check your app settings and try again.`);
    const result = await response.json();
    if (!result.refresh_token) throw new Error('Spotify returned no refresh token. Start again and approve the requested permissions.');
    byId('result-client').value = pending.clientId;
    byId('refresh-token').value = result.refresh_token;
    byId('result-panel').hidden = false;
    status('Connected. Your token is ready below.');
  } catch (error) {
    status(error instanceof Error ? error.message : 'Spotify setup failed. Please try again.');
    byId('retry').hidden = false;
  }
}
if (typeof document !== 'undefined') setup();
