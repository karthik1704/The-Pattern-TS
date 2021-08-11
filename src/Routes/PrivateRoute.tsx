import { FC, ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuthHook from '../hooks/useAuthHook';

const PrivateRoute: FC<RouteProps> = ({ children, ...props }): ReactElement => {
    const [isAuthenticated] = useAuthHook();

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
