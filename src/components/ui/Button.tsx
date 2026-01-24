import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    'inline-flex items-center justify-center whitespace-nowrap font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const styles =
    variant === 'primary'
      ? 'bg-[#BC9155] text-white hover:opacity-90 focus:ring-[#BC9155]'
      : 'bg-transparent text-white/90 hover:text-white focus:ring-white';

  return (
    <Link href={href} className={`${base} ${styles} px-5 py-2.5 ${className}`}>
      {children}
    </Link>
  );
}
