# Nika's bio

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

## October 2026 visual update

The homepage uses the supplied October CV destinations for email, hamid.com,
GitHub, PERSAHOLIC and Parachute. Existing LinkedIn, Instagram and Spotify
profiles are retained from the supplied website. EchoBank and Stalled London
have no supplied project destinations, so they do not render outbound links.
Text links are underlined at rest and have visible keyboard focus.

Blue identifies navigation and headings; plum and teal distinguish projects
and the Spotify panel. The portrait uses its intrinsic aspect ratio and the
hero stacks below 640px. Projects use four columns on desktop and compact rows
on phones. Spotify and Download CV share a consistent action column.

Spotify's existing server integration requires SPOTIFY_CLIENT_ID,
SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN in the hosting environment.
Without credentials it links to the existing profile. Never put these secrets
in client code. The public CV is regenerated with scripts/cv/generate.py and
continues to omit the phone number from the uploaded private source.

## Connect your Spotify account

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
