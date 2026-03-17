import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import TextUsWidget from './TextUsWidget';

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
      <TextUsWidget />
      <Footer currentYear={currentYear} />
    </>
  );
}
