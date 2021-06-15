import { FC, ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import ProjectDetail from '../pages/ProjectDetail';
import Register from '../pages/Register';
import Requests from '../pages/Requests';

const Routes: FC = (): ReactElement => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/request" component={Requests} exact />
            <Route path="/:slug" component={ProjectDetail} exact />
            <Route path="*" component={Page404} exact />
        </Switch>
    );
};

export default Routes;
