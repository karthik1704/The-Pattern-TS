import { FC, ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuth from '../hooks/useAuthHook';

/**
 * If user authenticated block user to access Login , register, subpages!
 */

const AuthRoute: FC<RouteProps> = ({ children, ...props }): ReactElement => {
    const [isAuthenticated] = useAuth();
    return (
        <Route
            {...props}
            render={({ location }) =>
                isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {
                                from: location,
                            },
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
};

export default AuthRoute;
