import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMemo } from 'react';
import { Headings, MdxMetadataCard, MdxMetadataPost } from 'src/utils/interfaces/post';
import styles from 'src/styles/modules/layout/projectspost.module.css';
import { Language } from 'src/utils/interfaces/languages';
import Breadcrumbs from 'src/components/utils/Breadcrumbs';
import SVG from 'src/components/utils/SVG';
import DateFormatter from 'src/components/utils/DateFormatter';
import { ArticleSEO } from 'src/components/utils/SEO';
import { getItemsFromCards } from 'src/utils/helpers/post';
import { hrefColab, hrefGithub } from 'src/utils/constants';
import { ItemExtended } from 'src/utils/interfaces/architecture';
import TOC from 'src/components/utils/TOC';
import Tag from 'src/components/tags/Tag';
import ILink from '../utils/ILink';

const SectionCards = dynamic(() => import('src/components/home-page/SectionCards'));

type Props = MdxMetadataPost & {
  children: React.ReactNode;
  relatedProjects: MdxMetadataCard[];
  headings: Headings[];
  locale: Language;
  locales: string[];
};

const ProjectsPost = ({
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
  relatedProjects,
  github,
  link,
  headings,
  locale,
  locales,
}: Props) => {
  const tagsArray = useMemo(
    () => (tags || tech ? (getItemsFromCards(tags + ',' + tech, 'tags', locale) as ItemExtended[]) : undefined),
    [tags, tech, locale]
  );
  const asPath = useRouter().asPath;
  const intl = useIntl();
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
        <div className={styles.content}>
          {image && (
            <div className={styles.imgWrapper}>
              <Image
                src={`/images/${slug}/${image.name}`}
                alt={title}
                layout="responsive"
                objectFit={'cover'}
                width={1024}
                height={400}
                quality={100}
                priority
              />
            </div>
          )}
          <div className={styles.layoutDateLink}>
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
                  <>
                    <span className={styles.separator}>/</span>
                    <span>
                      {Math.round(readingTime.minutes) +
                        ' ' +
                        intl.formatMessage({ id: 'reading', defaultMessage: 'min read' })}
                    </span>
                  </>
                )}
              </div>
            )}
            {
              <div className={styles.layoutLinkGithub}>
                {link && (
                  <div>
                    <ILink href={link}>
                      <SVG icon="colab" />
                      <FormattedMessage id="goToWeb" defaultMessage="Go to website" />
                    </ILink>
                  </div>
                )}
                {github && (
                  <div>
                    <ILink href={hrefGithub + '/' + github.repo}>
                      <SVG icon="github" />
                      <FormattedMessage id="viewGithub" defaultMessage="View on GitHub" />
                    </ILink>
                  </div>
                )}
              </div>
            }
          </div>
          {(tags || tech) && (
            <div className={styles.tags}>
              <ul>
                {tagsArray?.map((tag) => {
                  return (
                    <li key={tag.value}>
                      <Tag tag={tag as ItemExtended} />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {headings.length > 0 && (
            <div className={styles.toc}>
              <TOC headings={headings} isProjects behavior="smooth" />
            </div>
          )}
          <div className={styles.mdx}>{children}</div>
        </div>
      </article>
      {relatedProjects.length > 0 && (
        <div className={styles.similar}>
          <hr className={styles.hr} />
          <SectionCards
            cards={relatedProjects}
            section={section}
            heading={intl.formatMessage({ id: 'relatedProjects', defaultMessage: 'Similar projects' })}
            locale={locale}
            isLinkDisabled
          />
        </div>
      )}
    </>
  );
};
export default ProjectsPost;
