import axios from 'axios';
import { useEffect } from 'react';
import { Auth, loginUser, logoutUser } from '../features/auth/authSlice';
import { User } from '../types/types';
import { useAppSelector, useAppDispatch } from './useReduxHooks';

const useAuthHook = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const setIsAuth = (
        isLocalAuth: boolean,
        data?: Omit<Auth, 'isAuthenticated'>
    ) => {
        if (isLocalAuth) {
            dispatch(
                loginUser({
                    // '!' is Non-null assertion operator in TS
                    isAuthenticated: isLocalAuth,
                    access_token: data!.access_token,
                    refresh_token: data!.refresh_token,
                    user: data!.user,
                })
            );
        } else {
            dispatch(logoutUser(isLocalAuth));
        }
    };

    const getUser = (accessToken: string) => {
        let user: User | null = null;
        axios
            .get(`${process.env.React_API_URL}auth/user/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(({ data }) => {
                user = data;
            })
            .catch((err) => setIsAuth(false));
        return user;
    };

    const checkOrGetNewToken = (accessToken: string, refresh: string) => {
        axios
            .post(`${process.env.React_API_URL}auth/token/refresh/`, {
                refresh,
            })
            .then((res) => {
                window.localStorage.setItem('access_token', res.data.access);
                const user = getUser(res.data.access);
                setIsAuth(true, {
                    access_token: accessToken,
                    refresh_token: refresh,
                    user,
                });
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
