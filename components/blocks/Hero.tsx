import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';


export async function Hero({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'Hero'});

  return (
    <section className="section-spacing relative overflow-hidden border-b border-border/70">
      {/* Particle background handled at layout level */}
      <div className="container-shell relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="max-w-3xl space-y-8">
          <p className="eyebrow">{t('eyebrow')}</p>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance text-primary sm:text-6xl lg:text-7xl">{t('headline')}</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{t('subheadline')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/${locale}#contact`}>{t('ctaPrimary')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${locale}#services`}>{t('ctaSecondary')}</Link>
            </Button>
          </div>
        </div>
        <aside className="rounded-[1.75rem] border border-border/80 bg-card/80 p-6 shadow-[0_20px_60px_-30px_rgba(10,22,40,0.45)] backdrop-blur-sm">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t('signalMap.title')}</p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between border-b border-border/60 pb-3"><span>ERP</span><span className="text-foreground">{t('signalMap.erp')}</span></div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3"><span>CRM</span><span className="text-foreground">{t('signalMap.crm')}</span></div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3"><span>NOC</span><span className="text-foreground">{t('signalMap.noc')}</span></div>
              <div className="flex items-center justify-between"><span>Agents</span><span className="text-foreground">{t('signalMap.agents')}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
