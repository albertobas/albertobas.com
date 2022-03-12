import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getPost, getRelatedPosts, getSlugsAndLocales } from 'src/utils/helpers/api';
import { MdxPost, MdxMetadataCard } from 'src/utils/interfaces/post';
import { Language } from 'src/utils/interfaces/languages';
import BlogPost from 'src/components/layouts/BlogPost';
import {
  componentsBlog,
  componentsBlogDS,
  componentsBlogDSLong,
  componentsBlogLong,
} from 'src/components/MDX/MDXComponents';
import Loading from 'src/components/utils/Loading';
import { GetStaticPaths, GetStaticProps } from 'next';
const MDX = dynamic(() => import('src/components/MDX/MDX'));

type Props = {
  post: MdxPost;
  relatedPosts: MdxMetadataCard[];
  locale: Language;
  locales: string[];
};
const section = 'blog';

const DynamicBlogPost = ({ post, relatedPosts, locale, locales }: Props) => {
  const router = useRouter();
  const { isFallback } = router;
  if (isFallback) {
    return <Loading />;
  }
  return (
    <BlogPost
      headings={post.headings}
      relatedPosts={relatedPosts}
      locale={locale}
      locales={locales}
      {...post.frontMatter}
    >
      <MDX
        code={post.code}
        components={
          post.frontMatter.readingTime.minutes > 15
            ? post.frontMatter.topic === 'data-science'
              ? componentsBlogDSLong
              : componentsBlogLong
            : post.frontMatter.topic === 'data-science'
            ? componentsBlogDS
            : componentsBlog
        }
      />
    </BlogPost>
  );
};

export default DynamicBlogPost;

export const getStaticProps: GetStaticProps = async ({ locale, locales, params }) => {
  if (!params || !locale || !locales) {
    return { notFound: true };
  } else {
    const post: MdxPost | undefined = await getPost(section, params.slug as string, locale);
    if (!post) {
      return { notFound: true };
    } else {
      const relatedPosts = await getRelatedPosts(
        section,
        { key: 'field', value: post.frontMatter.field, slug: post.frontMatter.slug },
        locale
      );
      return {
        props: { post, relatedPosts: relatedPosts.slice(0, 3), locale, locales },
      };
    }
  }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (!locales) {
    throw new Error('Locales is undefined in getStaticPaths');
  } else {
    const slugsAndLocales = await getSlugsAndLocales(section, locales);

    return {
      paths: slugsAndLocales.map((slugAndLocale) => {
        return {
          params: {
            slug: slugAndLocale.slug.replace(/\.mdx/, ''),
            locale: slugAndLocale.locale,
          },
        };
      }),
      fallback: true,
    };
  }
};
