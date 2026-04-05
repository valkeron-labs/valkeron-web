import {getMessages, getTranslations} from 'next-intl/server';

import {GlowCard} from '@/components/ui/GlowCard';

export async function PricingPhilosophy({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'Pricing'});
  const messages = await getMessages({locale});
  const tiers = (messages.Pricing as {tiers: {name: string; price: string; period: string; desc: string}[]}).tiers;

  return (
    <section id="pricing" className="section-spacing border-b border-border/70 scroll-mt-24">
      <div className="container-shell space-y-10">
        <div className="space-y-4">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl">{t('title')}</h2>
        </div>
        <div className="rounded-[1.75rem] border border-border/80 bg-card p-6 sm:p-8 max-w-3xl">
          <p className="text-lg leading-8 whitespace-pre-line text-foreground/90">{t('body')}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <GlowCard key={tier.name} className="flex flex-col justify-between rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-[0_20px_40px_-35px_rgba(10,22,40,0.55)]">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-primary">{tier.name}</h3>
                <p className="text-base leading-7 text-muted-foreground">{tier.desc}</p>
              </div>
              <div className="mt-6 border-t border-border/70 pt-5 space-y-1">
                <p className="text-sm font-semibold text-accent">{tier.price}</p>
                <p className="text-xs text-muted-foreground">{tier.period}</p>
              </div>
            </GlowCard>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">{t('cta')}</p>
      </div>
    </section>
  );
}
