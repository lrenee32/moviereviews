import fs from 'fs';
import { getEntries } from 'services/api/entries/entries';

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const entries = await getEntries();

  const staticPaths = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return ![
        '_app.tsx',
        '_document.tsx',
        'admin',
        'entry',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return {
        url: `${process.env.NEXT_PUBLIC_HOSTNAME}/${staticPagePath}`,
        lastUpdated: ,
        freq: ,
        priority: ,
      };
    });

  const dynamicPaths = entries.map((entry) => {
    return {
      url: `${process.env.NEXT_PUBLIC_HOSTNAME}/entry/${entry.PK}`,
      lastUpdated: entry.LastUpdated,
      freq: ,
      priority: '0.7',
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