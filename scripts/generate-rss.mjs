import RSS from 'rss';
import matter from 'gray-matter';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

async function getCards(section, locale) {
  const contentPath = join(process.cwd(), 'src/_data/mdxs');
  const files = readdirSync(join(contentPath, locale, section)).filter((path) => /\.mdx?$/.test(path));
  return files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const source = readFileSync(join(contentPath, locale, section, fileName), 'utf8');
    const { data, content } = matter(source);
    return {
      section: section,
      slug: slug,
      ...data,
    };
  });
}
async function generate() {
  const siteName = 'Alberto Bas';
  const description = 'A page about blockchain, data science and Web3.';
  const canonical = 'https://www.albertobas.com';
  const fileName = 'rss.xml';
  const feed = new RSS({
    title: siteName,
    description: description,
    site_url: canonical,
    feed_url: canonical + '/' + fileName,
  });
  await Promise.all(
    ['en', 'es'].map(async (locale) => {
      const blogCards = await getCards('blog', locale);
      const projectsCards = await getCards('projects', locale);
      for (let card of [...blogCards, ...projectsCards]) {
        const url =
          locale === 'en'
            ? canonical + '/' + card.section + '/' + card.slug
            : canonical + '/' + locale + '/' + card.section + '/' + card.slug;
        feed.item({
          title: card.title,
          url: url,
          date: card.datePublished,
          description: card.description,
        });
      }
    })
  );
  writeFileSync(join('public', fileName), feed.xml({ indent: true }));
}

generate();
