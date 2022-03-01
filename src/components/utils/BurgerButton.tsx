import { useIntl } from 'react-intl';
import { Language } from 'src/utils/interfaces/languages';
import styles from 'src/styles/modules/components/utils/burgerbutton.module.css';

type Props = {
  isClicked: boolean;
  onClick(): void;
  locale: Language;
};

const BurgerButton = ({ isClicked, onClick }: Props) => {
  const intl = useIntl();
  return (
    <button
      aria-label={intl.formatMessage({ id: 'mobileMenu', defaultMessage: 'Mobile menu' })}
      className={styles.btn}
      onClick={onClick}
    >
      <div className={styles.container}>
        <span className={`${styles.top} ${isClicked ? styles.topClicked : styles.topUnclicked}`} />
        <span className={`${styles.bottom} ${isClicked ? styles.bottomClicked : styles.bottomUnclicked}`} />
      </div>
    </button>
  );
};

export default BurgerButton;
