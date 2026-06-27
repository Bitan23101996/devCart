import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <p>
        © {t('copyright')}
      </p>
    </footer>
  );
};

export default Footer;