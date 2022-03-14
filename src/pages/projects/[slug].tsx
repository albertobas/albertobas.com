import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getPaths, getProps } from 'src/utils/helpers/api';
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
    const props = await getProps(section, params.slug as string, locale, locales);
    if (!props) {
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
