import { DetailedHTMLProps, FC } from 'react';
import styles from 'src/styles/modules/components/utils/cellout.module.css';
const CellOut: FC<DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props: any) => {
  return (
    <div className={styles.cellOut} {...props}>
      {props.children}
    </div>
  );
};
export default CellOut;
