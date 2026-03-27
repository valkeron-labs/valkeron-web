import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {Footer} from '@/components/layout/Footer';
import {Header} from '@/components/layout/Header';
import {MouseGlow} from '@/components/ui/MouseGlow';
import {ThemeProvider} from '@/components/ui/theme-provider';
import {routing} from '@/i18n/routing';

export const metadata: Metadata = {
  metadataBase: new URL('https://valkeron.com'),
  title: {
    default: 'Valkeron',
    template: '%s | Valkeron',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <MouseGlow />
        <div className="flex min-h-screen flex-col">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-foreground">Skip to content</a>
          <Header locale={locale} />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
