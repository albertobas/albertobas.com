import { Dispatch, memo, SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import styles from 'src/styles/modules/components/utils/pagination.module.css';
import SVG from 'src/components/utils/SVG';

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isMobile?: boolean;
};

const Pagination = ({ totalPages, currentPage, setCurrentPage, isMobile }: Props) => {
  const intl = useIntl();
  const shownPagesNum = 3;
  const isNotFirst = currentPage > 0;
  const isNotLast = currentPage < totalPages - 1;
  const offset = Math.floor(shownPagesNum / 2);
  let start = Math.max(currentPage - offset, 0);
  const end = Math.min(start + shownPagesNum, totalPages);
  if (totalPages >= shownPagesNum && end >= totalPages) {
    start = totalPages - shownPagesNum;
  }
  const handleFirst = (e: React.MouseEvent) => {
    isNotFirst && setCurrentPage(0);
  };
  const handlePrev = (e: React.MouseEvent) => {
    isNotFirst && setCurrentPage(currentPage - 1);
  };
  const handleNext = (e: React.MouseEvent) => {
    isNotLast && setCurrentPage(currentPage + 1);
  };
  const handleLast = (e: React.MouseEvent) => {
    isNotLast && setCurrentPage(totalPages - 1);
  };
  const handlePage = (e: React.MouseEvent, i: number) => {
    const isCurrent = currentPage === i;
    !isCurrent && setCurrentPage(i);
  };
  const pages = [];
  for (let i = start; i < end; i++) {
    pages.push(
      <li key={i}>
        <a
          aria-label={intl.formatMessage({ id: 'page', defaultMessage: 'Page' }) + i.toString()}
          className={`${currentPage === i ? styles.selected : styles.interactive} ${styles.numbers} ${
            styles.borderBetween
          }`}
          role="button"
          href={'#'}
          tabIndex={0}
          onClick={(e) => handlePage(e, i)}
        >
          <span>{i + 1}</span>
        </a>
      </li>
    );
  }
  return (
    <ul className={styles.layout}>
      {!isMobile && (
        <li key="first">
          <a
            aria-label={intl.formatMessage({ id: 'firstPage', defaultMessage: 'First page' })}
            className={`${!isNotFirst ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderFirst}`}
            role="button"
            href={'#'}
            tabIndex={0}
            onClick={handleFirst}
          >
            <SVG icon="chevronLeftDouble" />
          </a>
        </li>
      )}
      <li key="prev">
        <a
          aria-label={intl.formatMessage({ id: 'prevPage', defaultMessage: 'Previous page' })}
          className={
            isMobile
              ? `${!isNotFirst ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderFirst}`
              : `${!isNotFirst ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderBetween}`
          }
          role="button"
          href={'#'}
          tabIndex={0}
          onClick={handlePrev}
        >
          <SVG icon="chevronLeft" />
        </a>
      </li>
      {[...pages]}
      <li key="next">
        <a
          aria-label={intl.formatMessage({ id: 'nextPage', defaultMessage: 'Next page' })}
          className={
            isMobile
              ? `${!isNotLast ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderLast}`
              : `${!isNotLast ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderBetween}`
          }
          role="button"
          href={'#'}
          tabIndex={0}
          onClick={handleNext}
        >
          <SVG icon="chevronRight" />
        </a>
      </li>
      {!isMobile && (
        <li key="last">
          <a
            aria-label={intl.formatMessage({ id: 'lastPage', defaultMessage: 'Last page' })}
            className={`${!isNotLast ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderLast}`}
            role="button"
            href={'#'}
            tabIndex={0}
            onClick={handleLast}
          >
            <SVG icon="chevronRightDouble" />
          </a>
        </li>
      )}
    </ul>
  );
};

export default memo(Pagination);
