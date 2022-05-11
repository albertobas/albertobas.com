import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { Dispatch, memo, SetStateAction, useEffect } from 'react';
import Dropdown from 'src/components/utils/Dropdown';
import Pagination from 'src/components/utils/Pagination';
import styles from 'src/styles/modules/components/utils/paginationsection.module.css';
import { ItemNum } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import { itemsPerPageIdx } from 'src/utils/constants';
import { useIsMounted } from 'src/utils/hooks';
import SVG from 'src/components/utils/SVG';
import ILink from 'src/components/utils/ILink';

type Props = {
  dataLength: number;
  filteredSearch: boolean;
  cardsPerPage: ItemNum;
  cardsPerPageDefault: number;
  setCardsPerPage: Dispatch<SetStateAction<ItemNum>>;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
};

const PaginationSection = ({
  dataLength,
  filteredSearch,
  cardsPerPage,
  setCardsPerPage,
  pageNum,
  setPageNum,
}: Props) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const itemsPerPage: ItemNum[] = itemsPerPageIdx.map((item) => {
    return { value: item, label: item.toString() };
  });

  useEffect(() => {
    setPageNum(0);
  }, [setPageNum, cardsPerPage]);
  const totalPages = Math.ceil(dataLength / cardsPerPage.value);
  if (totalPages === 0) {
    return null;
  }
  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagination}>
        <Pagination totalPages={totalPages} currentPage={pageNum} setCurrentPage={setPageNum} />
      </div>
      <div className={styles.paginationMobile}>
        <Pagination totalPages={totalPages} currentPage={pageNum} setCurrentPage={setPageNum} isMobile />
      </div>
      {isMounted && (
        <div className={styles.cardsPerPage}>
          <div className={styles.cardsPerPageDD}>
            <Dropdown
              borderColor={{ dark: 'var(--black-300)', light: 'var(--gray-200-l)' }}
              instanceId="select_pagination"
              placeholderFontSize="0.875rem"
              isClearable={false}
              value={cardsPerPage}
              options={itemsPerPage}
              onChange={setCardsPerPage}
            />
          </div>
          <span>
            <FormattedMessage id="perPage" defaultMessage="per page" />
          </span>
        </div>
      )}
      {!filteredSearch && totalPages > 1 && (
        <ILink href={router.asPath.split('?')[0] + '/all'} className={styles.seeAll}>
          <FormattedMessage id="fullList" defaultMessage="Full list" />
          <SVG icon="longArrowAltRight" />
        </ILink>
      )}
    </div>
  );
};

export default memo(PaginationSection);
