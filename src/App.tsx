import { ReactElement, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { Helmet } from 'react-helmet';

import Routes from './Routes';
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

function App(): ReactElement {
    const [theme] = useToggleTheme();

    const { data } = useGetJokesQuery('programming');
    const { data: projectData } = useGetProjectsQuery();
    console.log('data', data);
    console.log('ProjectData', projectData);
    const selectedTheme = useMemo(
        () => createTheme(getThemeByName(theme)),
        [theme]
    );
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
                        <Routes />
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
