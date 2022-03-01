import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import ILink from 'src/components/utils/ILink';
import Intro from 'src/components/utils/Intro';
import SEO from 'src/components/utils/SEO';
import styles from 'src/styles/modules/utils.module.css';
import { useLocale, useLocales } from 'src/utils/hooks';

const NotFound = () => {
  const locale = useLocale();
  const locales = useLocales();
  const asPath = useRouter().asPath;
  const intl = useIntl();
  return (
    <>
      <SEO
        pageKey={'404'}
        asPath={asPath}
        description={intl.formatMessage({
          id: 'notFoundP',
          defaultMessage: 'This page does not exist.',
        })}
        locale={locale}
        locales={locales}
      />
      <div className={styles.containerMargin}>
        <Intro
          heading="404"
          paragraph={intl.formatMessage({
            id: 'notFoundP',
            defaultMessage: 'This page does not exist.',
          })}
        />
        <ILink href={'/'} className={styles.internal}>
          <FormattedMessage id="notFoundA" defaultMessage="Go back home" />
        </ILink>
      </div>
    </>
  );
};

export default NotFound;
