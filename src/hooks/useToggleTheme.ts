import { useEffect } from 'react';
import { changeTheme } from '../data/theme/themeSlice';
import { useAppDispatch, useAppSelector } from './ReduxHooks';

const useToggleTheme = () => {
    const { theme } = useAppSelector((state) => state.themes);
    const dispatch = useAppDispatch();

    const setMode = (mode: 'dark' | 'light') => {
        window.localStorage.setItem('theme', mode);
        dispatch(changeTheme(mode));
    };

    const setTheme = (theme: 'dark' | 'light') => {
        if (theme === 'light') {
            setMode(theme);
        }
        if (theme === 'dark') {
            setMode(theme);
        }
    };

    useEffect(() => {
        const getLocalStorageTheme = window.localStorage.getItem('theme');
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        !getLocalStorageTheme
            ? setMode('dark')
            : getLocalStorageTheme
            ? dispatch(changeTheme(getLocalStorageTheme))
            : setMode('light');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [theme, setTheme];
};

export default useToggleTheme;
