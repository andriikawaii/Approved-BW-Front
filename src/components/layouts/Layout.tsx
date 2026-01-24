import type { ReactNode } from 'react';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* Footer dodajemo u sledećem koraku */}
    </>
  );
}
