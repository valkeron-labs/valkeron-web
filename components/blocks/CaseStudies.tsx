import {getMessages, getTranslations} from 'next-intl/server';

export async function CaseStudies({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'CaseStudies'});
  const messages = await getMessages({locale});
  const items = (messages.CaseStudies as {items: {title: string; body: string}[]}).items;

  return (
    <section className="section-spacing border-b border-border/70">
      <div className="container-shell space-y-10">
        <div className="space-y-4">
          <p className="eyebrow">Use cases</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl">{t('title')}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-border/80 bg-transparent p-6 transition-colors hover:bg-card/70">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-primary">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
