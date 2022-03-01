import { memo } from 'react';
import styles from 'src/styles/modules/components/cards/cardprojects.module.css';
import { join } from 'path';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import Image from 'next/image';
import ILink from 'src/components/utils/ILink';
import { FormattedMessage } from 'react-intl';

export default memo(function CardProjects({ section, title, slug, description, image }: MdxMetadataCard) {
  const href = join('/', section, slug);
  return (
    <div className={styles.layout}>
      {image && (
        <ILink href={href} aria-label={slug}>
          <div className={styles.imgWrapper}>
            <Image
              src={`/images/${slug}/${image.name}`}
              className={styles.img}
              alt={title}
              layout="fill"
              objectFit={'cover'}
              quality={100}
            />
          </div>
        </ILink>
      )}
      <div className={styles.description}>
        <div>
          <h3>
            <ILink href={href}>{title}</ILink>
          </h3>
          {description && <p>{description}</p>}
        </div>
        <ILink href={href} className={styles.view} aria-label={`Link to ${slug}`}>
          <FormattedMessage id="learnMore" defaultMessage="Learn more" aria-label={`Link to ${slug}`} /> &rarr;
        </ILink>
      </div>
    </div>
  );
});
