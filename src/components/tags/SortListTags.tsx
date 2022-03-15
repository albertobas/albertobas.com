import { useIntl } from 'react-intl';
import { useCallback, useMemo, useState } from 'react';
import styles from 'src/styles/modules/components/cards/sortlistcards.module.css';
import { dictKeys } from 'src/utils/dict';
import { Item, ItemExtended } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import Dropdown from 'src/components/utils/Dropdown';
import SVG, { IconList } from 'src/components/utils/SVG';
import { sortKeysTags } from 'src/utils/constants';
import { DictKeys } from 'src/utils/interfaces/dict';
import { sortTags } from 'src/utils/helpers/tags';
import Tooltip from 'src/components/utils/Tooltip';
import { useFilterSort, useIsMounted } from 'src/utils/hooks';
import Tags from 'src/components/tags/Tags';

type Props = {
  tags: ItemExtended[];
  filteredSearch: boolean;
  locale: Language;
};

const SortListTags = ({ tags, filteredSearch, locale }: Props) => {
  const [sort, setSort] = useFilterSort();
  const [reverse, setReverse] = useState<boolean>(false);
  const isMounted = useIsMounted();
  const intl = useIntl();
  const handleSort = useCallback(
    (value: Item | null) => {
      setSort(value);
      setReverse(false);
    },
    [setSort]
  );
  const handleReverse = useCallback(() => {
    sort && setReverse((b) => !b);
  }, [sort]);
  const sortItemsArray = useMemo(() => {
    return sortKeysTags.map((key) => {
      return { label: dictKeys[key as DictKeys][locale], value: key } as Item;
    });
  }, [locale]);
  const sortedData = useMemo(() => (sort ? sortTags(tags.slice(), sort.value, reverse) : tags), [tags, sort, reverse]);
  const tagsLength = tags.length;
  return (
    <>
      <div className={styles.smallPanel}>
        <div className={styles.smallPanelInfo}>
          {isMounted && (
            <div className={styles.sortDD}>
              <Dropdown
                instanceId="select_sort"
                backgroundColor={{ dark: 'var(--black-500)', light: '#f9fafb' }}
                borderColor={{ dark: 'transparent', light: 'transparent' }}
                isClearable={true}
                value={sort}
                options={sortItemsArray}
                onChange={handleSort}
                placeholder={intl.formatMessage({ id: 'sortBy', defaultMessage: 'Sort by...' })}
                placeholderFontSize="0.925rem"
                placeholderColor={{ dark: 'var(--gray-400)', light: 'var(--gray-800-l)' }}
              />
            </div>
          )}
          <Tooltip content={intl.formatMessage({ id: 'reverse', defaultMessage: 'Reverse' })} placement="bottom">
            <button
              aria-label={intl.formatMessage({ id: 'reverse', defaultMessage: 'Reverse' })}
              disabled={sort ? false : true}
              className={!sort ? styles.disabled : reverse ? styles.btnOn : styles.btnOff}
              onClick={handleReverse}
            >
              <SVG icon={(reverse ? 'sortAlphaUp' : 'sortAlphaDown') as IconList} />
            </button>
          </Tooltip>
        </div>
        <div className={styles.smallPanelResults}>
          {filteredSearch ? (
            <span>{`${tagsLength} ${
              tagsLength > 0 && tagsLength < 2
                ? intl.formatMessage({ id: 'tagFound', defaultMessage: 'tag found' })
                : intl.formatMessage({ id: 'tagsFound', defaultMessage: 'tags found' })
            }`}</span>
          ) : (
            ''
          )}
        </div>
      </div>
      <nav role="navigation" className={styles.layoutTags}>
        <Tags tags={sort ? sortedData : tags} />
      </nav>
    </>
  );
};

export default SortListTags;
