import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/ui/Button/Button';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>404</h1>

                <h2>{t('pageNotFound')}</h2>

                <p>
                     {t('pageNotFoundDescription')}
                </p>

                <Button type="button" onClick={() => navigate('/home')}>
                     {t('backToHome')}
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;