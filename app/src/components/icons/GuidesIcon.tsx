interface IconProps {
  className?: string;
}

export function GuidesIcon({ className = '' }: IconProps) {
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
      <circle cx="9" cy="7" r="3" />
      <circle cx="19" cy="7" r="3" />
      <path d="M4 22c0-4 3-7 5-7s3 1 3 3" />
      <path d="M24 22c0-4-3-7-5-7s-3 1-3 3" />
      <path d="M14 13v6" />
      <path d="M11 16l3-3 3 3" />
    </svg>
  );
}
