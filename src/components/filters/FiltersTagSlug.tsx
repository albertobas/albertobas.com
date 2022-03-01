import { useMemo } from 'react';
import { Item } from 'src/utils/interfaces/architecture';
import FilterSelect from 'src/components/filters/FilterSelect';
import styles from 'src/styles/modules/components/filters/filters.module.css';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import { Language } from 'src/utils/interfaces/languages';
import { getItemsFromCards } from 'src/utils/helpers/post';

interface Props {
  cards: MdxMetadataCard[];
  section: Item[] | null;
  field: Item[] | null;
  tags: Item[] | null;
  tech: Item[] | null;
  handleSection(item: Item[]): void;
  handleField(item: Item[]): void;
  handleTags(item: Item[]): void;
  handleTech(item: Item[]): void;
  locale: Language;
}

const FiltersTagSlug = ({
  section,
  field,
  tags,
  tech,
  handleSection,
  handleField,
  handleTags,
  handleTech,
  cards,
  locale,
}: Props) => {
  const typeSection = 'section';
  const typeField = 'field';
  const typeTech = 'tech';
  const typeTags = 'tags';
  const optionsSection = useMemo(() => {
    return getItemsFromCards(cards, typeSection, locale);
  }, [cards, typeSection, locale]);
  const optionsField = useMemo(() => {
    return getItemsFromCards(cards, typeField, locale);
  }, [cards, typeField, locale]);
  const optionsTag = useMemo(() => {
    return getItemsFromCards(cards, typeTech, locale);
  }, [cards, typeTech, locale]);
  const optionsTech = useMemo(() => {
    return getItemsFromCards(cards, typeTags, locale);
  }, [cards, typeTags, locale]);
  const optionsTagExtended = useMemo(() => {
    return optionsTag && optionsTech
      ? [...optionsTag, ...optionsTech]
      : optionsTag
      ? optionsTag
      : optionsTech
      ? optionsTech
      : undefined;
  }, [optionsTag, optionsTech]);
  return (
    <div className={styles.layout}>
      <FilterSelect
        options={optionsSection}
        locale={locale}
        type={typeSection}
        onChange={handleSection}
        value={section}
        placeholderFontSize="0.925rem"
        isMulti
      />
      <FilterSelect
        options={optionsField}
        locale={locale}
        type={typeField}
        onChange={handleField}
        value={field}
        placeholderFontSize="0.925rem"
        isMulti
      />
      <FilterSelect
        options={optionsTech}
        locale={locale}
        type={typeTech}
        onChange={handleTech}
        value={tech}
        placeholderFontSize="0.925rem"
        isMulti
      />
      <FilterSelect
        options={optionsTagExtended}
        locale={locale}
        type={typeTags}
        onChange={handleTags}
        value={tags}
        placeholderFontSize="0.925rem"
        isMulti
      />
    </div>
  );
};

export default FiltersTagSlug;
