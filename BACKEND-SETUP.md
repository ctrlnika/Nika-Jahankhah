# Activate contact and listening

The hosted Worker serves the existing portfolio plus `/api/contact` and `/api/spotify`. No private credentials are included in browser assets.

## Contact — Resend

1. Create a Resend account and verify a domain you control, using the DNS records Resend supplies.
2. Create an API key with sending access.
3. In this Site's runtime environment settings, set `RESEND_API_KEY` as a secret and `CONTACT_FROM` to an address on the verified domain, for example `Nika Portfolio <contact@hamid.com>`.
4. Redeploy the saved version to apply the environment revision. Submit one test message and confirm receipt at nika@hamid.com.

The recipient is fixed server-side. Messages have validation, a hidden bot field and idempotent delivery. Delivery remains unavailable until configured; the form never claims success without a successful provider response.

## Spotify

The previously supplied Client ID is `66e5c6092d8a4be598e9b93fa82507e8`.

1. In Spotify Developers, add this exact redirect URI: `https://nika-portfolio-design-preview.nika616621.chatgpt.site/spotify-connect.html`.
2. Open that setup page, enter the Client ID and approve current/recent listening permissions in the same tab.
3. Store its resulting refresh token as secret `SPOTIFY_REFRESH_TOKEN` in this Site's runtime settings. Set `SPOTIFY_CLIENT_ID` too. Do not paste credentials in source or public files.
4. For a refresh token generated through a confidential server authorization flow, also set secret `SPOTIFY_CLIENT_SECRET` from the same Spotify app. It is not required for the existing PKCE setup flow.
5. Redeploy. Play a track and check `/api/spotify`; only public track information is returned. With no current track, the most recent track is shown.

Client ID alone cannot read listening activity. A short-lived access token alone cannot keep the integration connected. Development-mode Spotify apps may require Premium and adding the account to the app's allowed users. PKCE refresh tokens can rotate: if Spotify invalidates an older token, reconnect and replace the stored refresh token.

## Build

Run `npm run build`, start the existing dev server on port 5173 for the SSR snapshot, run `python scripts/export-preview.py`, copy public runtime scripts to dist, then run `python scripts/package-worker.py`. Package `dist/` and `.openai/hosting.json` through Sites. The Worker embeds the small static asset set so it needs no separate asset binding.
