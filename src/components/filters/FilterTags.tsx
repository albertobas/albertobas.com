import { useMemo } from 'react';
import { Item, ItemExtended } from 'src/utils/interfaces/architecture';
import styles from 'src/styles/modules/components/filters/filters.module.css';
import { Language } from 'src/utils/interfaces/languages';
import { getItemsFromTags } from 'src/utils/helpers/tags';
import FilterSelect from 'src/components/filters/FilterSelect';

interface Props {
  tags: ItemExtended[];
  topic: Item | null;
  handleTopic: (item: Item) => void | null;
  locale: Language;
}

const FilterTags = ({ topic, handleTopic, tags, locale }: Props) => {
  const typeTopic = 'topic';
  const optionsTopic = useMemo(() => {
    return getItemsFromTags(tags, typeTopic, locale);
  }, [tags, typeTopic, locale]);
  return (
    <div className={styles.layout}>
      <div>
        <FilterSelect
          options={optionsTopic}
          locale={locale}
          type={typeTopic}
          onChange={handleTopic}
          value={topic}
          placeholderFontSize="0.875rem"
        />
      </div>
    </div>
  );
};

export default FilterTags;
