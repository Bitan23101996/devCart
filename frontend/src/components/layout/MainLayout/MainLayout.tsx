import React, { useEffect } from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import styles from './MainLayout.module.scss';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import { fetchCart } from '@/features/cart/cartSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/features/products/productSlice';


const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (user?.userid) {
      dispatch(fetchCart({ username: user.userid }));
    }
  }, [dispatch, user?.userid]);

  //Get all product : Home
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.mainLayout}>
      <div className={styles.stickyTop}>
        <Header />
        <CategoryTabs />
      </div>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

