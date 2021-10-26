import { FC, ReactElement } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
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

    return isAuthenticated ? <> {children} </> : <Navigate to={redirectTo} />;
};

export default RequireAuth;
