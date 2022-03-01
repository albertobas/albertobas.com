import React, { DetailedHTMLProps, FC } from 'react';
import SVG from 'src/components/utils/SVG';
import styles from 'src/styles/modules/components/utils/mdxlists.module.css';

export const ILi: FC<DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>> = (props) => {
  return (
    <li className={styles.li}>
      <SVG icon="arrowRight" />
      <span>{props.children}</span>
    </li>
  );
};
export const IUl: FC<DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>> = (props) => {
  return <ul className={styles.ul}>{props.children}</ul>;
};
export const IOl: FC<DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>> = (props) => {
  return <ol className={styles.ol}>{props.children}</ol>;
};
