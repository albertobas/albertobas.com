import Select from 'react-select';
import { memo, useMemo } from 'react';
import { Item, ItemNum } from 'src/utils/interfaces/architecture';
import { Theme } from 'src/utils/interfaces/select';
import {
  getSelectControl,
  getSelectInput,
  getSelectMenu,
  getSelectMenuList,
  getSelectOption,
  getSelectPlaceholder,
} from 'src/utils/helpers/select';
import { useIntl } from 'react-intl';
import { useThemeContext } from '../context/ThemeProvider';

type Props = {
  instanceId: string;
  onChange: any;
  value: Item | Item[] | ItemNum | null;
  options: Item[] | ItemNum[] | undefined;
  backgroundColor?: Theme;
  borderColor?: Theme;
  isClearable?: boolean;
  isMulti?: boolean;
  placeholder?: string;
  placeholderColor?: Theme;
  placeholderFontSize?: string;
};

const Dropdown = ({
  instanceId,
  onChange,
  options,
  backgroundColor,
  borderColor,
  isClearable,
  isMulti,
  placeholder,
  placeholderColor,
  placeholderFontSize,
  value,
}: Props) => {
  const intl = useIntl();
  const { isDark } = useThemeContext();
  const styles = useMemo(() => {
    return {
      option: getSelectOption(isDark, borderColor),
      control: getSelectControl(isDark, borderColor, backgroundColor, placeholderFontSize),
      input: getSelectInput(isDark),
      menu: getSelectMenu(isDark),
      menuList: getSelectMenuList(isDark, placeholderFontSize),
      placeholder: getSelectPlaceholder(isDark, placeholderColor),
    };
  }, [isDark, borderColor, backgroundColor, placeholderColor, placeholderFontSize]);
  const stylesUni = useMemo(() => {
    return {
      ...styles,
      singleValue: (base: any) => ({
        ...base,
        color: isDark ? 'var(--gray-400)' : 'var(--gray-800)',
      }),
    };
  }, [isDark, styles]);
  const stylesMulti = useMemo(() => {
    return {
      ...styles,
      multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: isDark ? 'var(--black-200)' : 'var(--gray-200-l)',
      }),
      multiValueRemove: (provided: any) => ({
        ...provided,
        color: isDark ? 'var(--gray-500)' : 'var(--gray-500-l',
        ':hover': {
          backgroundColor: isDark ? 'var(--gray-500)' : 'var(--gray-500-l)',
          color: '#fff',
        },
      }),
      multiValueLabel: (base: any) => ({ ...base, color: isDark ? 'var(--gray-200)' : 'var(--gray-800-l)' }),
    };
  }, [isDark, styles]);
  return isMulti ? (
    <Select
      aria-label={intl.formatMessage({ id: 'selectLabel', defaultMessage: 'Select ' }) + instanceId}
      instanceId={instanceId}
      isClearable={isClearable}
      isMulti
      components={{ IndicatorSeparator: () => null }}
      options={options}
      onChange={onChange}
      placeholder={placeholder ? placeholder : intl.formatMessage({ id: 'select', defaultMessage: 'Select...' })}
      value={value ? value : null}
      styles={stylesMulti}
      isSearchable={false}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: isDark ? 'var(--gray-300)' : 'var(--gray-600-l)',
        },
      })}
    />
  ) : (
    <Select
      aria-label={intl.formatMessage({ id: 'selectLabel', defaultMessage: 'Select ' }) + instanceId}
      instanceId={instanceId}
      isClearable={isClearable}
      components={{ IndicatorSeparator: () => null }}
      options={options}
      onChange={onChange}
      placeholder={placeholder ? placeholder : intl.formatMessage({ id: 'select', defaultMessage: 'Select...' })}
      value={value ? value : null}
      styles={stylesUni}
      isSearchable={false}
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

export default memo(Dropdown, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  return prevProps.value === nextProps.value && prevProps.options === nextProps.options;
}
