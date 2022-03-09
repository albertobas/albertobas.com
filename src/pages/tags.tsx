import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import Intro from 'src/components/utils/Intro';
import SEO from 'src/components/utils/SEO';
import { getCards } from 'src/utils/helpers/api';
import { getItemsFromCards, sortItemArray } from 'src/utils/helpers/post';
import { ItemExtended } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import SearchListTags from 'src/components/tags/SearchListTags';
import styles from 'src/styles/modules/utils.module.css';
import { dictKeys } from 'src/utils/dict';
import { useCloseMobile } from 'src/utils/hooks';
import { GetStaticProps, NextPage } from 'next';

type Props = {
  tags: ItemExtended[];
  locale: Language;
  locales: string[];
};

const pageKey = 'tags';

const TagsPage: NextPage<Props> = ({ tags, locale, locales }) => {
  useCloseMobile();
  const asPath = useRouter().asPath;
  const intl = useIntl();
  return (
    <>
      <SEO
        pageKey={pageKey}
        asPath={asPath}
        description={intl.formatMessage({
          id: 'tagsDescription',
          defaultMessage: 'Tags about cryptography, blockchain and data science',
        })}
        locale={locale}
        locales={locales}
      />
      <div className={styles.containerMargin}>
        <Intro heading={dictKeys[pageKey][locale]} />
      </div>
      <div className={styles.container}>
        <SearchListTags tags={tags} locale={locale} />
      </div>
    </>
  );
};

export default TagsPage;

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  if (!locale || !locales) {
    return { notFound: true };
  } else {
    const blogCards = await getCards('blog', locale);
    const projectsCards = await getCards('projects', locale);
    const tags = getItemsFromCards([...blogCards, ...projectsCards], pageKey, locale as Language) as ItemExtended[];
    const tech = getItemsFromCards([...blogCards, ...projectsCards], 'tech', locale as Language) as ItemExtended[];
    return {
      props: {
        tags: [...tags, ...tech].sort(sortItemArray),
        locale,
        locales,
      },
    };
  }
};
