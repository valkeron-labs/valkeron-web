import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

export async function Footer({locale}: {locale: string}) {
  const footer = await getTranslations({locale, namespace: 'Footer'});
  const nav = await getTranslations({locale, namespace: 'Nav'});

  return (
    <footer className="border-t border-border/80 bg-primary text-primary-foreground">
      <div className="container-shell flex flex-col gap-8 py-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">Valkeron</p>
          <p className="text-sm leading-6 text-primary-foreground/82">{footer('tagline')}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-primary-foreground/82">
          <Link href={`/${locale}#services`} className="transition-colors hover:text-primary-foreground">{nav('services')}</Link>
          <Link href={`/${locale}/blog`} className="transition-colors hover:text-primary-foreground">{nav('insights')}</Link>
          <Link href={`/${locale}#contact`} className="transition-colors hover:text-primary-foreground">{nav('contact')}</Link>
          <Link href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary-foreground">LinkedIn</Link>
        </nav>
      </div>
    </footer>
  );
}
