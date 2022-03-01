import { Item } from 'src/utils/interfaces/architecture';
import { Theme } from 'src/utils/interfaces/select';

export const getSelectOption = (isDark: boolean, borderColor: Theme | undefined) => {
  return (provided: any, { isSelected, isDisabled, isFocused }: any) => {
    return {
      ...provided,
      backgroundColor: isDark
        ? isDisabled
          ? null
          : isSelected
          ? 'var(--gray-700)'
          : isFocused
          ? 'var(--black-200)'
          : '#000'
        : isDisabled
        ? null
        : isSelected
        ? 'var(--gray-500-l)'
        : isFocused
        ? 'var(--gray-200-l)'
        : '#fff',
      borderColor: isDark ? (borderColor ? borderColor.dark : undefined) : borderColor ? borderColor.light : undefined,
      color: isDark
        ? isSelected
          ? '#fff'
          : isFocused
          ? 'fff'
          : 'var(--gray-400)'
        : isSelected
        ? '#fff'
        : isFocused
        ? '#000'
        : 'var(--gray-800)',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  };
};

export const getSelectLanguageOption = (value: Item, isDark: boolean, borderColor: Theme | undefined) => {
  return (provided: any, { data, isDisabled, isFocused }: any) => ({
    ...provided,
    backgroundColor: isDark
      ? isDisabled
        ? null
        : data.value === value.value
        ? 'var(--gray-700)'
        : isFocused
        ? 'var(--black-200)'
        : '#000'
      : isDisabled
      ? null
      : data.value === value.value
      ? 'var(--gray-500-l)'
      : isFocused
      ? 'var(--gray-200-l)'
      : '#fff',
    borderColor: isDark ? (borderColor ? borderColor.dark : undefined) : borderColor ? borderColor.light : undefined,
    color: isDark
      ? data.value === value.value
        ? '#fff'
        : isFocused
        ? '#fff'
        : 'var(--gray-400)'
      : data.value === value.value
      ? '#fff'
      : isFocused
      ? '#000'
      : 'var(--gray-800)',
    cursor: data.value !== value.value ? 'pointer' : isDisabled ? 'not-allowed' : 'default',
  });
};

export const getSelectControl = (
  isDark: boolean,
  borderColor: Theme | undefined,
  backgroundColor: Theme | undefined,
  placeholderFontSize: string | undefined
) => {
  return (base: any) => ({
    ...base,
    backgroundColor: isDark
      ? backgroundColor
        ? backgroundColor.dark
        : '#000'
      : backgroundColor
      ? backgroundColor.light
      : '#fff',
    borderColor: isDark ? (borderColor ? borderColor.dark : undefined) : borderColor ? borderColor.light : undefined,
    borderRadius: 'var(--border-radius)',
    paddingLeft: 5,
    fontSize: placeholderFontSize ? placeholderFontSize : undefined,
    ':hover': {
      borderColor: 'transparent',
      boxShadow: isDark ? 'var(--shadow-dark)' : 'var(--shadow)',
      backgroundColor: isDark ? '#000' : '#fff',
    },
    ':focus-within': {
      borderColor: 'transparent',
      boxShadow: isDark ? 'var(--shadow-dark)' : 'var(--shadow)',
      backgroundColor: isDark ? '#000' : '#fff',
    },
  });
};

export const getSelectLanguageControl = (
  isDark: boolean,
  backgroundColor: Theme | undefined,
  placeholderFontSize: string | undefined
) => {
  return (base: any) => ({
    ...base,
    minHeight: '2rem',
    backgroundColor: isDark
      ? backgroundColor
        ? backgroundColor.dark
        : '#000'
      : backgroundColor
      ? backgroundColor.light
      : '#fff',
    border: 0,
    borderRadius: 'var(--border-radius)',
    paddingLeft: 5,
    fontSize: placeholderFontSize ? placeholderFontSize : undefined,
    color: isDark ? 'var(--gray-400)' : 'var(--gray-700)',
    ':hover': {
      borderColor: 'transparent',
      boxShadow: 'None',
      backgroundColor: isDark ? 'var(--black-200)' : 'var(--gray-200-l)',
      color: isDark ? '#fff' : '#000',
    },
    ':focus-within': {
      borderColor: 'transparent',
      boxShadow: 'None',
      fill: isDark ? '#fff' : '#000',
      backgroundColor: 'None',
    },
  });
};

export const getSelectInput = (isDark: boolean) => {
  return (base: any) => ({
    ...base,
    color: isDark ? 'var(--gray-400)' : 'var(--gray-800)',
  });
};

export const getSelectMenu = (isDark: boolean) => {
  return (base: any) => ({
    ...base,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: 'var(--border-radius)',
    border: 'None',
    boxShadow: isDark ? 'var(--shadow-dark)' : 'var(--shadow)',
    color: isDark ? '#fff' : '#000',
  });
};

export const getSelectMenuList = (isDark: boolean, placeholderFontSize: string | undefined) => {
  return (base: any) => ({
    ...base,
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: 'var(--border-radius)',
    backgroundColor: isDark ? '#000' : '#fff',
    fontSize: placeholderFontSize ? placeholderFontSize : undefined,
  });
};

export const getSelectPlaceholder = (isDark: boolean, placeholderColor: Theme | undefined) => {
  return (base: any) => ({
    ...base,
    color: isDark
      ? placeholderColor
        ? placeholderColor.dark
        : 'var(--gray-700)'
      : placeholderColor
      ? placeholderColor.light
      : 'var(--gray-400-l)',
  });
};

export const getSelectLanguagePlaceholder = (isDark: boolean) => {
  return (base: any) => ({
    ...base,
    color: isDark ? 'currentcolor' : 'currentcolor',
  });
};

export const getSelectLanguageDropdownClearIndicator = (isDark: boolean) => {
  return (provided: any) => ({
    ...provided,
    padding: '5px',
    color: 'var(--gray-500)',
    ':hover': {
      color: isDark ? '#fff' : '#000',
    },
  });
};
