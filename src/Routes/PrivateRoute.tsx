import { FC, ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuth from '../hooks/useAuthHook';

const PrivateRoute: FC<RouteProps> = ({ children, ...props }): ReactElement => {
    const [isAuthenticated] = useAuth();

    return (
        <Route
            {...props}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: location,
                            },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
