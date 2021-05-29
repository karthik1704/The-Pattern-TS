import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './routes';
import useToggleTheme from './hooks/useToggleTheme';
import { dark, light } from './theme';

import './App.css';

function App(): ReactElement {
    const [theme] = useToggleTheme();
    return (
        <ThemeProvider theme={theme === 'light' ? light : dark}>
            <Router>
                <Routes />
            </Router>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
