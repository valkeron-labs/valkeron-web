import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';

export async function ContactCTA({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'Contact'});

  return (
    <section id="contact" className="section-spacing scroll-mt-24">
      <div className="container-shell grid gap-10 rounded-[2rem] border border-border/80 bg-primary px-6 py-10 text-primary-foreground sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-12">
        <div className="space-y-5">
          <p className="eyebrow text-primary-foreground/70">Discovery call</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{t('title')}</h2>
          <p className="max-w-xl text-base leading-7 text-primary-foreground/82">{t('subtitle')}</p>
          <Button asChild variant="secondary" size="lg">
            <a href="mailto:juanjo@valkeron.com?subject=Valkeron%20discovery%20call">{t('cta')}</a>
          </Button>
        </div>
        <form className="grid gap-4 rounded-[1.5rem] bg-primary-foreground/6 p-5" aria-label="Contact form">
          <label className="grid gap-2 text-sm">
            <span>{t('fields.name')}</span>
            <input type="text" name="name" className="min-h-11 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 px-4 text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
          </label>
          <label className="grid gap-2 text-sm">
            <span>{t('fields.company')}</span>
            <input type="text" name="company" className="min-h-11 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 px-4 text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
          </label>
          <label className="grid gap-2 text-sm">
            <span>{t('fields.email')}</span>
            <input type="email" name="email" className="min-h-11 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 px-4 text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
          </label>
          <label className="grid gap-2 text-sm">
            <span>{t('fields.challenge')}</span>
            <textarea name="challenge" rows={5} className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/8 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
          </label>
        </form>
      </div>
    </section>
  );
}
