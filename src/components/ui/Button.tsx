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
    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const styles =
    variant === 'primary'
      ? 'bg-[#C89B5B] text-white hover:bg-[#b98747] focus:ring-[#C89B5B]'
      : 'border border-white text-white hover:bg-white/10 focus:ring-white';

  return (
    <Link href={href} className={`${base} ${styles} px-5 py-2.5 text-sm ${className}`}>
      {children}
    </Link>
  );
}
