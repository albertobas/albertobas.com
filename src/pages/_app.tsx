import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import 'src/styles/globals.css';
import { defaultSeoConfig } from 'next-seo.config';
import ES_MESSAGES from 'compiled-lang/es.json';
import EN_MESSAGES from 'compiled-lang/en.json';
import SiteLayout from 'src/components/layouts/SiteLayout';
import MobileProvider from 'src/components/context/MobileProvider';
import ThemeProvider from 'src/components/context/ThemeProvider';

const messages: Record<string, typeof EN_MESSAGES | typeof ES_MESSAGES> = {
  en: EN_MESSAGES,
  es: ES_MESSAGES,
};

export default function Application({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <IntlProvider locale={router.locale!} defaultLocale={router.defaultLocale} messages={messages[router.locale!]}>
      <ThemeProvider>
        <MobileProvider>
          <DefaultSeo {...defaultSeoConfig} />
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </MobileProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}
