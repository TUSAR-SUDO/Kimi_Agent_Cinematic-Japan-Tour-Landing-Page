interface IconProps {
  className?: string;
}

export function Telegram({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.2 3.8L2.5 10.9l5.5 2.3 9.8-6.2-7.5 8.4v4.4l3.3-3.1 4.5 3.4c.5.4 1.2.1 1.4-.5L22.6 4.8c.2-.6-.3-1.2-.9-1z" />
    </svg>
  );
}
