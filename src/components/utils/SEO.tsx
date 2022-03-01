import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useIntl } from 'react-intl';
import { memo } from 'react';
import { Language } from 'src/utils/interfaces/languages';
import {
  canonical,
  defaultDescription,
  defaultOGImages,
  defaultOGImagesUrl,
  ogType,
  siteName,
} from 'src/utils/constants';
import { dictKeys } from 'src/utils/dict';
import { DictKeys } from 'src/utils/interfaces/dict';

interface ArticleSEO {
  slug: string;
  asPath: string;
  title: string;
  topic: string;
  description: string;
  datePublished: string;
  dateModified: string | undefined;
  locale: Language;
  locales: string[];
  tags?: string[];
  image?: { name: string; height: number; width: number };
  type?: 'Article' | 'Blog' | 'NewsArticle' | undefined;
}

export const ArticleSEO = memo(function ArticleSEO({
  slug,
  asPath,
  title,
  topic,
  description,
  datePublished,
  dateModified,
  locale,
  locales,
  tags,
  image,
  type,
}: ArticleSEO) {
  const titlePageSite = `${title} - ${siteName}`;
  const url = canonical + asPath;
  const urlEs = canonical + '/es' + asPath;
  const imageUrl = image ? canonical + `/images/${slug}/${image.name}` : defaultOGImagesUrl;
  const imageType = `image/${
    image
      ? image.name.endsWith('.jpg') || image.name.endsWith('.jpeg')
        ? 'jpeg'
        : image.name.endsWith('.png')
        ? 'png'
        : ''
      : ''
  }`;
  const oGImage = image
    ? {
        url: canonical + `/images/${slug}/${image.name}`,
        width: image.width,
        height: image.height,
        alt: title,
        type: imageType,
      }
    : defaultOGImages;
  const languageAlternates = [];
  locales.forEach((localeParam) => {
    if (localeParam !== locale) {
      languageAlternates.push({ href: localeParam === 'en' ? url : urlEs, hrefLang: localeParam });
    }
  });
  languageAlternates.push({ href: url, hrefLang: 'x-default' });
  return (
    <>
      <NextSeo
        title={titlePageSite}
        description={description}
        canonical={locale === 'en' ? url : urlEs}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: datePublished,
            modifiedTime: dateModified ? dateModified : undefined,
            authors: [siteName],
            section: topic,
            tags: tags,
          },
          url: locale === 'en' ? url : urlEs,
          title: title,
          description: description,
          images: [oGImage], // ? [oGImage] : undefined,
          locale: locale,
        }}
      />
      <ArticleJsonLd
        type={type ? type : undefined}
        url={url}
        title={title}
        images={[imageUrl]}
        datePublished={datePublished}
        dateModified={dateModified ? dateModified : datePublished}
        authorName={siteName}
        description={description}
      />
    </>
  );
});

interface SEO {
  pageKey: DictKeys;
  locale: Language;
  locales: string[];
  asPath?: string;
  description?: string;
  title?: string;
}

export default memo(function SEO({ pageKey, asPath, description, locale, locales, title }: SEO) {
  const intl = useIntl();
  const titlePageSite = title
    ? `${title} - ${siteName}`
    : pageKey === 'home'
    ? `${siteName} - ${intl.formatMessage({ id: 'slogan', defaultMessage: 'DeFi developer' })}`
    : `${dictKeys[pageKey][locale]} - ${siteName}`;
  const url = canonical + asPath;
  const urlEs = canonical + '/es' + asPath;
  const languageAlternates = [];
  locales.forEach((localeParam) => {
    if (localeParam !== locale) {
      languageAlternates.push({ href: localeParam === 'en' ? url : urlEs, hrefLang: localeParam });
    }
  });
  languageAlternates.push({ href: url, hrefLang: 'x-default' });
  return (
    <NextSeo
      title={titlePageSite}
      description={description ? description : defaultDescription[locale]}
      canonical={locale === 'en' ? url : urlEs}
      languageAlternates={languageAlternates}
      openGraph={{
        type: ogType,
        locale: locale,
        url: locale === 'en' ? url : urlEs,
        title: titlePageSite,
        description: description ? description : defaultDescription[locale],
        images: [defaultOGImages],
      }}
    />
  );
});
