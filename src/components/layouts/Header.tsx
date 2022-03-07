import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styles from 'src/styles/modules/layout/header.module.css';
import { headerNavKeys } from 'src/utils/constants';
import { useMobileContext } from 'src/utils/context/MobileProvider';
import { Language } from 'src/utils/interfaces/languages';
import BurgerButton from 'src/components/utils/BurgerButton';
import { dictKeys, dictLocales } from 'src/utils/dict';
import { join } from 'path';
import { DictKeys } from 'src/utils/interfaces/dict';
import { Item } from 'src/utils/interfaces/architecture';
import { useIsMounted } from 'src/utils/hooks';
import Logo from 'src/components/utils/Logo';
import DropdownLanguage from 'src/components/utils/DropdownLanguage';
import ILink from 'src/components/utils/ILink';
const MobileMenu = dynamic(() => import('src/components/utils/MobileMenu'));

export default function Header() {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { isMobileMenu, setMobileMenu, toggleMobileMenu } = useMobileContext();
  const locale = router.locale as Language;
  const handleLocaleTransition = (nextLocale: Item) => {
    router.push(router.asPath, router.asPath, { locale: nextLocale.value });
  };
  const handleNavKey = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    url === router.asPath ? setMobileMenu(false) : router.push(url, url, { locale: locale });
  };
  const localeItems: Item[] = Object.keys(dictLocales).map((key) => {
    return dictLocales[key as Language];
  });
  return (
    <>
      <MobileMenu locale={locale} />
      <header className={styles.header}>
        <div className={styles.logo}>
          {isMobileMenu ? (
            <a href={'/'} onClick={(e) => handleNavKey('/', e)} aria-label="Logo">
              <Logo />
            </a>
          ) : (
            <ILink href={'/'} aria-label="Logo">
              <Logo />
            </ILink>
          )}
        </div>
        <div className={styles.navLangBurger}>
          <nav className={styles.nav} role="navigation">
            <ul>
              {headerNavKeys.map((item) => {
                return (
                  <li
                    key={item}
                    className={
                      item === 'home' && router.asPath === '/'
                        ? styles.selected
                        : router.asPath.startsWith(join('/', item)) && item != 'home'
                        ? styles.selected
                        : undefined
                    }
                  >
                    <ILink href={item === 'home' ? '/' : join('/', item)}>{dictKeys[item as DictKeys][locale]}</ILink>
                  </li>
                );
              })}
            </ul>
          </nav>
          {isMounted && (
            <div className={isMobileMenu ? styles.hidden : styles.dropdown}>
              <DropdownLanguage
                instanceId="select_language_header"
                onChange={handleLocaleTransition}
                options={localeItems}
                value={dictLocales[locale]}
                backgroundColor={{ dark: 'var(--black-500)', light: '#f9fafb' }}
                borderColor={{ dark: 'transparent', light: 'transparent' }}
              />
            </div>
          )}
          {isMounted && (
            <div className={styles.burger}>
              <BurgerButton isClicked={isMobileMenu} onClick={toggleMobileMenu} locale={locale} />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
