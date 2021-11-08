import { FC, ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Layout: FC = (): ReactElement => {
    return (
        <Box>
            <Header />
            <Box component="main" sx={{ height: '80vh' }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
