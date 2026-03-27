import {getTranslations} from 'next-intl/server';

export async function About({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'About'});

  return (
    <section className="section-spacing border-b border-border/70">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          <p className="eyebrow">Why Valkeron</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl">{t('title')}</h2>
        </div>
        <div className="rounded-[1.75rem] border border-border/80 bg-card p-6 sm:p-8">
          <p className="text-lg leading-8 whitespace-pre-line text-foreground/90">{t('body')}</p>
        </div>
      </div>
    </section>
  );
}
