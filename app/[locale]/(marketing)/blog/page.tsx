import {getTranslations} from 'next-intl/server';

const posts = [
  {
    slug: 'ai-agents-that-actually-fit-operations',
    date: '2026-03-01',
  },
  {
    slug: 'why-integration-beats-ai-in-isolation',
    date: '2026-03-14',
  },
];

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Blog'});

  return (
    <section className="section-spacing">
      <div className="container-shell max-w-4xl space-y-10">
        <div className="space-y-4 border-b border-border/70 pb-8">
          <p className="eyebrow">Insights</p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-primary sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{t('description')}</p>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <a key={post.slug} href={`/${locale}/${post.slug}`} className="block rounded-[1.5rem] border border-border/80 bg-card p-6 transition-colors hover:bg-secondary/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <p className="text-sm uppercase tracking-[0.2em] text-accent">{post.date}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-primary">{post.slug.replaceAll('-', ' ')}</h2>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
