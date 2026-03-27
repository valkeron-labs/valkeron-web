'use client';

import Link from 'next/link';
import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';

const locales = ['en', 'es'] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const rest = segments.slice(1).join('/');

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background p-1 text-sm">
      {locales.map((nextLocale) => {
        const href = `/${nextLocale}${rest ? `/${rest}` : ''}`;
        const active = locale === nextLocale;

        return (
          <Link
            key={nextLocale}
            href={href}
            className={active ? 'rounded-full bg-primary px-3 py-1.5 text-primary-foreground' : 'rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground'}
            hrefLang={nextLocale}
          >
            {nextLocale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
