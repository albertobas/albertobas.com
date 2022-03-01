import { memo } from 'react';
import styles from 'src/styles/modules/components/filters/filterselect.module.css';
import { Item } from 'src/utils/interfaces/architecture';
import { Language } from 'src/utils/interfaces/languages';
import Dropdown from 'src/components/utils/Dropdown';
import { getLabel } from 'src/utils/helpers/post';
import { useIsMounted } from 'src/utils/hooks';

type Props = {
  options: Item[] | undefined;
  locale: Language;
  type: string;
  onChange(item: Item | Item[]): void;
  value: Item | Item[] | null;
  placeholderFontSize: string;
  isMulti?: boolean;
};

export default memo(function FilterSelectDSCB({ options, locale, type, onChange, value, isMulti }: Props) {
  const isMounted = useIsMounted();
  return (
    <div className={styles.advancedRow}>
      <p className={styles.advancedLabel}>{getLabel(type, locale)}</p>
      {isMounted && (
        <div className={styles.dd}>
          <Dropdown
            borderColor={{ dark: 'var(--black-300)', light: 'var(--gray-200-l)' }}
            instanceId={'select_' + type}
            placeholderFontSize="0.925rem"
            isClearable={true}
            isMulti={isMulti ? true : false}
            onChange={onChange}
            options={options}
            value={value}
          />
        </div>
      )}
    </div>
  );
});
