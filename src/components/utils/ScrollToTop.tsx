import SVG from './SVG';
import styles from 'src/styles/modules/components/utils/scrolltotop.module.css';

const ScrollToTop = ({ isVisible = true }: { isVisible?: boolean }) => {
  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className={isVisible ? styles.container : styles.containerTransparent} onClick={handleScrollUp}>
      <SVG icon="arrowUp" dim={{ width: 2, height: 2 }} />
    </div>
  );
};

export default ScrollToTop;
