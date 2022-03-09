import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FormattedMessage } from 'react-intl';
import { useCloseMobile } from 'src/utils/hooks';
import { Language } from 'src/utils/interfaces/languages';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import { getCards } from 'src/utils/helpers/api';
import SEO from 'src/components/utils/SEO';
import { getItemsFromCards, sortCardList, sortItemArray } from 'src/utils/helpers/post';
import { ItemExtended } from 'src/utils/interfaces/architecture';
import styles from 'src/styles/modules/pages/home.module.css';
import { dictKeys } from 'src/utils/dict';
import SectionCards from 'src/components/home-page/SectionCards';
import { GetStaticProps } from 'next';
import ILink from 'src/components/utils/ILink';
const SectionTags = dynamic(() => import('src/components/home-page/SectionTags'));

type Props = {
  blogCards: MdxMetadataCard[];
  projectsCards: MdxMetadataCard[];
  tags: ItemExtended[];
  locale: Language;
  locales: Language[];
};
const HomePage = ({ blogCards, projectsCards, tags, locale, locales }: Props) => {
  useCloseMobile();
  return (
    <>
      <SEO pageKey={'home'} locale={locale} locales={locales} />
      <div className={styles.me}>
        <h1 id={styles.title}>
          <FormattedMessage id="introSectionH1" defaultMessage="A page about blockchain, data science and Web3" />
        </h1>
        <p>
          <FormattedMessage
            id="introSectionP"
            defaultMessage="Hi!, I'm Alberto Bas, a DeFi developer and telecommunications technical engineer by training. I post in this page some <projects></projects> and <blog></blog> about cryptography, blockchain, 
            and data science."
            values={{
              blog: () => (
                <ILink className={styles.internal} href="/blog">
                  <FormattedMessage id="introSectionPBlog" defaultMessage="articles" />
                </ILink>
              ),
              projects: () => (
                <ILink className={styles.internal} href="/projects">
                  <FormattedMessage id="introSectionPProjects" defaultMessage="projects" />
                </ILink>
              ),
            }}
          />
        </p>
      </div>
      <section className={styles.containerMargin}>
        <SectionCards cards={blogCards} section="blog" heading={dictKeys['blog'][locale]} locale={locale} />
      </section>
      <section className={styles.containerMargin}>
        <SectionCards cards={projectsCards} section="projects" heading={dictKeys['projects'][locale]} locale={locale} />
      </section>
      <section className={styles.containerMargin}>
        <SectionTags tags={tags} heading={dictKeys.tags[locale]} upperbound={undefined} locale={locale} />
      </section>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  if (!locale || !locales) {
    return { notFound: true };
  } else {
    const blogCards = await getCards('blog', locale);
    const projectsCards = await getCards('projects', locale);
    const tags = getItemsFromCards([...blogCards, ...projectsCards], 'tags', locale as Language) as ItemExtended[];
    const tech = getItemsFromCards([...blogCards, ...projectsCards], 'tech', locale as Language) as ItemExtended[];
    return {
      props: {
        blogCards: sortCardList(blogCards).slice(0, 6),
        projectsCards: sortCardList(projectsCards).slice(0, 4),
        tags: [...tags, ...tech].sort(sortItemArray),
        locale: locale,
        locales: locales,
      },
    };
  }
};
