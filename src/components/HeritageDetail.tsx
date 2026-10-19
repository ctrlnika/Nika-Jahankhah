/** Decorative geometry; hidden from assistive technology. */
export function HeritageTile({ id, className, viewBox = "0 0 160 160" }: { id: string; className?: string; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0 26 6 34 6 34 14 40 20 34 26 34 34 26 34 20 40 14 34 6 34 6 26 0 20 6 14 6 6 14 6Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="m20 11 9 9-9 9-9-9Z" fill="none" stroke="var(--accent)" strokeWidth=".8" />
          <circle cx="20" cy="20" r="2" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="160" height="160" fill={`url(#${id})`} />
    </svg>
  );
}

export function HeritageDivider() {
  return (
    <div className="heritage-divider" aria-hidden="true">
      <span className="heritage-rule" />
      <span className="binary-detail">01001110 01101001 <span>01101011 01100001</span></span>
      <span className="geometry-transition">◇ ◈</span>
      <HeritageTile id="divider-geometry" className="divider-geometry" viewBox="0 0 160 40" />
    </div>
  );
}
