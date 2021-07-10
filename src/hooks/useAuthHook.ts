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
        return;
    };

    useEffect(() => {
        const localIsAuth = window.localStorage.getItem(
            'isAuthenticated'
        ) as unknown as boolean;
        const localAccessToken = window.localStorage.getItem(
            'access_token'
        ) as string;
        const localRefreshToken = window.localStorage.getItem(
            'refresh'
        ) as string;
        localIsAuth
            ? checkOrGetNewToken(localAccessToken, localRefreshToken)
            : setIsAuth(localIsAuth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [isAuthenticated, setIsAuth] as const;
};

export default useAuthHook;
