export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="swapoG" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0d7a5f" />
          <stop offset="100%" stopColor="#c9a84c" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#swapoG)" />
      <path d="M12 17h13.5l-3.2-3.2" stroke="#f5f0e0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M28 23H14.5l3.2 3.2" stroke="#f5f0e0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function Logo({ withWord = true }: { withWord?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      {withWord && (
        <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
          swapo<span className="text-primary">.</span>
        </span>
      )}
    </span>
  );
}
