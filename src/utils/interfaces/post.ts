import { ReadTimeResults } from 'reading-time';
import { Item, ItemExtended } from 'src/utils/interfaces/architecture';
import { Section, Topic } from 'src/utils/interfaces/dict';

export type MdxMetadataPost = {
  slug: string;
  title: string;
  section: Section;
  topic: Topic;
  field: string;
  description: string;
  readingTime: ReadTimeResults;
  datePublished: string;
  introduction?: string;
  tags?: string;
  tech?: string;
  image?: { name: string; height: number; width: number };
  oGImage?: { name: string; height: number; width: number };
  dateModified?: string;
  github?: { repo: string; file?: string };
  link?: string;
};

export type MdxPost = {
  code: string;
  frontMatter: MdxMetadataPost;
  headings: Headings[];
};

export type MdxMetadataCard = {
  slug: string;
  title: string;
  topic: Topic;
  section: string;
  field: string;
  description: string;
  readingTime: ReadTimeResults;
  datePublished: string;
  tags?: string;
  tech?: string;
  image?: { name: string; height: number; width: number };
  dateModified?: string;
};

export type Filter = {
  key: keyof MdxMetadataPost;
  filter: Item[] | null;
};

export type FilterTag = {
  key: keyof ItemExtended;
  filter: Item | null;
};

export type Headings = {
  id: string | null;
  title: string | null;
  children: { id: string | null; title: string | null }[];
};

export type RelatedPosts = {
  key: keyof MdxMetadataCard;
  value: string | undefined;
  slug: string;
};

export type CardListObject = { blog: MdxMetadataCard[]; projects: MdxMetadataCard[] };
