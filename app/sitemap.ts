import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {url: 'https://valkeron.com/en', lastModified: new Date()},
    {url: 'https://valkeron.com/es', lastModified: new Date()},
    {url: 'https://valkeron.com/en/blog', lastModified: new Date()},
    {url: 'https://valkeron.com/es/blog', lastModified: new Date()},
  ];
}
