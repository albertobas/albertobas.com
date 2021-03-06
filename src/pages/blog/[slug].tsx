import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getPaths, getProps } from 'src/utils/helpers/api';
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
    const props = await getProps(section, params.slug as string, locale, locales);
    if (props === null) {
      return { notFound: true };
    } else {
      return { props };
    }
  }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (!locales) {
    throw new Error('Locales is undefined in getStaticPaths');
  } else {
    const paths = await getPaths(section, locales);
    return {
      paths,
      fallback: true,
    };
  }
};
