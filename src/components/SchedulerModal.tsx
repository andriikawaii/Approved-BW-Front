'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import ConsultationModal from '@/src/components/layouts/ConsultationModal';

type SchedulerContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const SchedulerContext = createContext<SchedulerContextValue | null>(null);

export function useScheduler(): SchedulerContextValue {
  const ctx = useContext(SchedulerContext);
  if (!ctx) {
    return { open: () => {}, close: () => {}, isOpen: false };
  }
  return ctx;
}

const FREE_CONSULTATION_PATH = '/free-consultation/';

export function SchedulerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (
        href === FREE_CONSULTATION_PATH ||
        href === FREE_CONSULTATION_PATH.replace(/\/$/, '') ||
        href.endsWith(FREE_CONSULTATION_PATH) ||
        href.endsWith(FREE_CONSULTATION_PATH.replace(/\/$/, ''))
      ) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || (e as MouseEvent).button === 1) return;
        e.preventDefault();
        open();
      }
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [open]);

  return (
    <SchedulerContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ConsultationModal open={isOpen} onClose={close} />
    </SchedulerContext.Provider>
  );
}
