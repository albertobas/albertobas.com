import { DetailedHTMLProps, FC, TableHTMLAttributes } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from 'src/styles/modules/components/utils/dataframe.module.css';

const DataFrame: FC<DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>> = (props) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '150px 0px 20px' });
  return (
    <table className={styles.dataframe} ref={ref} {...props}>
      {inView ? props.children : null}
    </table>
  );
};
export default DataFrame;
