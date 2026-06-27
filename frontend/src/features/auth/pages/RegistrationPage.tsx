import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '@/components/common/ui/Input/Input';
import Button from '@/components/common/ui/Button/Button';

import { validateRequired, validateUsername, validatePassword, validateConfirmPassword } from '@/utils/validation';
import { registerUser } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useTranslation } from 'react-i18next';
import { showError, showSuccess } from '@/utils/toast';

import styles from './Auth.module.scss';

export default function RegistrationPage() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
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
            validateRegistrationForm();
        }
    }, [i18n.language]);

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        clearFieldError('name');
    }

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        clearFieldError('username');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        clearFieldError('password');
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        clearFieldError('confirmPassword');
    };

    const validateRegistrationForm = () => {
        const registrationError = {
            // name: validateRequired(name, 'Full Name'),
            name: validateRequired(name, t('fullName')),
            username: validateUsername(username),
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(password, confirmPassword),
        };

        setErrors(registrationError);

        return Object.values(registrationError).every(x => !x);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateRegistrationForm()) {
            return;
        }

        try {
            const response = await dispatch(registerUser({ name, username, password })).unwrap();
            showSuccess(response.message);
            navigate('/');
        } catch (err: any) {
            showError(err.message);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <h1>{t('register')}</h1>

                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        id='fullName'
                        label={t('fullName')}
                        placeholder={t('fullName')}
                        value={name}
                        onChange={handleFullNameChange}
                        error={errors.name}
                        maxLength={50}
                        required
                    />

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

                    <Input
                        id='confirmPassword'
                        label={t('confirmPassword')}
                        placeholder={t('confirmPassword')}
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={errors.confirmPassword}
                        maxLength={30}
                        required

                    />

                    <Button type="submit" loading={loading}>
                        {t('register')}
                    </Button>
                </form>

                {/* {error && (<p>{error}</p>)} */}
                <div className={styles.authFooter}>
                    <span>{t('alreadyHaveAccount')}</span>
                    <Link to="/" className={styles.authLink}>
                        {t('backToLogin')}
                    </Link>
                </div>

            </div>
        </div>
    );
}