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
import { getKeySet, shuffle, sortCardList } from 'src/utils/helpers/post';
import { Section } from 'src/utils/interfaces/dict';
import { Headings, MdxMetadataCard, MdxMetadataPost, MdxPost, RelatedPosts } from 'src/utils/interfaces/post';
import { dictCB, dictDS, dictTopics, dictWD } from 'src/utils/dict';

const contentPath = path.join(process.cwd(), 'src/data');

const readDirMdxFiltered = (contentPath: string, locale: string, section: string) => {
  if (locale === 'en') {
    return fs
      .readdirSync(path.join(contentPath, section))
      .filter((path) => path.split('.').length === 2 && /\.mdx?$/.test(path));
  } else {
    const regex = new RegExp('.' + locale + '.mdx?$');
    return fs
      .readdirSync(path.join(contentPath, section))
      .filter((path) => path.split('.').length > 2 && regex.test(path))
      .map((file) => file.replace(`.${locale}`, ''));
  }
};

const getMDX = (source: string) => {
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
            behavior: 'append',
          },
        ],
      ];
      return options;
    },
  });
};

async function getPost(section: string, slug: string, locale: string) {
  try {
    const source = fs.readFileSync(
      path.join(contentPath, section, `${locale === 'en' ? slug : `${slug}.${locale}`}.mdx`),
      'utf-8'
    );
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
      } else if (type.startsWith('### ') && headings.length > 0) {
        headings[headings.length - 1].children.push({
          id,
          title,
        });
      }
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
    } as MdxPost;
  } catch {
    return undefined;
  }
}

export async function getCards(section: Section, locale: string) {
  return readDirMdxFiltered(contentPath, locale, section).map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const source = fs.readFileSync(
      path.join(contentPath, section, `${locale === 'en' ? fileName : `${slug}.${locale}.mdx`}`),
      'utf8'
    );
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
      tags: data.tags ? data.tags : null,
      tech: data.tech ? data.tech : null,
      image: data.image ? data.image : null,
    } as MdxMetadataCard;
  });
}

async function getRelatedPosts(section: Section, reference: RelatedPosts, locale: string) {
  const cards = await getCards(section, locale);
  return shuffle(
    cards.filter((post) => reference.value && post[reference.key] === reference.value && post.slug != reference.slug)
  );
}

export async function getProps(section: Section, slug: string, locale: string, locales: string[]) {
  const post = await getPost(section, slug as string, locale);
  if (!post) {
    return undefined;
  } else {
    const related = await getRelatedPosts(
      section,
      { key: 'field', value: post.frontMatter.field, slug: post.frontMatter.slug },
      locale
    );
    if (section === 'blog') return { post, relatedPosts: related.slice(0, 3), locale, locales };
    else if (section === 'projects') {
      return { post, relatedProjects: related.slice(0, 2), locale, locales };
    } else return undefined;
  }
}

export async function getPaths(section: Section, locales: string[]) {
  const paths: { params: { slug: string; locale: string } }[] = [];
  locales.forEach(function (locale) {
    readDirMdxFiltered(contentPath, locale, section).forEach(function (slug) {
      paths.push({ params: { slug: slug.replace(/\.mdx/, ''), locale: locale } });
    });
  });
  return paths;
}

export async function getPropsTags(tag: string, locale: string, locales: string[]) {
  if (!Object.keys(dictTopics).includes(tag as string)) {
    return undefined;
  }
  const blogCards = await getCards('blog', locale);
  const projectsCards = await getCards('projects', locale);
  const tagRelatedBlogCards = sortCardList(blogCards).filter(
    (post) => post.tags?.split(',').includes(tag as string) || post.tech?.split(',').includes(tag as string)
  );
  const tagRelatedProjectsCards = sortCardList(projectsCards).filter(
    (post) => post.tags?.split(',').includes(tag as string) || post.tech?.split(',').includes(tag as string)
  );
  return { tag, blogCards: tagRelatedBlogCards, projectsCards: tagRelatedProjectsCards, locale, locales };
}

export async function getPathsTags(locales: string[]) {
  const paths: { params: { tag: string; locale: string } }[] = [];
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
        paths.push({
          params: {
            tag: tag,
            locale: locale,
          },
        });
      });
    } else return;
  });
  return paths;
}
