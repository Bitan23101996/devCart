import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

type Props = {
    children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
    const mode = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
    }, [mode]);

    return <>{children}</>;
};

export default ThemeProvider;