import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { cardFilter, cardSearch } from 'src/utils/helpers/post';
import { useFilterArray } from 'src/utils/hooks';
import { Item } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import SortListsCard from 'src/components/cards/SortListsCard';
import SearchBar from 'src/components/utils/SearchBar';
import { CardListObject } from 'src/utils/interfaces/post';
const FiltersTagSlug = dynamic(() => import('src/components/filters/FiltersTagSlug'));

type Props = {
  cardsObject: CardListObject;
  locale: Language;
};

const SearchLists = ({ cardsObject, locale }: Props) => {
  const intl = useIntl();
  const [filters, setFilters] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string | null>(null);
  const [section, setSection] = useFilterArray(true);
  const [field, setField] = useFilterArray();
  const [pageNumBlog, setPageNumBlog] = useState<number>(0);
  const [pageNumProjects, setPageNumProjects] = useState<number>(0);
  const handleFilters = useCallback(() => {
    setFilters(!filters);
  }, [filters]);
  const handleSearch = useCallback((value: string) => {
    value.length > 0 ? setQuerySearch(value) : setQuerySearch(null);
  }, []);
  const handleSection = useCallback(
    (items: Item[]) => {
      items.length > 0 ? setSection(items) : setSection(null);
    },
    [setSection]
  );
  const handleField = useCallback(
    (items: Item[]) => {
      items.length > 0 ? setField(items) : setField(null);
    },
    [setField]
  );
  useEffect(() => {
    setPageNumBlog(0);
    setPageNumProjects(0);
  }, [section, field]);
  const filteredBlogCards = useMemo(() => {
    return cardFilter(cardSearch(cardsObject.blog, querySearch, locale), [
      { key: 'section', filter: section },
      { key: 'field', filter: field },
    ]);
  }, [section, field, querySearch, cardsObject, locale]);
  const filteredProjectsCards = useMemo(() => {
    return cardFilter(cardSearch(cardsObject.projects, querySearch, locale), [
      { key: 'section', filter: section },
      { key: 'field', filter: field },
    ]);
  }, [section, field, querySearch, cardsObject, locale]);
  const filteredSearch = querySearch !== null || section !== null || field !== null;
  return (
    <>
      <SearchBar
        query={querySearch}
        handleSearch={handleSearch}
        onClick={handleFilters}
        isBtnClicked={filters}
        locale={locale}
        placeholder={intl.formatMessage({ id: 'searchPostsProjects', defaultMessage: 'Search posts and projects...' })}
      />
      {filters && (
        <FiltersTagSlug
          cards={[...filteredBlogCards, ...filteredProjectsCards]}
          section={section}
          field={field}
          handleSection={handleSection}
          handleField={handleField}
          locale={locale}
        />
      )}
      <SortListsCard
        blogCards={filteredBlogCards}
        projectsCards={filteredProjectsCards}
        filteredSearch={filteredSearch}
        pageNumBlog={pageNumBlog}
        pageNumProjects={pageNumProjects}
        setPageNumBlog={setPageNumBlog}
        setPageNumProjects={setPageNumProjects}
        locale={locale}
      />
    </>
  );
};

export default SearchLists;
