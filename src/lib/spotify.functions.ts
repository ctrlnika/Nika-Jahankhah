import { createServerFn } from "@tanstack/react-start";

export type NowPlaying = {
  configured: boolean;
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string | undefined;
  url?: string;
  playedAt?: string; // ISO, for last played
};

async function getAccessToken() {
  const id = process.env["SPOTIFY_CLIENT_ID"];
  const secret = process.env["SPOTIFY_CLIENT_SECRET"];
  const refresh = process.env["SPOTIFY_REFRESH_TOKEN"];
  if (!id || !refresh) return null;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      ...(secret ? { Authorization: `Basic ${btoa(`${id}:${secret}`)}` } : {}),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh, ...(!secret ? { client_id: id } : {}) }),
  });
  if (!res.ok) {
    console.error(`Spotify token failed [${res.status}]: ${await res.text()}`);
    return null;
  }
  return ((await res.json()) as { access_token: string }).access_token;
}

type Track = {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  external_urls: { spotify: string };
};

const shape = (t: Track) => ({
  title: t.name,
  artist: t.artists.map((a) => a.name).join(", "),
  album: t.album.name,
  albumArt: t.album.images[0]?.url,
  url: t.external_urls.spotify,
});

export const getNowPlaying = createServerFn({ method: "GET" }).handler(
  async (): Promise<NowPlaying> => {
    const token = await getAccessToken();
    if (!token) return { configured: false, isPlaying: false };
    const headers = { Authorization: `Bearer ${token}` };

    const now = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers });
    if (now.status === 200) {
      const data = (await now.json()) as { is_playing: boolean; item: Track | null };
      if (data.is_playing && data.item) {
        return { configured: true, isPlaying: true, ...shape(data.item) };
      }
    }

    const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers,
    });
    if (!recent.ok) return { configured: true, isPlaying: false };
    const r = (await recent.json()) as { items: { track: Track; played_at: string }[] };
    const item = r.items[0];
    if (!item) return { configured: true, isPlaying: false };
    return { configured: true, isPlaying: false, playedAt: item.played_at, ...shape(item.track) };
  },
);
