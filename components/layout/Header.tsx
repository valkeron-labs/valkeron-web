import Image from 'next/image';
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

import {LocaleSwitcher} from './LocaleSwitcher';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {Button} from '@/components/ui/button';

export async function Header({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'Nav'});

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-sm">
      <div className="container-shell flex min-h-18 items-center justify-between gap-4 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <Image src="/logo-dark.png" alt="Valkeron" width={28} height={28} className="dark:hidden" />
          <Image src="/logo-white.png" alt="Valkeron" width={28} height={28} className="hidden dark:block" />
          <span className="text-lg font-semibold tracking-[0.16em] text-primary uppercase">Valkeron</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <Link href={`/${locale}#services`} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('services')}</Link>
          <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('insights')}</Link>
          <Button asChild size="sm">
            <Link href={`/${locale}#contact`}>{t('contact')}</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
