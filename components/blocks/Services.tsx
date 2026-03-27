import {getMessages, getTranslations} from 'next-intl/server';

export async function Services({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'Services'});
  const messages = await getMessages({locale});
  const services = (messages.Services as {
    diagnosis: {name: string; desc: string; price: string};
    implementation: {name: string; desc: string; price: string};
    retainer: {name: string; desc: string; price: string};
  });

  const cards = [services.diagnosis, services.implementation, services.retainer];

  return (
    <section id="services" className="section-spacing border-b border-border/70 scroll-mt-24">
      <div className="container-shell space-y-10">
        <div className="space-y-4">
          <p className="eyebrow">Engagement model</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl">{t('title')}</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {cards.map((service, index) => (
            <article key={service.name} className="flex h-full flex-col justify-between rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-[0_20px_40px_-35px_rgba(10,22,40,0.55)]">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">0{index + 1}</p>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-primary">{service.name}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{service.desc}</p>
                </div>
              </div>
              <p className="mt-8 border-t border-border/70 pt-5 text-sm font-medium text-foreground">{service.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
