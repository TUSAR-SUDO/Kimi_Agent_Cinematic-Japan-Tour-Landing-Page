interface IconProps {
  className?: string;
}

export function TransfersIcon({ className = '' }: IconProps) {
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
      <rect x="2" y="10" width="16" height="10" rx="2" />
      <circle cx="7" cy="20" r="2" />
      <circle cx="17" cy="20" r="2" />
      <path d="M22 8l4 3-4 3" />
      <path d="M26 11H18" />
      <path d="M4 10V6a2 2 0 012-2h6" />
    </svg>
  );
}
