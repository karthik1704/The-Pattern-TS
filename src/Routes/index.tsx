import { FC, ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import About from '../pages/About';
import Contact from '../pages/Contact';
import Donation from '../pages/Donation';
import EmailVerify from '../pages/EmailVerify';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyBoardDetail from '../pages/MyBoardDetail';
import MyBoards from '../pages/MyBoards';
import Page404 from '../pages/Page404';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Profile from '../pages/Profile';
import ProjectDetail from '../pages/ProjectDetail';
import Register from '../pages/Register';
import Requests from '../pages/Requests';
import PrivateRoute from './PrivateRoute';

const Routes: FC = (): ReactElement => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} exact />
            <Route path="/contact" component={Contact} exact />
            <Route path="/donate" component={Donation} exact />
            <Route path="/email/verify/:key" component={EmailVerify} exact />
            <Route path="/login" component={Login} exact />
            <PrivateRoute path="/myboards" exact>
                <MyBoards />
            </PrivateRoute>
            <PrivateRoute path="/myboards/:slug" exact>
                <MyBoardDetail />
            </PrivateRoute>
            <Route path="/register" component={Register} exact />
            <Route path="/request" component={Requests} exact />
            <Route path="/privacy" component={PrivacyPolicy} exact />
            <PrivateRoute path="/profile" exact>
                <Profile />
            </PrivateRoute>
            <Route path="/view/:slug" component={ProjectDetail} exact />
            <Route path="*" component={Page404} exact />
        </Switch>
    );
};

export default Routes;
