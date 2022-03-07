import { createContext, useContext, useState, FC, ReactNode, useCallback, useEffect } from 'react';
import { IThemeContext } from 'src/utils/interfaces/context';

export const ThemeContext = createContext<IThemeContext>({
  isDark: false,
});

const ThemeProvider: FC<ReactNode> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const applyTheme = useCallback((mqList: MediaQueryList | MediaQueryListEvent) => {
    const theme = mqList.matches ? 'dark' : 'light';
    setIsDark(theme === 'dark' ? true : false);
    const d = document.documentElement;
    d.setAttribute('data-theme', theme);
    d.style.colorScheme = theme;
  }, []);

  useEffect(() => {
    const mqList = window.matchMedia('(prefers-color-scheme: dark)');
    mqList.addListener(applyTheme);
    applyTheme(mqList);
    return () => mqList.removeListener(applyTheme);
  }, [applyTheme]);
  return <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

export function useThemeContext() {
  return useContext(ThemeContext);
}
