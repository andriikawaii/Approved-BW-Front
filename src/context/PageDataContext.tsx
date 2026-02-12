'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PagePhones, PageFooter } from '../types/page';

type PageDataContextValue = {
  phones: PagePhones;
  footer: PageFooter;
};

const defaultValue: PageDataContextValue = {
  phones: { mode: '', items: [] },
  footer: {},
};

const PageDataContext = createContext<PageDataContextValue>(defaultValue);

export function PageDataProvider({
  phones,
  footer,
  children,
}: PageDataContextValue & { children: ReactNode }) {
  return (
    <PageDataContext.Provider value={{ phones, footer }}>
      {children}
    </PageDataContext.Provider>
  );
}

export function usePageData() {
  return useContext(PageDataContext);
}
