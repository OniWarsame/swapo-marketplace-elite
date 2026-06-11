export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="swapoG" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6A3D" />
          <stop offset="100%" stopColor="#E5305A" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#swapoG)" />
      {/* Two interlocking swap arrows */}
      <path d="M11 16h14l-3-3" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M29 24H15l3 3" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function Logo({ withWord = true }: { withWord?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      {withWord && (
        <span className="font-display text-2xl font-black tracking-tight text-ink">
          Swap<span className="text-primary">o</span>
        </span>
      )}
    </span>
  );
}
