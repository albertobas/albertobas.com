import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from 'src/styles/modules/components/utils/ilink.module.css';
import Tooltip from './Tooltip';

const ILink: FC<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props) => {
  const href = props.href;
  const isInternal = href && href.startsWith('/');
  const isAnchor = href && href.startsWith('#');
  if (isInternal) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  } else if (isAnchor) {
    return <a href={href} {...props} />;
  } else {
    return <a className={styles.external} target="_blank" rel="nofollow noreferrer noopener" {...props} />;
  }
};
export default ILink;

export const ContactLink: FC<{ href: string }> = ({ children, href, ...props }) => {
  return (
    <Tooltip content={href} placement="bottom">
      <span>
        <ILink className={styles.externalContact} href={href} {...props}>
          {children}
        </ILink>
      </span>
    </Tooltip>
  );
};
