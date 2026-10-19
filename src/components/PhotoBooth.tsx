export function PhotoBooth() {
  return (
    <figure className="portrait-figure">
      <div className="portrait-frame edge-light">
        <img src="/nika-portrait.jpg" alt="Nika Jahankhah, photographed with a direct flash and a shadow against the wall" width={1280} height={848} fetchPriority="high" />
      </div>
      <figcaption><span>Portrait / Nika Jahankhah</span><span>London, UK</span></figcaption>
    </figure>
  );
}
