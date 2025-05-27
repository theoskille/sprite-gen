'use client';

import Link from 'next/link';

interface BackButtonProps {
  href: string;
  className?: string;
}

export function BackButton({ href, className = '' }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`text-gray-400 hover:text-white transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </Link>
  );
} 