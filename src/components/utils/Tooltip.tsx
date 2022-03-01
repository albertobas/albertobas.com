import Tippy from '@tippyjs/react/headless';
import { TippyProps } from '@tippyjs/react';
import { FC, useState } from 'react';
import styles from 'src/styles/modules/components/utils/tooltip.module.css';

const Tooltip: FC<TippyProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  if (!props.content) {
    return <>{props.children}</>;
  }
  const lazyPlugin = {
    fn: () => ({
      onMount: () => {
        setIsMounted(true);
      },
      onHidden: () => {
        setIsMounted(false);
      },
    }),
  };
  const computedProps = { ...props };
  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];
  if (props.render) {
    const render = props.render;
    computedProps.render = (...args) => (isMounted ? render(...args) : null);
  } else {
    computedProps.content = isMounted ? props.content : null;
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
