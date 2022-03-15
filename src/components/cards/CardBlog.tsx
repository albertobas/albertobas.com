import { memo, useMemo } from 'react';
import styles from 'src/styles/modules/components/cards/cardblog.module.css';
import { dictTopics } from 'src/utils/dict';
import { Language } from 'src/utils/interfaces/languages';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import { getItemsFromCards, shortenText } from 'src/utils/helpers/post';
import SVG from 'src/components/utils/SVG';
import { dictIcons, IconList } from 'src/components/utils/SVG';
import { join } from 'path';
import { DictTopics } from 'src/utils/interfaces/dict';
import DateFormatter from 'src/components/utils/DateFormatter';
import Tooltip from 'src/components/utils/Tooltip';
import { ItemExtended } from 'src/utils/interfaces/architecture';
import ILink from 'src/components/utils/ILink';
import { useIntl } from 'react-intl';
import Tags from 'src/components/tags/Tags';

type Props = MdxMetadataCard & { locale: Language };

export default memo(function CardBlog({
  section,
  field,
  title,
  slug,
  description,
  tech,
  dateModified,
  datePublished,
  readingTime,
  tags,
  locale,
}: Props) {
  const tagsArray = useMemo(
    () => (tags || tech ? (getItemsFromCards(tags + ',' + tech, 'tags', locale) as ItemExtended[]) : undefined),
    [tags, tech, locale]
  );
  const intl = useIntl();
  return (
    <>
      <div className={styles.layout}>
        {field && <p className={styles.field}>{dictTopics[field as DictTopics]?.label[locale]}</p>}
        <h2>
          <ILink href={join('/', section, slug)}>{title}</ILink>
        </h2>
        {description && <p className={styles.description}>{shortenText(description)}</p>}
        {(tags || tech) && (
          <nav role="navigation" className={styles.layoutTags}>
            <Tags tags={tagsArray} />
          </nav>
        )}
        <div className={styles.layoutDate}>
          {false && tech && (
            <div className={styles.tech}>
              <ul>
                {tech?.split(',').map((techIndex) => {
                  if (Object.keys(dictIcons).includes(techIndex)) {
                    return (
                      <li key={dictIcons[techIndex as IconList].name}>
                        <Tooltip content={dictIcons[techIndex as IconList].name} placement="bottom">
                          <div>
                            <SVG icon={techIndex as IconList} />
                          </div>
                        </Tooltip>
                      </li>
                    );
                  } else if (techIndex === 'vyper') {
                    return (
                      <li key={techIndex} className={styles.vyper}>
                        <Tooltip content="Vyper" placement="bottom">
                          <div>V</div>
                        </Tooltip>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
          {(datePublished || dateModified) && (
            <div className={styles.date}>
              <span>
                {dateModified
                  ? intl.formatMessage({ id: 'dateUpdated', defaultMessage: 'Updated on' })
                  : intl.formatMessage({ id: 'datePublished', defaultMessage: 'Published on' })}
              </span>
              <DateFormatter dateString={dateModified ? dateModified : datePublished} locale={locale} />
            </div>
          )}
          {readingTime.words > 0 && (
            <div>
              <span>
                {Math.round(readingTime.minutes) +
                  ' ' +
                  intl.formatMessage({ id: 'reading', defaultMessage: 'min read' })}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
});
