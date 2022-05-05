import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { getPathsTags, getPropsTags } from 'src/utils/helpers/api';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import { Language } from 'src/utils/interfaces/languages';
import Intro from 'src/components/utils/Intro';
import SEO from 'src/components/utils/SEO';
import Breadcrumbs from 'src/components/utils/Breadcrumbs';
import styles from 'src/styles/modules/utils.module.css';
import { dictTopics } from 'src/utils/dict';
import { DictTopics } from 'src/utils/interfaces/dict';
import Loading from 'src/components/utils/Loading';
import SearchLists from 'src/components/cards/SearchLists';
import { GetStaticPaths, GetStaticProps } from 'next';

type Props = {
  tag: DictTopics;
  blogCards: MdxMetadataCard[];
  projectsCards: MdxMetadataCard[];
  locale: Language;
  locales: string[];
};
const pageKey = 'tags';

const DynamicTag = ({ tag, blogCards, projectsCards, locale, locales }: Props) => {
  const router = useRouter();
  const intl = useIntl();
  const { isFallback } = router;
  if (isFallback) {
    return <Loading />;
  }
  const heading = dictTopics[tag].label[locale];
  const paragraph = dictTopics[tag].description[locale];
  return (
    <>
      <SEO
        pageKey={pageKey}
        asPath={router.asPath}
        description={
          intl.formatMessage({ id: 'dynamicTag', defaultMessage: 'Projects and posts about ' }) +
          dictTopics[tag].label[locale]
        }
        title={heading}
        locale={locale}
        locales={locales}
      />
      <Breadcrumbs pageTitle={heading} />
      <div className={styles.containerMargin}>
        <Intro heading={heading} paragraph={paragraph} />
      </div>
      {(blogCards || projectsCards) && (
        <div className={styles.container}>
          <SearchLists cardsObject={{ blog: blogCards, projects: projectsCards }} locale={locale} />
        </div>
      )}
    </>
  );
};

export default DynamicTag;

export const getStaticProps: GetStaticProps = async ({ locale, locales, params }) => {
  if (!params || !locale || !locales) {
    return { notFound: true };
  } else {
    const props = await getPropsTags(params.tag as string, locale, locales);
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
    const paths = await getPathsTags(locales);
    return {
      paths,
      fallback: true,
    };
  }
};
