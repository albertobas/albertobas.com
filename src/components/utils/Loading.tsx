import { FormattedMessage } from 'react-intl';
import styles from 'src/styles/modules/components/utils/loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <p>
        <FormattedMessage id="loading" defaultMessage="Loading content..." />
      </p>
    </div>
  );
};

export default Loading;
