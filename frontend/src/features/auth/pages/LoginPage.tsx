import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState, AppDispatch } from '@/store/store';
import { loginUser } from '../authSlice';
import Input from '@/components/common/ui/Input/Input';
import Button from '@/components/common/ui/Button/Button';

import { validateUsername, validatePassword } from '@/utils/validation';
import { useTranslation } from 'react-i18next';
import { showSuccess, showError } from '@/utils/toast';

import styles from './Auth.module.scss';

export default function LoginPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const clearFieldError = (field: keyof typeof errors) => {
        setErrors(prev => ({
            ...prev,
            [field]: '',
        }));
    };

    //Re-render language  in case of form invalid
    useEffect(() => {
        if (Object.values(errors).some(Boolean)) {
            validateLoginForm();
        }
    }, [i18n.language]);

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        clearFieldError('username');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        clearFieldError('password');
    };

    //Form Validation
    const validateLoginForm = () => {

        const loginErrors = {
            username: validateUsername(username),
            password: validatePassword(password),
        };

        setErrors(loginErrors);

        return (!loginErrors.username && !loginErrors.password);
    };

    //Handle Login Form Submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateLoginForm()) {
            return;
        }
        try {
            await dispatch(loginUser({ username, password })).unwrap(); //extracts the raw payload on success or throws the error on failure
            showSuccess(t('loginSuccessful'));
            navigate('/home');
        } catch (err: any) {
            showError(err.message);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <h1>{t('login')}</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        id='username'
                        label={t('username')}
                        placeholder={t('username')}
                        value={username}
                        onChange={handleUserNameChange}
                        error={errors.username}
                        maxLength={20}
                        required

                    />

                    <Input
                        id='password'
                        label={t('password')}
                        placeholder={t('password')}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={errors.password}
                        maxLength={30}
                        required

                    />

                    <Button type="submit" loading={loading}>
                        {t('login')}
                    </Button>
                </form>

                {/* {error && (<p>{error}</p>)} */}

                <div className={styles.authFooter}>
                    <span>{t('newUser')}</span>
                    <Link to="/register" className={styles.authLink}>
                        {t('registerHere')}
                    </Link>
                </div>

            </div>
        </div>
    );
}