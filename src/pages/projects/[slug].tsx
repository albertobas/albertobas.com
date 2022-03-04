import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getPost, getSimilarPosts, getSlugsAndLocales } from 'src/utils/helpers/api';
import { MdxPost, MdxMetadataCard } from 'src/utils/interfaces/post';
import { Language } from 'src/utils/interfaces/languages';
import { componentsProjects } from 'src/components/MDX/MDXComponents';
import ProjectsPost from 'src/components/layouts/ProjectsPost';
import Loading from 'src/components/utils/Loading';
import { GetStaticPaths, GetStaticProps } from 'next';
const MDX = dynamic(() => import('src/components/MDX/MDX'));

type Props = {
  post: MdxPost;
  relatedProjects: MdxMetadataCard[];
  locale: Language;
  locales: string[];
};
const section = 'projects';

const DynamicProjectsPost = ({ post, relatedProjects, locale, locales }: Props) => {
  const router = useRouter();
  const { isFallback } = router;
  if (isFallback) {
    return <Loading />;
  }
  return (
    <ProjectsPost
      headings={post.headings}
      relatedProjects={relatedProjects}
      locale={locale}
      locales={locales}
      {...post.frontMatter}
    >
      <MDX code={post.code} components={componentsProjects} />
    </ProjectsPost>
  );
};

export default DynamicProjectsPost;

export const getStaticProps: GetStaticProps = async ({ locale, locales, params }) => {
  if (!params || !locale || !locales) {
    return { notFound: true };
  } else {
    const post: MdxPost | undefined = await getPost(section, params.slug as string, locale);
    if (!post) {
      return { notFound: true };
    } else {
      const relatedProjects = await getSimilarPosts(
        section,
        { key: 'field', value: post.frontMatter.field, slug: post.frontMatter.slug },
        locale
      );
      return {
        props: { post, relatedProjects: relatedProjects.slice(0, 2), locale, locales },
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
