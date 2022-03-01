import Header from 'src/components/layouts/Header';
import { useMobileContext } from 'src/components/context/MobileProvider';
import styles from 'src/styles/modules/layout/sitelayout.module.css';
import dynamic from 'next/dynamic';
const Footer = dynamic(() => import('src/components/layouts/Footer'));

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobileMenu } = useMobileContext();
  return (
    <>
      <Header />
      <main className={isMobileMenu ? styles.hidden : undefined}>{children}</main>
      <Footer />
    </>
  );
};
export default SiteLayout;
