export function FooterWave() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] text-navy">
      <svg
        viewBox="0 0 1440 80"
        fill="currentColor"
        className="block h-12 w-full sm:h-16 md:h-20"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,48 C240,96 480,0 720,40 C960,80 1200,24 1440,48 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
