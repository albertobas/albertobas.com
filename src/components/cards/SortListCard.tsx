import { useIntl } from 'react-intl';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import styles from 'src/styles/modules/components/cards/sortlistcards.module.css';
import { dictKeys } from 'src/utils/dict';
import { sortCards } from 'src/utils/helpers/post';
import { Item, ItemNum } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import Dropdown from 'src/components/utils/Dropdown';
import SVG, { IconList } from 'src/components/utils/SVG';
import CardBlog from 'src/components/cards/CardBlog';
import { sortKeysCards } from 'src/utils/constants';
import { DictKeys } from 'src/utils/interfaces/dict';
import PaginationSection from 'src/components/utils/PaginationSection';
import Tooltip from 'src/components/utils/Tooltip';
import { useFilterSort, useIsMounted } from 'src/utils/hooks';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import CardProjects from 'src/components/cards/CardProjects';

type Props = {
  cards: MdxMetadataCard[];
  filteredSearch: boolean;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  locale: Language;
  all?: boolean;
};

const SortListCard = ({ cards, filteredSearch, pageNum, setPageNum, locale, all }: Props) => {
  const [sort, setSort] = useFilterSort();
  const [reverse, setReverse] = useState<boolean>(false);
  const cardsPerPageDefault = useMemo(() => {
    return { label: '6', value: 6 };
  }, []);
  const [cardsPerPage, setCardsPerPage] = useState<ItemNum>(cardsPerPageDefault);
  const [stateData, setStateData] = useState<MdxMetadataCard[]>(cards.slice(0, cardsPerPage.value));
  const isMounted = useIsMounted();
  const intl = useIntl();
  const handleSort = useCallback((item: Item | null) => {
    item ? setSort(item) : setSort(null);
  }, []);
  const handleReverse = useCallback(() => {
    sort && setReverse((b) => !b);
  }, [sort]);
  const sortItemsArray = useMemo(() => {
    return sortKeysCards.map((key) => {
      return { label: dictKeys[key as DictKeys][locale], value: key } as Item;
    });
  }, [locale]);
  const sortedData = useMemo(
    () => (sort ? sortCards(cards.slice(), sort.value, reverse, locale) : cards),
    [cards, sort, reverse, locale]
  );
  useEffect(() => {
    const start = cardsPerPage.value * pageNum;
    setStateData((sort ? sortedData : cards).slice(start, start + cardsPerPage.value));
  }, [cards, sortedData, cardsPerPage, sort, pageNum]);
  useEffect(() => {
    setPageNum(0);
    setReverse(false);
  }, [setPageNum, sort]);
  const cardsLength = cards.length;
  const isBlog = cards[0]?.section === 'blog';
  const textFound = isBlog
    ? intl.formatMessage({ id: 'postFound', defaultMessage: 'post found' })
    : intl.formatMessage({ id: 'projectFound', defaultMessage: 'project found' });
  const textsFound = isBlog
    ? intl.formatMessage({ id: 'postsFound', defaultMessage: 'posts found' })
    : intl.formatMessage({ id: 'projectsFound', defaultMessage: 'projects found' });
  return (
    <>
      <div className={styles.smallPanel}>
        <div className={styles.smallPanelInfo}>
          {isMounted && (
            <div className={styles.sortDD}>
              <Dropdown
                instanceId="select_sort"
                isClearable={true}
                value={sort}
                options={sortItemsArray}
                onChange={handleSort}
                placeholder={intl.formatMessage({ id: 'sortBy', defaultMessage: 'Sort by...' })}
                backgroundColor={{ dark: 'var(--black-500)', light: '#f9fafb' }}
                borderColor={{ dark: 'transparent', light: 'transparent' }}
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
              <SVG
                icon={
                  (sort?.value === 'field' || sort?.value === 'title'
                    ? reverse
                      ? 'sortAlphaUp'
                      : 'sortAlphaDown'
                    : sort?.value === 'reading-time'
                    ? reverse
                      ? 'sortNumUp'
                      : 'sortNumDown'
                    : reverse
                    ? 'sortUp'
                    : 'sortDown') as IconList
                }
              />
            </button>
          </Tooltip>
        </div>
        <div className={styles.smallPanelResults}>
          {filteredSearch ? (
            <span>{`${cardsLength} ${cardsLength > 0 && cardsLength < 2 ? textFound : textsFound}`}</span>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={isBlog ? styles.layoutCardsBlog : styles.layoutCardsProjects}>
        {(all ? (sort ? sortedData : cards) : stateData).map((card) =>
          isBlog ? <CardBlog key={card.slug} locale={locale} {...card} /> : <CardProjects key={card.slug} {...card} />
        )}
      </div>
      {!all && (
        <PaginationSection
          dataLength={cards.length}
          filteredSearch={filteredSearch}
          cardsPerPage={cardsPerPage}
          setCardsPerPage={setCardsPerPage}
          cardsPerPageDefault={cardsPerPageDefault.value}
          pageNum={pageNum}
          setPageNum={setPageNum}
          locale={locale}
        />
      )}
    </>
  );
};

export default SortListCard;
