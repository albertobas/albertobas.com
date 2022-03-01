import matter from 'gray-matter';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { globby } from 'globby';
import prettier from 'prettier';

async function getTags(section) {
  const contentPath = join(process.cwd(), 'src/_data/mdxs');
  const files = readdirSync(join(contentPath, 'en', section)).filter((path) => /\.mdx?$/.test(path));
  return files.map((fileName) => {
    const source = readFileSync(join(contentPath, 'en', section, fileName), 'utf8');
    const { data, content } = matter(source);
    return {
      tags: data['tags'] + ',' + data['tech'],
    };
  });
}

function getTagsSet(data) {
  return [
    ...new Set(
      data
        .map(function (item) {
          if (typeof item['tags'] != 'undefined') {
            return item['tags']?.split(',');
          } else return;
        })
        .flat()
    ),
  ];
}

async function generateSitemap() {
  const canonical = 'https://www.albertobas.com';
  const tagsBlog = await getTags('blog');
  const tagsProjects = await getTags('projects');
  const tags = getTagsSet([...tagsBlog, ...tagsProjects]);
  const prettierConfig = await prettier.resolveConfig('./.prettierrc');
  const pages = await globby([
    'src/pages/**/*.tsx',
    'src/_data/mdxs/en/**/*.mdx',
    '!src/pages/**/[slug].tsx',
    '!src/pages/**/[tag].tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
    '!src/pages/404.tsx',
  ]);
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${[
          ...pages.map((page) => {
            const path = page
              .replace('src', '')
              .replace('/pages', '')
              .replace('/_data', '')
              .replace('/mdxs', '')
              .replace('/en', '')
              .replace('.tsx', '')
              .replace('.mdx', '');
            const route = path === '/index' ? '' : path;
            return `<url>
                  <loc>${`${canonical}${route}`}</loc>
              </url>
              `;
          }),
          ...tags.map((tag) => {
            return `<url>
                    <loc>${`${canonical}/tags/${tag}`}</loc>
                </url>
                `;
          }),
        ].join('')}
    </urlset>
    `;
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });
  writeFileSync('public/sitemap.xml', formatted);
}

generateSitemap();
