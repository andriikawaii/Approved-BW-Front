import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({
  children,
  pageTemplate,
}: {
  children: ReactNode;
  pageTemplate?: string;
}) {
  const currentYear = new Date().getUTCFullYear();
  const isHomeTemplate = pageTemplate?.trim().toLowerCase() === 'home';

  return (
    <>
      {!isHomeTemplate ? <Header /> : null}
      <main>{children}</main>
      {!isHomeTemplate ? <Footer currentYear={currentYear} /> : null}
    </>
  );
}
