import Select, { components, GroupBase, PlaceholderProps } from 'react-select';
import { useIntl } from 'react-intl';
import { memo, useMemo } from 'react';
import { Item, ItemNum } from 'src/utils/interfaces/architecture';
import {
  getSelectLanguageControl,
  getSelectLanguageDropdownClearIndicator,
  getSelectLanguageOption,
  getSelectLanguagePlaceholder,
  getSelectMenu,
  getSelectMenuList,
} from 'src/utils/helpers/select';
import { Theme } from 'src/utils/interfaces/select';
import { useThemeContext } from 'src/utils/context/ThemeProvider';

type Props = {
  instanceId: string;
  onChange: any;
  value: Item;
  options: Item[] | ItemNum[] | undefined;
  backgroundColor?: Theme;
  borderColor?: Theme;
  placeholder?: string;
  placeholderFontSize?: string;
};

const DropdownLanguage = ({
  instanceId,
  onChange,
  options,
  backgroundColor,
  borderColor,
  placeholder,
  placeholderFontSize,
  value,
}: Props) => {
  const intl = useIntl();
  const { isDark } = useThemeContext();
  const styles = useMemo(() => {
    return {
      option: getSelectLanguageOption(value, isDark, borderColor),
      control: getSelectLanguageControl(isDark, backgroundColor, placeholderFontSize),
      menu: getSelectMenu(isDark),
      menuList: getSelectMenuList(isDark, placeholderFontSize),
      placeholder: getSelectLanguagePlaceholder(isDark),
      dropdownIndicator: getSelectLanguageDropdownClearIndicator(isDark),
      clearIndicator: getSelectLanguageDropdownClearIndicator(isDark),
      singleValue: (base: any) => ({
        ...base,
        color: isDark ? 'var(--text-global-dark)' : 'var(--text-global)',
      }),
    };
  }, [value, backgroundColor, borderColor, isDark, placeholderFontSize]);
  const Placeholder = (props: PlaceholderProps<Item | ItemNum, false, GroupBase<Item | ItemNum>>) => (
    <components.Placeholder {...props}>
      <div style={{ display: 'flex', marginLeft: '0.5rem', fontSize: '0.75rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
          <path d="M 0 0 h 24 v 24 H 0 Z" fill="none" />
          <path d="M 12.87 15.07 l -2.54 -2.51 l 0.03 -0.03 c 1.74 -1.94 2.98 -4.17 3.71 -6.53 H 17 V 4 h -7 V 2 H 8 v 2 H 1 v 1.99 h 11.17 C 11.5 7.92 10.44 9.75 9 11.35 C 8.07 10.32 7.3 9.19 6.69 8 h -2 c 0.73 1.63 1.73 3.17 2.98 4.56 l -5.09 5.02 L 4 19 l 5 -5 l 3.11 3.11 l 0.76 -2.04 Z M 18.5 10 h -2 L 12 22 h 2 l 1.12 -3 h 4.75 L 21 22 h 2 l -4.5 -12 Z m -2.62 7 l 1.62 -4.33 L 19.12 17 h -3.24 Z" />
        </svg>
      </div>
    </components.Placeholder>
  );
  return (
    <Select
      aria-label={intl.formatMessage({ id: 'selectLabel', defaultMessage: 'Select ' }) + instanceId}
      instanceId={instanceId}
      isClearable={false}
      isSearchable={false}
      components={{ IndicatorSeparator: () => null, Placeholder }}
      options={options}
      onChange={onChange}
      placeholder={placeholder ? placeholder : intl.formatMessage({ id: 'select', defaultMessage: 'Select...' })}
      value={null}
      styles={styles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: isDark ? 'var(--gray-300)' : 'var(--gray-600-l)',
        },
      })}
    />
  );
};

export default memo(DropdownLanguage, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  return prevProps.value === nextProps.value && prevProps.options === nextProps.options;
}
