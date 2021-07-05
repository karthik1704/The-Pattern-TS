import { useEffect } from 'react';
import { changeTheme } from '../features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from './useReduxHooks';

type TTheme = 'dark' | 'light';

const useToggleTheme = () => {
    const { theme } = useAppSelector((state) => state.themes);
    const dispatch = useAppDispatch();

    const setMode = (mode: TTheme ) => {
        window.localStorage.setItem('theme', mode);
        dispatch(changeTheme(mode));
    };

    const setTheme = (theme: TTheme) => {
        if (theme === 'light') {
            setMode(theme);
        }
        if (theme === 'dark') {
            setMode(theme);
        }
    };

    useEffect(() => {
        const getLocalStorageTheme = window.localStorage.getItem('theme') as TTheme;

        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        !getLocalStorageTheme
            ? setMode('dark')
            : getLocalStorageTheme
            ? dispatch(changeTheme(getLocalStorageTheme))
            : setMode('light');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [theme, setTheme] as const;
};

export default useToggleTheme;
