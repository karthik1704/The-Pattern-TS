import { FC, ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';

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

// import AuthRoute from './AuthRoute';
import RequireAuth from './PrivateRoute';

const AppRoutes: FC = (): ReactElement => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="donate" element={<Donation />} />
                <Route path="request" element={<Requests />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="myboards">
                    <Route
                        index
                        element={
                            <RequireAuth redirectTo="/login">
                                <MyBoards />
                            </RequireAuth>
                        }
                    />
                    <Route path=":slug" element={<MyBoardDetail />} />
                </Route>
                <Route
                    path="profile"
                    element={
                        <RequireAuth redirectTo="/login">
                            <Profile />
                        </RequireAuth>
                    }
                />
                <Route path="view/:slug" element={<ProjectDetail />} />
            </Route>

            <Route path="email/verify/:key" element={<EmailVerify />} />
            <Route path="login" element={<Login />} />

            <Route path="register" element={<Register />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AppRoutes;
