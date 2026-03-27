const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export async function fetchStrapi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}`, 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
    ...options,
  });
  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${path}`);
  return (await res.json()).data;
}
