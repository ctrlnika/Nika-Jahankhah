import {test} from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {challengeFor,authorizeUrl,validateCallback} from '../../public/spotify-connect.js';

test('PKCE matches the RFC 7636 SHA-256 test vector',async()=>{
 assert.equal(await challengeFor('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',webcrypto),'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM');
});
test('authorization uses S256 and requests only listening scopes',()=>{
 const u=new URL(authorizeUrl('public-id','https://example.com/spotify-connect.html','state','challenge'));
 assert.equal(u.origin,'https://accounts.spotify.com');
 assert.equal(u.searchParams.get('code_challenge_method'),'S256');
 assert.equal(u.searchParams.get('scope'),'user-read-currently-playing user-read-recently-played');
 assert.equal(u.searchParams.get('redirect_uri'),'https://example.com/spotify-connect.html');
});
const pending={clientId:'public-id',redirectUri:'https://example.com/spotify-connect.html',state:'expected',verifier:'verifier',createdAt:1000};
test('callback rejects missing sessions, mismatched state and expired sessions',()=>{
 assert.throws(()=>validateCallback(new URLSearchParams('code=one&state=expected'),null,2000),/missing/);
 assert.throws(()=>validateCallback(new URLSearchParams('code=one&state=attacker'),pending,2000),/did not match/);
 assert.throws(()=>validateCallback(new URLSearchParams('code=one&state=expected'),pending,602000),/expired/);
});
test('callback handles denial and returns the code only for a valid session',()=>{
 assert.throws(()=>validateCallback(new URLSearchParams('error=access_denied&state=expected'),pending,2000),/cancelled/);
 assert.equal(validateCallback(new URLSearchParams('code=approved&state=expected'),pending,2000),'approved');
});
