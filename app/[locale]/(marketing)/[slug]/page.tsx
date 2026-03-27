import {notFound} from 'next/navigation';

const postContent = {
  'ai-agents-that-actually-fit-operations': {
    title: 'AI agents that actually fit operations',
    body: 'The right implementation starts with where your team is losing time today: switching systems, chasing context, and manually correlating data that already exists. The agent is not the product. Operational leverage is.',
  },
  'why-integration-beats-ai-in-isolation': {
    title: 'Why integration beats AI in isolation',
    body: 'Disconnected AI creates another dashboard. Integrated AI shortens response times, exposes the right data at the right moment, and helps teams act without changing every underlying system first.',
  },
} as const;

export default async function BlogPostPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {slug} = await params;
  const post = postContent[slug as keyof typeof postContent];

  if (!post) {
    notFound();
  }

  return (
    <article className="section-spacing">
      <div className="container-shell max-w-3xl space-y-8">
        <p className="eyebrow">Insight</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-primary sm:text-5xl">{post.title}</h1>
        <p className="text-lg leading-8 text-muted-foreground">{post.body}</p>
      </div>
    </article>
  );
}
