import styles from 'src/styles/modules/pages/home.module.css';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import { Language } from 'src/utils/interfaces/languages';
import CardBlogMini from 'src/components/cards/CardBlogMini';
import CardProjects from 'src/components/cards/CardProjects';
import ILink from 'src/components/utils/ILink';
import { Section } from 'src/utils/interfaces/dict';

type Props = {
  cards: MdxMetadataCard[];
  section: Section;
  heading: string;
  locale: Language;
  paragraph?: JSX.Element;
  isLinkDisabled?: boolean;
};

const SectionCards = ({ cards, section, heading, paragraph, locale, isLinkDisabled }: Props) => {
  return (
    <>
      <h2>
        {isLinkDisabled ? (
          heading
        ) : (
          <ILink href={'/' + section} className={styles.view}>
            {heading}
          </ILink>
        )}
      </h2>
      <p>{paragraph}</p>
      <div className={section === 'blog' ? styles.layoutBlog : styles.layoutProjects}>
        {cards.map((post) => {
          return section === 'blog' ? (
            <CardBlogMini key={post.slug} locale={locale} {...post} />
          ) : (
            <CardProjects key={post.slug} {...post} />
          );
        })}
      </div>
    </>
  );
};

export default SectionCards;
