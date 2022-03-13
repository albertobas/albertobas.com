import { useRouter } from 'next/router';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMemo } from 'react';
import { Headings, MdxMetadataCard, MdxMetadataPost } from 'src/utils/interfaces/post';
import styles from 'src/styles/modules/layout/blogpost.module.css';
import { Language } from 'src/utils/interfaces/languages';
import Breadcrumbs from 'src/components/utils/Breadcrumbs';
import SVG from 'src/components/utils/SVG';
import DateFormatter from 'src/components/utils/DateFormatter';
import { ArticleSEO } from 'src/components/utils/SEO';
import { getItemsFromCards } from 'src/utils/helpers/post';
import { hrefColab, hrefGithub } from 'src/utils/constants';
import { join } from 'path';
import { toHashTag } from 'src/utils/helpers/tags';
import Tooltip from 'src/components/utils/Tooltip';
import { ItemExtended } from 'src/utils/interfaces/architecture';
import ILink from 'src/components/utils/ILink';
import TOC from 'src/components/utils/TOC';
import MDX from 'src/components/MDX/MDX';
import { useInView } from 'react-intersection-observer';
import ScrollToTop from '../utils/ScrollToTop';
import { useDelayedRender } from 'src/utils/hooks';
import SectionCards from 'src/components/home-page/SectionCards';

type Props = MdxMetadataPost & {
  children: React.ReactNode;
  relatedPosts: MdxMetadataCard[];
  headings: Headings[];
  locale: Language;
  locales: string[];
};

const BlogPost = ({
  children,
  slug,
  title,
  section,
  topic,
  description,
  readingTime,
  datePublished,
  dateModified,
  image,
  tags,
  tech,
  introduction,
  relatedPosts,
  github,
  headings,
  locale,
  locales,
}: Props) => {
  const tagsArray = useMemo(
    () => (tags || tech ? (getItemsFromCards(tags + ',' + tech, 'tags', locale) as ItemExtended[]) : undefined),
    [tags, tech, locale]
  );
  const intl = useIntl();
  const asPath = useRouter().asPath;
  const [refMdx, inViewMdx] = useInView({ triggerOnce: false, rootMargin: '0px 0px -100%' });
  const [refRelated, inViewRelated] = useInView({ triggerOnce: false, rootMargin: '0px 0px 0px' });
  const { isMounted, isRendered } = useDelayedRender(inViewMdx && !inViewRelated, 0, 250);
  return (
    <>
      <ArticleSEO
        slug={slug}
        asPath={asPath}
        title={title}
        topic={topic}
        tags={tagsArray?.map((tag) => {
          return tag.label;
        })}
        description={description}
        datePublished={datePublished}
        dateModified={dateModified}
        image={image}
        locale={locale}
        locales={locales}
      />
      <Breadcrumbs pageTitle={title} />
      <article className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {(datePublished || dateModified || readingTime.words > 0) && (
          <div className={styles.meta}>
            {(datePublished || dateModified) && (
              <span>
                {dateModified
                  ? intl.formatMessage({ id: 'dateUpdated', defaultMessage: 'Updated on' })
                  : intl.formatMessage({ id: 'datePublished', defaultMessage: 'Published on' }) + ' '}
                <DateFormatter dateString={dateModified ? dateModified : datePublished} locale={locale} />
              </span>
            )}
            {readingTime.words > 0 && (
              <span>
                {Math.round(readingTime.minutes) +
                  ' ' +
                  intl.formatMessage({ id: 'reading', defaultMessage: 'min read' })}
              </span>
            )}
          </div>
        )}
        {image && (
          <div className={styles.imgWrapper}>
            <Image
              src={`/images/${slug}/${image.name}`}
              alt={title}
              layout="responsive"
              objectFit="cover"
              width={720}
              height={480}
              priority
            />
          </div>
        )}
        {github &&
          (github.file && github.file.endsWith('.ipynb') ? (
            <div className={styles.layoutColabGithub}>
              <div>
                <ILink href={hrefColab + '/' + github.repo + '/blob/main/' + github.file}>
                  <SVG icon="colab" />
                  <FormattedMessage id="openColab" defaultMessage="Open in Colab" />
                </ILink>
              </div>
              <div>
                <ILink href={hrefGithub + '/' + github.repo + '/blob/main/' + github.file}>
                  <SVG icon="github" />
                  <FormattedMessage id="viewGithub" defaultMessage="View on GitHub" />
                </ILink>
              </div>
            </div>
          ) : (
            <div className={styles.layoutColabGithub}>
              <div>
                <ILink href={hrefGithub + '/' + github.repo}>
                  <SVG icon="github" />
                  <FormattedMessage id="viewGithub" defaultMessage="View on GitHub" />
                </ILink>
              </div>
            </div>
          ))}
        {(tags || tech) && (
          <div className={styles.tags}>
            <ul>
              {tagsArray?.map((tag) => {
                return (
                  <li key={tag.value}>
                    <ILink href={join('/tags', tag.value)}>
                      {tag.description ? (
                        <Tooltip content={tag.description} placement="bottom">
                          <span>{toHashTag(tag.label)}</span>
                        </Tooltip>
                      ) : (
                        toHashTag(tag.label)
                      )}
                    </ILink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {introduction && (
          <div className={styles.intro}>
            <MDX code={introduction} components={{ a: ILink }} />
          </div>
        )}
        {headings.length > 0 && (
          <div className={styles.toc}>
            <TOC headings={headings} />
          </div>
        )}
        <div ref={refMdx} className={styles.mdx}>
          {children}
        </div>
      </article>
      {headings.length > 0 && isMounted && (
        <div className={isRendered ? styles.tocAside : styles.tocAsideTransparent}>
          <TOC headings={headings} />
        </div>
      )}
      {isMounted && <ScrollToTop isVisible={isRendered} />}
      <div ref={refRelated} className={styles.related}>
        {relatedPosts.length > 0 && (
          <>
            <hr className={styles.hr} />
            <SectionCards
              cards={relatedPosts}
              section={section}
              heading={intl.formatMessage({ id: 'relatedPosts', defaultMessage: 'Related posts' })}
              locale={locale}
              isLinkDisabled
            />
          </>
        )}
      </div>
    </>
  );
};
export default BlogPost;
