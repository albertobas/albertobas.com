import { useIntl } from 'react-intl';
import styles from 'src/styles/modules/components/utils/searchbar.module.css';
import { Language } from 'src/utils/interfaces/languages';
import SVG from 'src/components/utils/SVG';
import Tooltip from 'src/components/utils/Tooltip';

interface Props {
  query: string | null;
  handleSearch(value: string): void;
  isBtnClicked?: boolean;
  onClick?(): void;
  placeholder?: string;
}

const SearchBar = ({ query, handleSearch, isBtnClicked, onClick, placeholder }: Props) => {
  const intl = useIntl();
  return (
    <div className={styles.searchWrapper}>
      <div className={styles.search}>
        <label className={styles.svg} htmlFor="search-input">
          <SVG icon="search" />
        </label>
        <input
          id="search-input"
          type="search"
          autoComplete="off"
          value={query ? query : ''}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      {onClick !== undefined && (
        <Tooltip
          content={
            isBtnClicked
              ? intl.formatMessage({ id: 'closeFilters', defaultMessage: 'Close search filters' })
              : intl.formatMessage({ id: 'openFilters', defaultMessage: 'Open search filters' })
          }
          placement="bottom"
        >
          <button
            aria-label={
              isBtnClicked
                ? intl.formatMessage({ id: 'closeFilters', defaultMessage: 'Close search filters' })
                : intl.formatMessage({ id: 'openFilters', defaultMessage: 'Open search filters' })
            }
            className={isBtnClicked ? styles.btnOn : styles.btnOff}
            onClick={onClick}
          >
            <SVG icon="slider" isTitle />
          </button>
        </Tooltip>
      )}
    </div>
  );
};
export default SearchBar;
