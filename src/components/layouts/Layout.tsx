import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import StickyEstimateCta from './StickyEstimateCta';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const currentYear = new Date().getUTCFullYear();
  return (
    <>
      <Header />
      <main>{children}</main>
      <StickyEstimateCta />
      <Footer currentYear={currentYear} />
    </>
  );
}
