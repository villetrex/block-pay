/* eslint-disable */
const fs = require('fs')
const globby = require('globby')

const baseUrl = {
  development: 'http://localhost:4200',
  test: 'https://web-frontend-stage-weu-superpicks.azurewebsites.net',
  production: 'https://superpicks.com',
}[process.env.NODE_ENV];

function addPage(page) {
  const path = page.replace('pages', '').replace('.tsx', '').replace('/index', '').replace('src/', '').replace(/\s*\[.*?\]\s*/g, '');
  const route = path === '/index' ? '' : path;

  return `<url>
    <loc>${`${baseUrl}${route}`}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date()}</lastmod>
  </url>`;
}

async function generateSitemap() {
  const pages = await globby(['src/pages/**/*.tsx', '!src/pages/_*.tsx', '!src/pages/api']);
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${pages.map(addPage).join('\n')}
                  </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
