import { FC, ReactElement } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useReduxHooks';
//import useAuth from '../hooks/useAuthHook';

interface RequireAuthProps {
    redirectTo: string;
}

const RequireAuth: FC<RouteProps & RequireAuthProps> = ({
    children,
    redirectTo,
}): ReactElement => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    let location = useLocation();

    return isAuthenticated ? (
        <> {children} </>
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default RequireAuth;
