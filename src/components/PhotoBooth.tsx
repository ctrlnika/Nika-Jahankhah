import { HeritageTile } from "@/components/HeritageDetail";
import portrait from "@/assets/nika-portrait.jpg.asset.json";

export function PhotoBooth() {
  return (
    <figure className="photo-booth w-full">
      <div className="portrait-frame">
        <div className="portrait-ornament"><HeritageTile id="portrait-geometry" /></div>
        <div className="border border-border bg-card p-1 md:p-2">
          <img src={portrait.url} alt="Portrait of Nika Jahankhah" width={540} height={690} className="block h-auto w-full" fetchPriority="high" />
        </div>

      </div>
    </figure>
  );
}
