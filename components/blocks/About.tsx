import {getMessages, getTranslations} from 'next-intl/server';

export async function About({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'About'});
  const messages = await getMessages({locale});
  const differentiators = (messages.About as {differentiators: string[]}).differentiators;

  return (
    <section className="section-spacing border-b border-border/70">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl">{t('title')}</h2>
        </div>
        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-border/80 bg-card p-6 sm:p-8">
            <p className="text-lg leading-8 whitespace-pre-line text-foreground/90">{t('body')}</p>
          </div>
          {differentiators && differentiators.length > 0 && (
            <ul className="space-y-3 rounded-[1.75rem] border border-border/80 bg-card p-6 sm:p-8">
              {differentiators.map((item, index) => (
                <li key={index} className="text-base leading-7 text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
