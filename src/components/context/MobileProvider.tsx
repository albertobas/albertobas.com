import { createContext, useContext, useState, FC, ReactNode } from 'react';
import { IMobileContext } from 'src/utils/interfaces/context';

export const MobileContext = createContext<IMobileContext>({
  isMobileMenu: false,
  setMobileMenu: () => {
    null;
  },
  toggleMobileMenu: () => {
    null;
  },
});

const MobileProvider: FC<ReactNode> = ({ children }) => {
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const toggleMobileMenu = () => {
    setMobileMenu((b) => !b);
  };
  return (
    <MobileContext.Provider value={{ isMobileMenu, setMobileMenu, toggleMobileMenu }}>
      {children}
    </MobileContext.Provider>
  );
};

export default MobileProvider;

export function useMobileContext() {
  return useContext(MobileContext);
}
