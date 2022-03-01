import readingTime from 'reading-time';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import Slugger from 'github-slugger';
import rehypePrism from 'rehype-prism-plus';
import { bundleMDX } from 'mdx-bundler';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { getKeySet, shuffle } from 'src/utils/helpers/post';
import { DictKeys, Section } from 'src/utils/interfaces/dict';
import { Headings, MdxMetadataCard, MdxMetadataPost, SimilarPosts } from 'src/utils/interfaces/post';
import { dictCB, dictDS, dictWD } from 'src/utils/dict';

const contentPath = path.join(process.cwd(), 'src/_data/mdxs');

const readDirMdxFiltered = (contentPath: string, locale: string, section: string) => {
  return fs.readdirSync(path.join(contentPath, locale, section)).filter((path) => /\.mdx?$/.test(path));
};
export async function getCards(section: Section, locale: string) {
  return readDirMdxFiltered(contentPath, locale, section).map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const source = fs.readFileSync(path.join(contentPath, locale, section, fileName), 'utf8');
    const { data, content } = matter(source);
    return {
      slug: slug,
      title: data.title,
      section: section,
      topic: data.field
        ? Object.keys(dictCB).includes(data.field)
          ? 'crypto-blockchain'
          : Object.keys(dictDS).includes(data.field)
          ? 'data-science'
          : Object.keys(dictWD).includes(data.field)
          ? 'web-development'
          : null
        : null,
      field: data.field,
      description: data.description,
      readingTime: readingTime(source),
      datePublished: data.datePublished,
      dateModified: data.dateModified ? data.dateModified : null,
      approach: data.approach ? data.approach : null,
      tags: data.tags ? data.tags : null,
      tech: data.tech ? data.tech : null,
      image: data.image ? data.image : null,
    } as MdxMetadataCard;
  });
}
export const getMDX = (source: string) => {
  return bundleMDX({
    source: source,
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true }],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hashAnchor'],
            },
          },
        ],
      ];
      return options;
    },
  });
};
export async function getPost(section: string, slug: string, locale: string) {
  try {
    const source = fs.readFileSync(path.join(contentPath, locale, section, `${slug}.mdx`), 'utf-8');
    const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm');
    const headings: Headings[] = [];
    const matches = source.matchAll(regexp);
    const slugs = new Slugger();
    for (let match of matches) {
      const type = match[1];
      const title = match[2];
      const id = slugs.slug(title);
      if (type.startsWith('## ')) {
        headings.push({ id, title, children: [] });
      } /*else if (type.startsWith('### ') && headings.length > 0) {
      headings[headings.length - 1].children.push({
        id,
        title,
      });
    }*/
    }
    const { code, frontmatter } = await getMDX(source);
    if (frontmatter.introduction) {
      frontmatter.introduction = (await getMDX(frontmatter.introduction)).code;
    }
    return {
      code,
      frontMatter: {
        section,
        topic: frontmatter.field
          ? Object.keys(dictCB).includes(frontmatter.field)
            ? 'crypto-blockchain'
            : Object.keys(dictDS).includes(frontmatter.field)
            ? 'data-science'
            : null
          : null,
        slug,
        readingTime: readingTime(source),
        ...frontmatter,
      } as MdxMetadataPost,
      headings,
    };
  } catch {
    return undefined;
  }
}
export async function getSimilarPosts(section: Section, reference: SimilarPosts, locale: string) {
  const cards = await getCards(section, locale);
  return shuffle(
    cards.filter((post) => reference.value && post[reference.key] === reference.value && post.slug != reference.slug)
  );
}
export async function getSlugsAndLocales(section: DictKeys, locales: string[]) {
  const slugsAndLocales: { slug: string; locale: string }[] = [];
  locales.forEach(function (locale) {
    readDirMdxFiltered(contentPath, locale, section).forEach(function (slug) {
      slugsAndLocales.push({ slug: slug, locale: locale });
    });
  });
  return slugsAndLocales;
}
export async function getTagsLocales(locales: string[]) {
  const tagsLocales: { tag: string; locale: string }[] = [];
  locales.map(async (locale) => {
    const blogCards: MdxMetadataCard[] = [];
    const projectsCards: MdxMetadataCard[] = [];
    blogCards.push(...(await getCards('blog', locale)));
    projectsCards.push(...(await getCards('projects', locale)));
    const tags = getKeySet([...blogCards, ...projectsCards], 'tags');
    const tech = getKeySet([...blogCards, ...projectsCards], 'tech');
    const source = tags && tech ? [...tags, ...tech] : tags ? tags : tech ? tech : undefined;
    if (source) {
      source.map((tag) => {
        tagsLocales.push({
          tag: tag,
          locale: locale,
        });
      });
    } else return;
  });
  return tagsLocales;
}
