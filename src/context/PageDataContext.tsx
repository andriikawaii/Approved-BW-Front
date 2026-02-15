'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { FooterVariant } from '../../lib/footer';
import type { PhoneItem } from '../../lib/phones';

type PageDataContextValue = {
  footerVariant: FooterVariant;
  phones: PhoneItem[];
};

const defaultValue: PageDataContextValue = {
  footerVariant: 'A',
  phones: [],
};

const PageDataContext = createContext<PageDataContextValue>(defaultValue);

export function PageDataProvider({
  footerVariant,
  phones,
  children,
}: PageDataContextValue & { children: ReactNode }) {
  return (
    <PageDataContext.Provider value={{ footerVariant, phones }}>
      {children}
    </PageDataContext.Provider>
  );
}

export function usePageData() {
  return useContext(PageDataContext);
}
