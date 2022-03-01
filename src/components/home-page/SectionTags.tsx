import { ItemExtended } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import styles from 'src/styles/modules/pages/home.module.css';
import Tag from 'src/components/tags/Tag';
import ILink from 'src/components/utils/ILink';

type Props = {
  heading: string;
  tags: ItemExtended[];
  locale: Language;
  upperbound?: number;
};

const SectionTags = ({ tags, heading, upperbound }: Props) => {
  return (
    <>
      <h2>
        <ILink href={'/tags'} className={styles.view}>
          {heading}
        </ILink>
      </h2>
      <nav role="navigation" className={styles.nav}>
        <ul className={styles.layoutTags}>
          {(upperbound ? tags.slice(0, upperbound) : tags).map((tag) => (
            <li key={tag.value}>
              <Tag tag={tag} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SectionTags;
