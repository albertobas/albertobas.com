import RSS from 'rss';
import matter from 'gray-matter';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

async function getCards(section) {
  const contentPath = join(process.cwd(), 'src/data');
  const files = readdirSync(join(contentPath, section)).filter((path) => /\.mdx?$/.test(path));
  return files.map((fileName) => {
    const locale = fileName.endsWith('.es.mdx') ? 'es' : 'en';
    const slug = locale === 'en' ? fileName.replace('.mdx', '') : fileName.replace(`.${locale}.mdx`, '');
    const source = readFileSync(join(contentPath, section, fileName), 'utf8');
    const { data, content } = matter(source);
    return {
      section: section,
      slug: slug,
      locale,
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
  const blogCards = await getCards('blog');
  const projectsCards = await getCards('projects');
  for (let card of [...blogCards, ...projectsCards]) {
    const url =
      card.locale === 'en'
        ? canonical + '/' + card.section + '/' + card.slug
        : canonical + '/' + card.locale + '/' + card.section + '/' + card.slug;
    feed.item({
      title: card.title,
      url: url,
      date: card.datePublished,
      description: card.description,
    });
  }
  writeFileSync(join('public', fileName), feed.xml({ indent: true }));
}

generate();
