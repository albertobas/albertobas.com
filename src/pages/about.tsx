import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import Intro from 'src/components/utils/Intro';
import SEO from 'src/components/utils/SEO';
import { useLocale, useLocales } from 'src/utils/hooks';
import styles from 'src/styles/modules/pages/about.module.css';
import { dictKeys } from 'src/utils/dict';
import { hrefEmail, hrefGithub, hrefLinkedIn } from 'src/utils/constants';
import ILink, { ContactLink } from 'src/components/utils/ILink';

const pageKey = 'about';

const AboutPage = () => {
  const locale = useLocale();
  const locales = useLocales();
  const asPath = useRouter().asPath;
  const intl = useIntl();
  return (
    <>
      <SEO
        pageKey={pageKey}
        asPath={asPath}
        description={intl.formatMessage({
          id: 'aboutDescription',
          defaultMessage: 'Brief introduction of Alberto Bas',
        })}
        locale={locale}
        locales={locales}
      />
      <div className={styles.containerMargin}>
        <Intro heading={dictKeys[pageKey][locale]} />
      </div>
      <div className={styles.container}>
        <p>
          <FormattedMessage
            id="aboutP1"
            defaultMessage="I'm Alberto Bas, a defi developer from Spain. I've written 
            this page to gather and publish some work and projects mainly about cryptography, blockchain and data science."
          />
        </p>
        <p>
          <FormattedMessage
            id="aboutP2"
            defaultMessage="I try to cover concepts like <smartcontracts></smartcontracts>, flash loans and swaps, crypto wallets, 
            ZK-SNARKs and others mostly about <defi></defi> generally coding decentralized applications which I usually develop using <reactjs></reactjs> 
            components and <typescript></typescript>, sometimes using <nextjs></nextjs>. I code smart contracts in <solidity></solidity> 
            and Vyper. The development environments I usually use are <hardhat></hardhat> and Brownie."
            values={{
              defi: () => (
                <ILink className={styles.internal} href={'/tags/defi'}>
                  <FormattedMessage id="defi" defaultMessage="decentralized finance" />
                </ILink>
              ),
              hardhat: () => (
                <ILink className={styles.internal} href={'/tags/hardhat'}>
                  Hardhat
                </ILink>
              ),
              nextjs: () => (
                <ILink className={styles.internal} href={'/tags/next-js'}>
                  Next.js
                </ILink>
              ),
              reactjs: () => (
                <ILink className={styles.internal} href={'/tags/react-js'}>
                  React.js
                </ILink>
              ),
              smartcontracts: () => (
                <ILink className={styles.internal} href={'/tags/smart-contracts'}>
                  <FormattedMessage id="smartContracts" defaultMessage="smart contracts" />
                </ILink>
              ),
              solidity: () => (
                <ILink className={styles.internal} href={'/tags/solidity'}>
                  Solidity
                </ILink>
              ),
              typescript: () => (
                <ILink className={styles.internal} href={'/tags/typescript'}>
                  Typescript
                </ILink>
              ),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="aboutP3"
            defaultMessage="In regards to data science, I have knowledge of parametric and non-parametric modeling in <supervisedlearning></supervisedlearning>, 
            and of clustering and PCA techniques in unsupervised learning. I usually code in <python></python> and use libraries such as <scikitlearn></scikitlearn>, 
            <xgboost></xgboost>, <lightgbm></lightgbm>. I have experience of implementing and optimizing feed-forward and <cnn></cnn> as well as recurrent (<lstm></lstm> and <gru></gru>) 
            and recursive networks. I primarily use <pytorch></pytorch> but also TensorFlow and Keras. I perform <eda></eda> using python libraries (<pandas></pandas>, <numpy></numpy>, 
            <scipy></scipy>, <matplotlib></matplotlib> and <seaborn></seaborn>)."
            values={{
              cnn: () => (
                <ILink className={styles.internal} href={'/tags/convolutional-neural-network'}>
                  <FormattedMessage id="convolutional" defaultMessage="convolutional" />
                </ILink>
              ),
              eda: () => (
                <ILink className={styles.internal} href={'/tags/exploratory-data-analysis'}>
                  <FormattedMessage id="exploratoryDataAnalysis" defaultMessage="exploratory data analysis" />
                </ILink>
              ),
              gru: () => (
                <ILink className={styles.internal} href={'/tags/gru'}>
                  GRU
                </ILink>
              ),
              lightgbm: () => (
                <ILink className={styles.internal} href={'/tags/lgbm-regressor'}>
                  LightGBM
                </ILink>
              ),
              lstm: () => (
                <ILink className={styles.internal} href={'/tags/lstm'}>
                  LSTM
                </ILink>
              ),
              matplotlib: () => (
                <ILink className={styles.internal} href={'/tags/matplotlib'}>
                  Matplotlib
                </ILink>
              ),
              numpy: () => (
                <ILink className={styles.internal} href={'/tags/numpy'}>
                  Numpy
                </ILink>
              ),
              pandas: () => (
                <ILink className={styles.internal} href={'/tags/pandas'}>
                  Pandas
                </ILink>
              ),
              python: () => (
                <ILink className={styles.internal} href={'/tags/python'}>
                  python
                </ILink>
              ),
              pytorch: () => (
                <ILink className={styles.internal} href={'/tags/pytorch'}>
                  PyTorch
                </ILink>
              ),
              scikitlearn: () => (
                <ILink className={styles.internal} href={'/tags/scikit-learn'}>
                  Scikit Learn
                </ILink>
              ),
              scipy: () => (
                <ILink className={styles.internal} href={'/tags/scipy'}>
                  SciPy
                </ILink>
              ),
              seaborn: () => (
                <ILink className={styles.internal} href={'/tags/seaborn'}>
                  Seaborn
                </ILink>
              ),
              supervisedlearning: () => (
                <ILink className={styles.internal} href={'/tags/supervised-learning'}>
                  <FormattedMessage id="supervisedLearning" defaultMessage="supervised learning" />
                </ILink>
              ),
              xgboost: () => (
                <ILink className={styles.internal} href={'/tags/xgb-regressor'}>
                  XGBoost
                </ILink>
              ),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="aboutP4"
            defaultMessage="You can contact me by <email></email> and on <github></github> and <linkedin></linkedin>."
            values={{
              email: () => <ContactLink href={hrefEmail}>e-mail</ContactLink>,
              github: () => <ContactLink href={hrefGithub}>GitHub</ContactLink>,
              linkedin: () => <ContactLink href={hrefLinkedIn}>LinkedIn</ContactLink>,
            }}
          />
        </p>
      </div>
    </>
  );
};

export default AboutPage;
