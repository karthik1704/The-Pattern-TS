import axios from 'axios';
import { useEffect } from 'react';
import { loginUser, logoutUser } from '../features/auth/authSlice';
import { useAppSelector, useAppDispatch } from './useReduxHooks';

const useAuthHook = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const setIsAuth = (isLocalAuth: boolean) => {
        if (isLocalAuth) {
            dispatch(loginUser(isLocalAuth));
        } else {
            dispatch(logoutUser(isLocalAuth));
        }
    };
    const checkOrGetNewToken = (AccessToken: string, refresh: string) => {
        axios
            .post(`${process.env.React_API_URL}auth/token/refresh/`, {
                refresh,
            })
            .then((res) => {
                window.localStorage.setItem('access_token', res.data.access);
            })
            .catch((err) => {
                setIsAuth(false);
            });
    };

    useEffect(() => {
        const localIsAuth = window.localStorage.getItem('isAuthenticated');
        const localAccessToken = window.localStorage.getItem(
            'access_token'
        ) as string;
        const localRefreshToken = window.localStorage.getItem(
            'refresh'
        ) as string;
        localIsAuth === 'true'
            ? checkOrGetNewToken(localAccessToken, localRefreshToken)
            : setIsAuth(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [isAuthenticated, setIsAuth] as const;
};

export default useAuthHook;
