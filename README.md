# Nika Jahankhah — hamid.com

Portfolio website for hamid.com

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hamid-showcases-world.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7bfecdc8-e93c-414e-a2fb-edb9d2c1886e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Editorial art direction

The portfolio uses self-hosted Hanken Grotesk, soft white and near-black, with
ultramarine type and small vermilion annotations. The original flash portrait
and real website screenshots provide the photographic warmth. PERSAHOLIC is
the main feature; EchoBank and Parachute form an offset supporting pair; Stalled
London is a compact index entry. Interface previews retain their own identity.

The shared edge-light treatment is limited to image frames, the listening
panel and contact action. Image movement, link arrows and the navigation
indicator support keyboard focus and reduced motion. Content and native
project disclosures remain available without hover or JavaScript.

The October CV and existing contact destinations remain the content sources.
EchoBank uses https://echobankapp.app. Stalled London has no supplied public
URL, so it does not render an invented destination. Public font licenses are
included alongside the files in `public/fonts`.

Run `npm run build` and `npm test` to validate the full TanStack application.
The source retains its server-side Spotify and project Q&A integrations. The
owner-private design preview is a static export made with
`python scripts/preview/export.py` after building, while the current dev server
runs on port 5173. It preserves navigation, disclosures, downloads, embeds and
the email-draft form; it does not simulate server-only Q&A or live listening.
The Spotify setup page is copied without modification during export.

The downloadable CV is regenerated with `python scripts/cv/generate.py` using
the palette tokens in `src/styles.css`. It continues to omit the private phone
number. Its privacy check is `python src/test/cv_privacy_test.py`.

## Connect your Spotify account

Preferred browser setup: open `/spotify-connect.html` on the private design
preview. Add the Redirect URI shown there to your Spotify app settings, enter
your public Client ID, and press Continue to Spotify. Approval returns to that
same tab, where the page exchanges the authorization code with S256 PKCE and
shows a refresh token. No Client Secret is required for this flow. It sends no
credentials to the portfolio server. The updated now-playing server supports
`SPOTIFY_CLIENT_ID` plus `SPOTIFY_REFRESH_TOKEN` without a secret; existing
three-secret setups remain supported. The login session expires after ten
minutes and tokens are not persisted by the setup page.

The Python flow below remains an alternative for use on your own computer.


The private design preview is static: it displays a Spotify profile link. Live
now-playing requires deploying the full TanStack app with its server functions.

1. Open https://developer.spotify.com/dashboard and create or open your app.
2. In the app settings, add exactly `http://127.0.0.1:8888/callback` as a Redirect URI.
3. Copy its Client ID and reveal its Client Secret. Spotify development-mode
   eligibility/account requirements are shown by the dashboard. If it requires
   your account in User Management, add the account you will authorize.
4. On your own computer, run `python3 scripts/spotify/connect.py`. Paste the ID
   and secret into its prompts and approve the browser consent screen.
5. Copy the resulting refresh token into `SPOTIFY_REFRESH_TOKEN` in your live
   hosting's server secrets, together with `SPOTIFY_CLIENT_ID` and
   `SPOTIFY_CLIENT_SECRET`. Redeploy the full app, play a track and wait up to
   30 seconds for the card to refresh.

The helper requests only currently-playing and recently-played scopes, binds
only to the loopback interface, checks authorization state, suppresses callback
logs and saves no credentials. Do not use the old public login/callback routes
for this local flow. No separate private key is needed.

The contact form currently composes an email to nika@hamid.com in the visitor's
email app. It does not claim that a message was delivered. Direct website-to-
inbox delivery needs an email provider and verified sender configured first.
