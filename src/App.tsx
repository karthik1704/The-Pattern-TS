import { ReactElement, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { Helmet } from 'react-helmet';

import AppRoutes from './Routes';
import useToggleTheme from './hooks/useToggleTheme';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BackToTop from './components/common/BackToTop';
import { getThemeByName } from './theme';

import { APP_NAME } from './constants/base';

import {
    useGetJokesQuery,
    useGetProjectsQuery,
} from './features/projects/projectApiSlice';
import { authApi } from './features/auth/authApi';
import { useAppDispatch } from './hooks/useReduxHooks';
import { loginUser, logoutUser } from './features/auth/authSlice';

function App(): ReactElement {
    const [theme] = useToggleTheme();

    const dispatch = useAppDispatch();

    const { data } = useGetJokesQuery('programming');
    const { data: projectData } = useGetProjectsQuery();
    console.log('data', data);
    console.log('ProjectData', projectData);
    const selectedTheme = useMemo(
        () => createTheme(getThemeByName(theme)),
        [theme]
    );
    useEffect(() => {
        console.log('hey im running');
        const localIsAuthenticated = localStorage.getItem('isAuthenticated');
        const localAccessToken = localStorage.getItem('access_token');
        const localRefreshToken = localStorage.getItem('refresh_token');
        localIsAuthenticated && localAccessToken && localRefreshToken
            ? dispatch(
                  loginUser({
                      isAuthenticated: true,
                      access_token: localAccessToken,
                      refresh_token: localRefreshToken,
                  })
              )
            : logoutUser(false);
        let result;
        if (localIsAuthenticated) {
            result = dispatch(authApi.endpoints.getUser.initiate());
        }
        console.log('setting auth');
        return result?.unsubscribe;
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>{APP_NAME}</title>
                <meta
                    name="description"
                    content="Check out the hand-picked collection of latest mobile design patternsfrom apps that reflect the best in design"
                />
            </Helmet>
            <ThemeProvider theme={selectedTheme}>
                <Router>
                    <Paper
                        sx={{
                            minHeight: '100vh',
                        }}
                    >
                        <Header />
                        <AppRoutes />
                        <Footer />
                        <BackToTop />
                    </Paper>
                </Router>
                <CssBaseline />
            </ThemeProvider>
        </>
    );
}

export default App;
