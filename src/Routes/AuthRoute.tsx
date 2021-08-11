import { FC, ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuthHook from '../hooks/useAuthHook';

/**
 * If user authenticated block user to access Login , register, subpages!
 */

const AuthRoute: FC<RouteProps> = ({ children, ...props }): ReactElement => {
    const [isAuthenticated] = useAuthHook();
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
