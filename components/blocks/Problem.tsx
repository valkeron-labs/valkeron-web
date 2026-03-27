import {getMessages, getTranslations} from 'next-intl/server';

export async function Problem({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'Problem'});
  const messages = await getMessages({locale});
  const items = (messages.Problem as {items: string[]}).items;

  return (
    <section className="section-spacing border-b border-border/70">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">Operational friction</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl">{t('title')}</h2>
        </div>
        <ul className="space-y-4" role="list">
          {items.map((item, index) => (
            <li key={item} className="grid gap-3 border-t border-border/70 py-5 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr] sm:items-start">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">0{index + 1}</span>
              <p className="max-w-3xl text-lg leading-8 text-foreground/90">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
