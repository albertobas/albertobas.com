import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from 'src/styles/modules/components/utils/projectsintro.module.css';

const ProjecstIntro: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default ProjecstIntro;
