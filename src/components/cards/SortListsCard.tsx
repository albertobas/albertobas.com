import { useIntl } from 'react-intl';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import styles from 'src/styles/modules/components/cards/sortlistcards.module.css';
import { dictKeys } from 'src/utils/dict';
import { sortCards } from 'src/utils/helpers/post';
import { Item } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import Dropdown from 'src/components/utils/Dropdown';
import SVG, { IconList } from 'src/components/utils/SVG';
import CardBlog from 'src/components/cards/CardBlog';
import { sortKeysCards } from 'src/utils/constants';
import { DictKeys } from 'src/utils/interfaces/dict';
import Tooltip from 'src/components/utils/Tooltip';
import { useFilterSort, useIsMounted } from 'src/utils/hooks';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import CardProjects from 'src/components/cards/CardProjects';
import Pagination from 'src/components/utils/Pagination';

type Props = {
  blogCards: MdxMetadataCard[];
  projectsCards: MdxMetadataCard[];
  filteredSearch: boolean;
  pageNumBlog: number;
  pageNumProjects: number;
  setPageNumBlog: Dispatch<SetStateAction<number>>;
  setPageNumProjects: Dispatch<SetStateAction<number>>;
  locale: Language;
};

const SortListsCard = ({
  blogCards,
  projectsCards,
  filteredSearch,
  pageNumBlog,
  pageNumProjects,
  setPageNumBlog,
  setPageNumProjects,
  locale,
}: Props) => {
  const [sort, setSort] = useFilterSort();
  const [reverse, setReverse] = useState<boolean>(false);
  const cardsPerPage = 4;
  const [stateBlogData, setStateBlogData] = useState<MdxMetadataCard[]>(blogCards.slice(0, cardsPerPage));
  const [stateProjectsData, setStateProjectsData] = useState<MdxMetadataCard[]>(projectsCards.slice(0, cardsPerPage));
  const isMounted = useIsMounted();
  const intl = useIntl();
  const handleSort = useCallback((item: Item | null) => {
    item ? setSort(item) : setSort(null);
  }, []);
  const handleReverse = useCallback(() => {
    sort && setReverse((b) => !b);
  }, [sort]);
  const optionsSort = useMemo(() => {
    return sortKeysCards.map((key) => {
      return { label: dictKeys[key as DictKeys][locale], value: key } as Item;
    });
  }, [locale]);
  const sortedBlogData = useMemo(
    () => (sort ? sortCards(blogCards.slice(), sort.value, reverse, locale) : blogCards),
    [blogCards, sort, reverse, locale]
  );
  const sortedProjectsData = useMemo(
    () => (sort ? sortCards(projectsCards.slice(), sort.value, reverse, locale) : projectsCards),
    [projectsCards, sort, reverse, locale]
  );
  useEffect(() => {
    const startBlog = cardsPerPage * pageNumBlog;
    const startProjects = cardsPerPage * pageNumProjects;
    setStateBlogData((sort ? sortedBlogData : blogCards).slice(startBlog, startBlog + cardsPerPage));
    setStateProjectsData(
      (sort ? sortedProjectsData : projectsCards).slice(startProjects, startProjects + cardsPerPage)
    );
  }, [blogCards, projectsCards, sortedBlogData, sortedProjectsData, cardsPerPage, sort, pageNumBlog, pageNumProjects]);
  useEffect(() => {
    setPageNumBlog(0);
    setPageNumProjects(0);
    setReverse(false);
  }, [setPageNumBlog, setPageNumProjects, sort]);
  const cardsLength = blogCards.length + projectsCards.length;
  const totalPagesBlog = Math.ceil(blogCards.length / 4);
  const totalPagesProjects = Math.ceil(projectsCards.length / 4);
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
                options={optionsSort}
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
            <span>{`${cardsLength} ${
              cardsLength > 0 && cardsLength < 2
                ? intl.formatMessage({ id: 'articleFound', defaultMessage: 'article found' })
                : intl.formatMessage({ id: 'articlesFound', defaultMessage: 'articles found' })
            }`}</span>
          ) : (
            ''
          )}
        </div>
      </div>
      {stateBlogData.length > 0 && (
        <>
          <div className={styles.layoutCardsBlog}>
            {stateBlogData.map((card) => (
              <CardBlog key={card.slug} locale={locale} {...card} />
            ))}
          </div>
          <div className={styles.paginationWrapper}>
            <div className={styles.paginationMargin}>
              <Pagination
                totalPages={totalPagesBlog}
                currentPage={pageNumBlog}
                setCurrentPage={setPageNumBlog}
                locale={locale}
              />
            </div>
            <div className={styles.paginationMobileMargin}>
              <Pagination
                totalPages={totalPagesProjects}
                currentPage={pageNumProjects}
                setCurrentPage={setPageNumProjects}
                locale={locale}
                isMobile
              />
            </div>
          </div>
        </>
      )}
      {stateProjectsData.length > 0 && (
        <>
          <div className={styles.layoutCardsProjects}>
            {stateProjectsData.map((card) => (
              <CardProjects key={card.slug} {...card} />
            ))}
          </div>
          <div className={styles.paginationWrapper}>
            <div className={styles.pagination}>
              <Pagination
                totalPages={totalPagesProjects}
                currentPage={pageNumProjects}
                setCurrentPage={setPageNumProjects}
                locale={locale}
              />
            </div>
            <div className={styles.paginationMobile}>
              <Pagination
                totalPages={totalPagesProjects}
                currentPage={pageNumProjects}
                setCurrentPage={setPageNumProjects}
                locale={locale}
                isMobile
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SortListsCard;
