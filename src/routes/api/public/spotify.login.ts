import { createFileRoute } from "@tanstack/react-router";

// One-time setup helper: sends the site owner to Spotify to approve access.
export const Route = createFileRoute("/api/public/spotify/login")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = process.env["SPOTIFY_CLIENT_ID"];
        if (!id) return new Response("SPOTIFY_CLIENT_ID not set", { status: 500 });
        const redirect = new URL("/api/public/spotify/callback", request.url).toString();
        const url = new URL("https://accounts.spotify.com/authorize");
        url.search = new URLSearchParams({
          client_id: id,
          response_type: "code",
          redirect_uri: redirect,
          scope: "user-read-currently-playing user-read-recently-played",
        }).toString();
        return Response.redirect(url.toString(), 302);
      },
    },
  },
});
