interface IconProps {
  className?: string;
}

export function FlightsIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 14h5l3-4 6 2 5-6" />
      <path d="M22 6l-2 7-4 1" />
      <path d="M17 13l-4 5H8" />
      <path d="M3 20h22" />
    </svg>
  );
}
