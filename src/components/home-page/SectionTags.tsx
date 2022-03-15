import { ItemExtended } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import styles from 'src/styles/modules/pages/home.module.css';
import ILink from 'src/components/utils/ILink';
import Tags from 'src/components/tags/Tags';

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
      <nav role="navigation" className={styles.layoutTags}>
        <Tags tags={upperbound ? tags.slice(0, upperbound) : tags} />
      </nav>
    </>
  );
};

export default SectionTags;
