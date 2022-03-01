import { useRouter } from 'next/router';
import { BreadcrumbJsonLd } from 'next-seo';
import styles from 'src/styles/modules/components/utils/breadcrumbs.module.css';
import { useBreadcrumbs } from 'src/utils/hooks';
import ILink from 'src/components/utils/ILink';

export default function Breadcrumbs({ pageTitle }: { pageTitle?: string }) {
  const router = useRouter();
  const { breadcrumbs, breadcrumbsJsonLd } = useBreadcrumbs(pageTitle);
  return (
    <>
      {breadcrumbsJsonLd && <BreadcrumbJsonLd itemListElements={breadcrumbsJsonLd} />}
      {breadcrumbs && (
        <div className={styles.container}>
          <nav aria-label="Breadcrumb">
            <ol>
              {breadcrumbs.map((breadcrumb) => {
                return (
                  <li key={breadcrumb.href}>
                    {breadcrumb.href === router.asPath ? (
                      breadcrumb.label
                    ) : (
                      <ILink href={breadcrumb.href}>{breadcrumb.label}</ILink>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      )}
    </>
  );
}
