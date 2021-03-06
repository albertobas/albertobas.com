import SVG from './SVG';
import styles from 'src/styles/modules/components/utils/scrolltotop.module.css';

const ScrollToTop = ({ isVisible = true }: { isVisible?: boolean }) => {
  return (
    <div className={isVisible ? styles.container : styles.containerTransparent}>
      <a href="#" aria-label="Scroll to top">
        <SVG icon="arrowUp" dim={{ width: 2.5, height: 2.5 }} />
      </a>
    </div>
  );
};

export default ScrollToTop;
