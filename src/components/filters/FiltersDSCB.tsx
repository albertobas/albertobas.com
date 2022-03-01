import { Item } from 'src/utils/interfaces/architecture';
import FilterSelect from 'src/components/filters/FilterSelect';
import styles from 'src/styles/modules/components/filters/filters.module.css';
import { MdxMetadataCard } from 'src/utils/interfaces/post';
import { Language } from 'src/utils/interfaces/languages';
import { getItemsFromCards, sortItemArray } from 'src/utils/helpers/post';
import { useMemo } from 'react';

interface Props {
  cards: MdxMetadataCard[];
  topic: Item[] | null;
  field: Item[] | null;
  tags: Item[] | null;
  tech: Item[] | null;
  handleTopic(item: Item[]): void;
  handleField(item: Item[]): void;
  handleTags(item: Item[]): void;
  handleTech(item: Item[]): void;
  locale: Language;
}

const FiltersDSCB = ({
  topic,
  field,
  tags,
  tech,
  handleTopic,
  handleField,
  handleTags,
  handleTech,
  cards,
  locale,
}: Props) => {
  const typeTopic = 'topic';
  const typeField = 'field';
  const typeTech = 'tech';
  const typeTags = 'tags';
  const optionsTopic = useMemo(() => {
    return getItemsFromCards(cards, typeTopic, locale);
  }, [cards, typeTopic, locale]);
  const optionsField = useMemo(() => {
    return getItemsFromCards(cards, typeField, locale);
  }, [cards, typeField, locale]);
  const optionsTech = useMemo(() => {
    return getItemsFromCards(cards, typeTech, locale);
  }, [cards, typeTech, locale]);
  const optionsTag = useMemo(() => {
    return getItemsFromCards(cards, typeTags, locale);
  }, [cards, typeTags, locale]);
  const optionsTagExtended = useMemo(() => {
    const tagExtended = [...(optionsTag || []), ...(optionsTech || [])].sort(sortItemArray);
    return optionsTag && optionsTech ? tagExtended : optionsTag ? optionsTag : optionsTech ? optionsTech : undefined;
  }, [optionsTag, optionsTech]);
  return (
    <div className={styles.layout}>
      <FilterSelect
        options={optionsTopic}
        locale={locale}
        type={typeTopic}
        onChange={handleTopic}
        value={topic}
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

export default FiltersDSCB;
