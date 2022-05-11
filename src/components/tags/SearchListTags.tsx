import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';
import { useCallback, useState } from 'react';
import { Item, ItemExtended } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import SearchBar from 'src/components/utils/SearchBar';
import { tagsFilter, tagsSearch } from 'src/utils/helpers/tags';
import SortListTags from 'src/components/tags/SortListTags';
import { useFilter } from 'src/utils/hooks';
const FilterTags = dynamic(() => import('src/components/filters/FilterTags'));

type Props = {
  tags: ItemExtended[];
  locale: Language;
};

const SearchListTags = ({ tags, locale }: Props) => {
  const intl = useIntl();
  const [filters, setFilters] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string | null>(null);
  const [topic, setTopic] = useFilter();
  const handleSearch = useCallback((value: string) => {
    value.length > 0 ? setQuerySearch(value) : setQuerySearch(null);
  }, []);
  const handleFilters = useCallback(() => {
    setFilters(!filters);
  }, [filters]);
  const handleTopic = useCallback(
    (item: Item | null) => {
      item ? setTopic(item) : setTopic(null);
    },
    [setTopic]
  );
  const filteredTags = tagsFilter(tagsSearch(tags, querySearch), [{ key: 'topic', filter: topic }]);
  const filteredSearch = querySearch !== null || topic !== null;
  return (
    <>
      <SearchBar
        query={querySearch}
        handleSearch={handleSearch}
        onClick={handleFilters}
        isBtnClicked={filters}
        placeholder={intl.formatMessage({ id: 'searchTags', defaultMessage: 'Search tags...' })}
      />
      {filters && <FilterTags tags={filteredTags} topic={topic} handleTopic={handleTopic} locale={locale} />}
      <SortListTags tags={filteredTags} filteredSearch={filteredSearch} locale={locale} />
    </>
  );
};

export default SearchListTags;
