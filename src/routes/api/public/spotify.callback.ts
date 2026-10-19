import { createFileRoute } from "@tanstack/react-router";

// Exchanges the approval code for a refresh token and shows it once to whoever approved.
export const Route = createFileRoute("/api/public/spotify/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = process.env["SPOTIFY_CLIENT_ID"];
        const secret = process.env["SPOTIFY_CLIENT_SECRET"];
        const code = new URL(request.url).searchParams.get("code");
        if (!id || !secret || !code) return new Response("Missing setup values", { status: 400 });
        const redirect = new URL("/api/public/spotify/callback", request.url).toString();
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect }),
        });
        const body = await res.text();
        if (!res.ok) return new Response(`Spotify error [${res.status}]: ${body}`, { status: 502 });
        const { refresh_token } = JSON.parse(body) as { refresh_token: string };
        const html = `<!doctype html><body style="font-family:system-ui;max-width:640px;margin:60px auto;padding:0 20px">
<h1>Almost done</h1><p>Copy this refresh token and paste it into the SPOTIFY_REFRESH_TOKEN field in Lovable:</p>
<textarea readonly style="width:100%;height:120px">${refresh_token}</textarea></body>`;
        return new Response(html, { headers: { "content-type": "text/html", "cache-control": "no-store" } });
      },
    },
  },
});
