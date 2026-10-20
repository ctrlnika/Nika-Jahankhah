# Nika-Jahankhah

Nika Jahankhah’s portfolio for **hamid.com**: bilingual English/Persian typography, photography, projects, experience, LinkedIn post previews, contact delivery and Spotify listening.

Preview: https://nika-portfolio-design-preview.nika616621.chatgpt.site/

## Run locally

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run build
npm test
```

## Contents

- `src/`: React, TypeScript and TanStack portfolio application.
- `public/`: portrait, CV, fonts, LinkedIn imagery and browser scripts.
- `worker/api.js`: server-side contact delivery and current/recent Spotify listening.
- `dist/`: current deployable Worker and portfolio snapshot.
- `design-preview/`: static preview snapshot.
- `scripts/`: CV generation, Spotify setup and deployment packaging.
- `BACKEND-SETUP.md`: Resend and Spotify activation instructions.

## Configuration

Contact delivery needs secret `RESEND_API_KEY` and a verified `CONTACT_FROM` sender. Spotify needs `SPOTIFY_CLIENT_ID` and secret `SPOTIFY_REFRESH_TOKEN`; confidential authorization flows also need secret `SPOTIFY_CLIENT_SECRET`. These integrations require configuration before live delivery/listening can work.

Keep credentials in hosting runtime secrets. Do not commit `.env` files or tokens.

The `.openai/hosting.json` file identifies the existing Sites deployment. Keep it when maintaining that site; use a separate hosting configuration for a different destination. DNS connection for hamid.com remains dependent on the domain’s DNS records.

## Publish to GitHub

Once GitHub CLI authentication is working, from this directory run:

```sh
gh repo create Nika-Jahankhah --private --source=. --remote=origin --push
```

The repository includes the original Git history and the latest portfolio changes.
