import { NavLink } from 'react-router-dom';

import styles from './CategoryTabs.module.scss';
import { useTranslation } from 'react-i18next';

const categories = [
    { label: 'home', path: '/home' },
    { label: 'electronics', path: '/home/electronic' },
    { label: 'fashion', path: '/home/fashion' },
    { label: 'decor', path: '/home/decor' },
    { label: 'food', path: '/home/food' },
    { label: 'healthcare', path: '/home/healthcare' },
];

const CategoryTabs = () => {
    const { t } = useTranslation();

    return (
        <nav className={styles.tabs}>
            {categories.map((tab) => (
                <NavLink
                    key={tab.path}
                    to={tab.path}
                    end={tab.path === '/home'}
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ''}`
                    }>
                    {t(tab.label)}
                </NavLink>
            ))}
        </nav>
    );
};

export default CategoryTabs;