import { FC, ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../hooks/useReduxHooks';

const PrivateRoute: FC<RouteProps> = ({ children, ...props }): ReactElement => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
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
