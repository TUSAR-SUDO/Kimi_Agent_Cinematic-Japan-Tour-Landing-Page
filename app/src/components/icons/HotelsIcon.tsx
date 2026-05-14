interface IconProps {
  className?: string;
}

export function HotelsIcon({ className = '' }: IconProps) {
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
      <path d="M4 22V12a2 2 0 012-2h16a2 2 0 012 2v10" />
      <path d="M2 22h24" />
      <path d="M8 10V6a2 2 0 012-2h8a2 2 0 012 2v4" />
      <path d="M10 22v-4h8v4" />
      <path d="M14 4V2" />
      <circle cx="14" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
