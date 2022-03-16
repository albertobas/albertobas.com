import Tippy from '@tippyjs/react/headless';
import { TippyProps } from '@tippyjs/react';
import { FC } from 'react';
import styles from 'src/styles/modules/components/utils/tooltip.module.css';

const Tooltip: FC<TippyProps> = (props) => {
  if (!props.content) {
    return <>{props.children}</>;
  }
  return (
    <Tippy
      render={(attrs, content) => (
        <div className={styles.tippyBox} {...attrs}>
          <div className={styles.tippyContent}>{props.content}</div>
        </div>
      )}
      {...props}
    >
      {props.children}
    </Tippy>
  );
};

export default Tooltip;
