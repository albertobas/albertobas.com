import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { cardFilter, cardSearch } from 'src/utils/helpers/post';
import { useFilterArray } from 'src/utils/hooks';
import { Item } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import SortListCard from 'src/components/cards/SortListCard';
import SearchBar from 'src/components/utils/SearchBar';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
const FiltersDSCB = dynamic(() => import('src/components/filters/FiltersDSCB'));

type Props = {
  cards: MdxMetadataCard[];
  locale: Language;
  all?: boolean;
};

const SearchList = ({ cards, locale, all }: Props) => {
  const intl = useIntl();
  const [filters, setFilters] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string | null>(null);
  const [topic, setTopic] = useFilterArray();
  const [field, setField] = useFilterArray();
  const [tags, setTags] = useFilterArray();
  const [tech, setTech] = useFilterArray();
  const [pageNum, setPageNum] = useState<number>(0);
  const handleFilters = useCallback(() => {
    setFilters(!filters);
  }, [filters]);
  const handleSearch = useCallback((value: string) => {
    value.length > 0 ? setQuerySearch(value) : setQuerySearch(null);
  }, []);
  const handleTopic = useCallback(
    (items: Item[]) => {
      items.length > 0 ? setTopic(items) : setTopic(null);
    },
    [setTopic]
  );
  const handleField = useCallback(
    (items: Item[]) => {
      items.length > 0 ? setField(items) : setField(null);
    },
    [setField]
  );
  const handleTags = useCallback(
    (items: Item[]) => {
      items.length > 0 ? setTags(items) : setTags(null);
    },
    [setTags]
  );
  const handleTech = useCallback(
    (items: Item[]) => {
      items.length > 0 ? setTech(items) : setTech(null);
    },
    [setTech]
  );
  useEffect(() => {
    setPageNum(0);
  }, [topic, field, tags, tech]);
  const filteredCards = useMemo(() => {
    return cardFilter(cardSearch(cards, querySearch, locale), [
      { key: 'topic', filter: topic },
      { key: 'field', filter: field },
      { key: 'tags', filter: tags },
      { key: 'tech', filter: tech },
    ]);
  }, [topic, field, tags, tech, querySearch, cards, locale]);
  const filteredSearch = querySearch !== null || topic !== null || field !== null || tags !== null || tech !== null;
  return (
    <>
      <SearchBar
        query={querySearch}
        handleSearch={handleSearch}
        onClick={handleFilters}
        isBtnClicked={filters}
        placeholder={
          cards[0]?.section === 'blog'
            ? intl.formatMessage({ id: 'searchPosts', defaultMessage: 'Search posts...' })
            : intl.formatMessage({ id: 'searchProjects', defaultMessage: 'Search projects...' })
        }
      />
      {filters && (
        <FiltersDSCB
          cards={filteredCards}
          topic={topic}
          field={field}
          tags={tags}
          tech={tech}
          handleTopic={handleTopic}
          handleField={handleField}
          handleTags={handleTags}
          handleTech={handleTech}
          locale={locale}
        />
      )}
      <SortListCard
        cards={filteredCards}
        filteredSearch={filteredSearch}
        pageNum={pageNum}
        setPageNum={setPageNum}
        locale={locale}
        all={all}
      />
    </>
  );
};

export default SearchList;
