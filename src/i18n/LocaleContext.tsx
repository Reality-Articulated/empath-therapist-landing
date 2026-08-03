import { createContext, useContext, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Locale } from './locales';

const LocaleContext = createContext<Locale>('en');

export const useLocale = () => useContext(LocaleContext);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Route-shell element: provides the locale to everything under a prefix. */
export function LocaleShell({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Outlet />
    </LocaleProvider>
  );
}
