import fs from 'fs';
import { getEntries } from 'services/api/entries/entries';

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const entries = await getEntries();

  const getPriority = (page) => {
    switch (page) {
      case 'index.tsx':
      case 'articles.tsx':
      case 'reviews.tsx':
      case 'search.tsx':
        return '1.0';
      default:
        return '0.3';
    }
  };

  const getFreq = (page) => {
    switch (page) {
      case 'index.tsx':
      case 'articles.tsx':
      case 'reviews.tsx':
      case 'search.tsx':
        return 'daily';
      default:
        return 'yearly';
    }
  };

  const getLastUpdated = (page) => {
    switch (page) {
      case 'index.tsx':
      case 'search.tsx':
        return new Date(entries.data[0].LastUpdated).toISOString();
      case 'articles.tsx':
        const article = entries.data.find(i => i.EntryType === 'article');
        return new Date(article.LastUpdated).toISOString();
      case 'reviews.tsx':
        const review = entries.data.find(i => i.EntryType === 'review');
        return new Date(review.LastUpdated).toISOString();
      default:
        // Add manually for pages that are rarely updated
        return '2022-09-15T02:40:27.046Z';
    }
  };

  const staticPaths = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return ![
        '_app.tsx',
        '_document.tsx',
        'admin',
        'entry',
        'sitemap.xml.js',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return {
        url: `${process.env.NEXT_PUBLIC_HOSTNAME}/${staticPagePath}`,
        lastUpdated: getLastUpdated(staticPagePath),
        freq: getFreq(staticPagePath),
        priority: getPriority(staticPagePath),
      };
    });

  const dynamicPaths = entries.data.map((entry) => {
    return {
      url: `${process.env.NEXT_PUBLIC_HOSTNAME}/entry/${entry.PK}`,
      lastUpdated: new Date(entry.LastUpdated).toISOString(),
      freq: 'daily',
      priority: '1.0',
    };
  });

  const allPaths = [...staticPaths, ...dynamicPaths]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
          .map((item) => {
            return `
              <url>
                <loc>${item.url}</loc>
                <lastmod>${item.lastUpdated}</lastmod>
                <changefreq>${item.freq}</changefreq>
                <priority>${item.priority}</priority>
              </url>
            `;
          })
          .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;