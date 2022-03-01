import { useIntl } from 'react-intl';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import { Language } from 'src/utils/interfaces/languages';
import { getCards } from 'src/utils/helpers/api';
import SEO from 'src/components/utils/SEO';
import Intro from 'src/components/utils/Intro';
import styles from 'src/styles/modules/utils.module.css';
import { sortCardList } from 'src/utils/helpers/post';
import { dictKeys } from 'src/utils/dict';
import Breadcrumbs from 'src/components/utils/Breadcrumbs';
import SearchList from 'src/components/cards/SearchList';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type Props = {
  cards: MdxMetadataCard[];
  locale: Language;
  locales: string[];
};

const pageKey = 'blog';

const BlogPageAll = ({ cards, locale, locales }: Props) => {
  const asPath = useRouter().asPath;
  const intl = useIntl();
  const heading = dictKeys[pageKey][locale];
  return (
    <>
      <Breadcrumbs
        pageTitle={intl.formatMessage({
          id: 'fullList',
          defaultMessage: 'Full list',
        })}
      />
      <SEO
        pageKey={pageKey}
        asPath={asPath}
        description={intl.formatMessage({
          id: 'blogDescription',
          defaultMessage: 'Blog about cryptography, blockchain and data science',
        })}
        locale={locale}
        locales={locales}
      />
      <div className={styles.containerMargin}>
        <Intro heading={heading} />
      </div>
      <div className={styles.container}>
        <SearchList cards={cards} locale={locale} all />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  if (!locale || !locales) {
    return { notFound: true };
  } else {
    const cards: MdxMetadataCard[] = await getCards(pageKey, locale);
    return {
      props: {
        cards: sortCardList(cards),
        locale,
        locales,
      },
    };
  }
};

export default BlogPageAll;
