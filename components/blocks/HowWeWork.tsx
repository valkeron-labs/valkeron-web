import {getMessages, getTranslations} from 'next-intl/server';

import {GlowCard} from '@/components/ui/GlowCard';

export async function HowWeWork({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'HowWeWork'});
  const messages = await getMessages({locale});
  const phases = (messages.HowWeWork as {phases: {number: string; title: string; body: string}[]}).phases;

  return (
    <section id="how-we-work" className="section-spacing border-b border-border/70 scroll-mt-24">
      <div className="container-shell space-y-10">
        <div className="space-y-4">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('subtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((phase) => (
            <GlowCard key={phase.number} className="flex flex-col rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-[0_20px_40px_-35px_rgba(10,22,40,0.55)]">
              <p className="text-5xl font-bold tracking-tight text-muted-foreground/20 select-none mb-4">{phase.number}</p>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-primary">{phase.title}</h3>
                <p className="text-base leading-7 text-muted-foreground">{phase.body}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
