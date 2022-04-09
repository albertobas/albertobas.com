import { useRouter } from 'next/router';
import { headerNavKeys } from 'src/utils/constants';
import styles from 'src/styles/modules/components/utils/mobilemenu.module.css';
import { useMobileContext } from 'src/utils/context/MobileProvider';
import { Language } from 'src/utils/interfaces/languages';
import { join } from 'path';
import { dictKeys } from 'src/utils/dict';
import { DictKeys } from 'src/utils/interfaces/dict';
import { useDelayedRender } from 'src/utils/hooks';

const MobileMenu = ({ locale }: { locale: Language }) => {
  const router = useRouter();
  const { isMobileMenu, setMobileMenu } = useMobileContext();
  const { isMounted, isRendered } = useDelayedRender(isMobileMenu, 20, 0);
  const handleNavKey = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    url === router.asPath ? setMobileMenu(false) : router.push(url, url, { locale: locale });
  };
  const keys = ['home', ...headerNavKeys];
  return (
    <>
      {isMounted && (
        <div className={isRendered ? `${styles.menu} ${styles.menuRendered}` : styles.menu}>
          <nav className={styles.nav}>
            <ul className={styles.ul}>
              {keys.map((item, idx) => (
                <li key={item} style={{ transitionDelay: `${idx * 125}ms` }}>
                  <a
                    href={item === 'home' ? '/' : join('/', item)}
                    onClick={(e) => handleNavKey(item === 'home' ? '/' : join('/', item), e)}
                  >
                    {dictKeys[item as DictKeys][locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
