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
