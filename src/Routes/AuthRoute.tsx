import { FC, ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../hooks/useReduxHooks';

/**
 * If user authenticated block user to access Login , register, subpages!
 */

const AuthRoute: FC<RouteProps> = ({ children, ...props }): ReactElement => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
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
