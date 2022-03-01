export interface IMobileContext {
  isMobileMenu: boolean;
  toggleMobileMenu: () => void;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IThemeContext {
  isDark: boolean;
}
