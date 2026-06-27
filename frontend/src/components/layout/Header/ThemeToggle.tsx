import React from 'react'
import { toggleTheme } from '@/features/theme/themeSlice';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux'

import styles from './Header.module.scss';

function ThemeToggle() {

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme)

  return (


    <button
      className={styles.toggle}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      <span className={theme.mode === 'light' ? styles.active : ''}>
        ☀️
      </span>

      <div className={styles.switch}>
        <div className={`${styles.circle} ${theme.mode === 'dark' ? styles.dark : ''}`} />
      </div>
      <span className={theme.mode === 'dark' ? styles.active : ''}>
        🌙
      </span>

    </button>
  )
}

export default ThemeToggle