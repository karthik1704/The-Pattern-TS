import { ReactElement } from 'react';
import { RouteProps, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useReduxHooks';
// import useAuth from '../hooks/useAuthHook';

/**
 * If user authenticated block user to access Login , register, subpages!
 */
interface RequireAuthProps {
    redirectTo: string;
}

function AuthRoute({ children, redirectTo }: RouteProps & RequireAuthProps) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}

export default AuthRoute;
