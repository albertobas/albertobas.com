import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { memo } from 'react';
import styles from 'src/styles/modules/layout/footer.module.css';
import {
  footerWorkNavKeys,
  footerSocialNavKeys,
  footerAboutNavKeys,
  hrefGithub,
  hrefLinkedIn,
  hrefEmail,
} from 'src/utils/constants';
import Dropdown from 'src/components/utils/Dropdown';
import { useMobileContext } from 'src/utils/context/MobileProvider';
import { Language } from 'src/utils/interfaces/languages';
import { join } from 'path';
import { dictKeys, dictLocales } from 'src/utils/dict';
import { DictKeys } from 'src/utils/interfaces/dict';
import { useIsMounted } from 'src/utils/hooks';
import ILink from 'src/components/utils/ILink';
import Logo from 'src/components/utils/Logo';
import Tooltip from 'src/components/utils/Tooltip';
import SVG, { IconList } from 'src/components/utils/SVG';

const Footer = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const locale = router.locale as Language;
  const handleLocaleTransition = (langSelected: any) => {
    router.push(router.asPath, router.asPath, { locale: langSelected.value });
  };
  const { isMobileMenu } = useMobileContext();
  const localeItems = Object.keys(dictLocales).map((key) => {
    return dictLocales[key as Language];
  });
  return (
    <footer className={isMobileMenu ? styles.hidden : styles.footer}>
      <div className={styles.layout}>
        <div className={styles.logo}>
          <ILink href={'/'} aria-label="Logo">
            <Logo />
          </ILink>
        </div>
        {isMounted && (
          <div className={styles.dropdown}>
            <Dropdown
              backgroundColor={{ dark: 'var(--black-500)', light: '#f9fafb' }}
              borderColor={{ dark: 'var(--black-300)', light: 'var(--gray-200-l)' }}
              instanceId="select_language_footer"
              isClearable={false}
              options={localeItems}
              onChange={handleLocaleTransition}
              value={dictLocales[locale]}
            />
          </div>
        )}
        <div className={styles.home}>
          <h2>{'/'}</h2>
          <nav role="navigation">
            <ul>
              {footerAboutNavKeys.map((key) => (
                <li key={key}>
                  <Link href={key === 'home' ? '/' : join('/', key)} locale={key === 'rss.xml' ? false : undefined}>
                    <a>{dictKeys[key as DictKeys][locale]}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.sections}>
          <h2>
            <FormattedMessage id="footerSections" defaultMessage="Sections" />
          </h2>
          <nav role="navigation">
            <ul>
              {footerWorkNavKeys.map((item) => (
                <li key={item}>
                  <Link href={join('/', item)}>
                    <a>{dictKeys[item as DictKeys][locale]}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.contact}>
          <h2>
            <FormattedMessage id="footerContact" defaultMessage="Contact" />
          </h2>
          <nav role="navigation">
            <ul>
              {footerSocialNavKeys.map((item) => (
                <li key={item}>
                  <Tooltip
                    content={
                      item === 'github'
                        ? hrefGithub
                        : item === 'linkedin'
                        ? hrefLinkedIn
                        : item === 'email'
                        ? hrefEmail
                        : undefined
                    }
                    placement="bottom"
                  >
                    <span>
                      <ILink
                        href={
                          item === 'github'
                            ? hrefGithub
                            : item === 'linkedin'
                            ? hrefLinkedIn
                            : item === 'email'
                            ? hrefEmail
                            : undefined
                        }
                        aria-label={item}
                      >
                        <SVG icon={item as IconList} dim={{ width: 1.5, height: 1.5 }} />
                      </ILink>
                    </span>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.webNote}>
          <p>
            <FormattedMessage
              id="footerWebNote"
              defaultMessage="This webpage does not track you. It is <openSource></openSource>."
              values={{
                openSource: () => (
                  <ILink className={styles.internal} href="/projects/albertobas-com">
                    <FormattedMessage id="openSource" defaultMessage="open source" />
                  </ILink>
                ),
              }}
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
