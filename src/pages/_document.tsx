import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';
import Favicons from 'src/components/utils/Favicons';
import { createHash } from 'crypto';

export default class MyDocument extends Document {
  render() {
    const themeScript = `(function () { try { var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';document.documentElement.setAttribute('data-theme', theme); } catch (e) {} })();`;
    const ContentSecurityPolicy = `
      default-src 'self';
      child-src 'self';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
      media-src 'none';
      connect-src *;
      font-src 'self';
      base-uri 'none';
      form-action 'none';
      script-src 'self' 'unsafe-eval';
      script-src-elem 'self' 'sha256-${createHash('sha256').update(themeScript).digest('base64')}';
    `;
    return (
      <Html>
        <Head>
          <Favicons />
          <meta httpEquiv="Content-Security-Policy" content={ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()} />
          <script
            key="theme"
            dangerouslySetInnerHTML={{
              __html: themeScript,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
