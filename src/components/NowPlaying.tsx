import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { getNowPlaying } from "@/lib/spotify.functions";

function ago(iso: string, now: number) {
  const s = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}

const PROFILE = "https://open.spotify.com/user/ggs1ol58ivodmnb9e684wl86w";

export function NowPlaying() {
  const fetchNP = useServerFn(getNowPlaying);
  const { data, isError } = useQuery({
    queryKey: ["now-playing"],
    queryFn: () => fetchNP(),
    refetchInterval: 30_000,
  });
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(t);
  }, []);

  const label = isError
    ? "Spotify unavailable"
    : !data
    ? "Tuning in…"
    : !data.configured
      ? "Spotify profile"
    : data.isPlaying
      ? "Listening now"
      : data.playedAt
        ? `Last played · ${ago(data.playedAt, now)}`
        : "On Spotify";

  return (
    <a
      href={data?.url ?? PROFILE}
      target="_blank"
      rel="noreferrer"
      className="spotify-card edge-light"
    >
      <div className="spotify-art">
        {data?.albumArt ? (
          <img src={data.albumArt} alt="" className="size-full object-cover" />
        ) : <Music2 className="spotify-note" />}
      </div>
      <div className="spotify-copy">
        <p className="spotify-label">
          {data?.isPlaying && (
            <span className="relative flex size-2">

              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
          )}
          {label}
        </p>
        <p className="spotify-title">
          {data?.title ?? (data && !data.configured ? "My Spotify profile" : "—")}
        </p>
        <p className="spotify-artist">{data?.artist ?? ""}</p>
      </div>
    </a>
  );
}
