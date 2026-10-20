import { HeritageTile } from "@/components/HeritageDetail";

export function PhotoBooth() {
  return (
    <figure className="photo-booth w-full">
      <div className="portrait-frame">
        <div className="portrait-ornament"><HeritageTile id="portrait-geometry" /></div>
        <div className="border border-border bg-card p-1 md:p-2">
          <img src="/nika-portrait.jpg" alt="Portrait of Nika Jahankhah" width={1280} height={848} className="block h-auto w-full" fetchPriority="high" />
        </div>
        <figcaption className="portrait-location">London, UK</figcaption>
      </div>
    </figure>
  );
}
