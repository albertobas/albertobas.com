import { memo } from 'react';
import Link from 'next/link';
import styles from 'src/styles/modules/components/cards/cardblogmini.module.css';
import { dictTopics } from 'src/utils/dict';
import { Language } from 'src/utils/interfaces/languages';
import { shortenText } from 'src/utils/helpers/post';
import SVG from 'src/components/utils/SVG';
import { dictIcons, IconList } from 'src/components/utils/SVG';
import { join } from 'path';
import { DictTopics } from 'src/utils/interfaces/dict';
import { programmingLangs } from 'src/utils/constants';
import Tooltip from 'src/components/utils/Tooltip';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import ILink from 'src/components/utils/ILink';
import DateFormatter from 'src/components/utils/DateFormatter';

type Props = MdxMetadataCard & { locale: Language };

export default memo(function CardBlogMini({
  section,
  field,
  title,
  slug,
  description,
  tech,
  datePublished,
  dateModified,
  locale,
}: Props) {
  return (
    <div className={styles.layout}>
      <div>
        {field && <p className={styles.field}>{dictTopics[field as DictTopics]?.label[locale]}</p>}
        <h3>
          <ILink href={join('/', section, slug)}>{title}</ILink>
        </h3>
        {description && <p className={styles.description}>{shortenText(description)}</p>}
      </div>
      {(datePublished || dateModified) && (
        <div className={styles.date}>
          <DateFormatter dateString={dateModified ? dateModified : datePublished} locale={locale} />
        </div>
      )}
      {false && tech && (
        <div className={styles.tech}>
          <ul>
            {tech?.split(',').map((techIndex) => {
              if (programmingLangs.includes(techIndex)) {
                if (Object.keys(dictIcons).includes(techIndex)) {
                  return (
                    <li key={dictIcons[techIndex as IconList].name}>
                      <Tooltip content={dictIcons[techIndex as IconList].name} placement="bottom">
                        <div>
                          <Link href={{ pathname: '/blog', query: { tech: techIndex } }} replace>
                            <a>
                              <SVG icon={techIndex as IconList} />
                            </a>
                          </Link>
                        </div>
                      </Tooltip>
                    </li>
                  );
                } else if (techIndex === 'vyper') {
                  return (
                    <li key={techIndex} className={styles.vyper}>
                      <Tooltip content="Vyper" placement="bottom">
                        <div>
                          <Link href={{ pathname: join('/', section), query: { tech: techIndex } }} replace>
                            <a>V</a>
                          </Link>
                        </div>
                      </Tooltip>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
