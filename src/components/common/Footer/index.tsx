import { FC, ReactElement } from 'react';
import { APP_NAME } from '../../../constants/base';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { Button, Link } from '@mui/material';

import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';

// Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';

import useToggleTheme from '../../../hooks/useToggleTheme';

// React Code
interface QLinks extends RouterLinkProps {
    name: string;
}

const quickLinks: QLinks[] = [
    {
        name: 'About',
        to: '/about',
    },
    {
        name: 'Contact',
        to: '/contact',
    },
    {
        name: 'Privacy & Policy',
        to: '/privacy',
    },
];

const Footer: FC = (Props): ReactElement => {
    const [theme, setTheme] = useToggleTheme();

    const onHandleDarkMode = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <>
            <Container
                maxWidth="lg"
                component="footer"
                sx={{
                    display: 'flex',
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    marginTop: 1,
                    paddingTop: 3,
                    paddingBottom: 3,
                }}
            >
                <Grid container spacing={4} justifyContent="space-evenly">
                    <Grid item xs={12} md={3}>
                        <Link
                            variant="h6"
                            noWrap
                            color="textPrimary"
                            gutterBottom
                            underline="none"
                            component={RouterLink}
                            to="/"
                        >
                            {APP_NAME}
                        </Link>
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            paragraph
                        >
                            Check out the hand-picked collection of latest
                            mobile design patternsfrom apps that reflect the
                            best in design.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h6"
                            component="p"
                            color="textPrimary"
                            gutterBottom
                            noWrap
                        >
                            Quick Link
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="column"
                            flexWrap="wrap"
                        >
                            {quickLinks.map((link) => (
                                <Link
                                    sx={{
                                        mb: 1,
                                    }}
                                    component={RouterLink}
                                    to={link.to}
                                    key={link.name}
                                    color="textSecondary"
                                    variant="subtitle2"
                                    underline="hover"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                sx={{
                                    cursor: 'pointer',
                                }}
                                color="textSecondary"
                                variant="subtitle2"
                                onClick={onHandleDarkMode}
                                underline="hover"
                            >
                                Dark Mode
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h6"
                            component="p"
                            color="textPrimary"
                            gutterBottom
                            noWrap
                        >
                            Social
                        </Typography>
                        <IconButton
                            href="https://instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            href="https://fb.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            href="https://reddit.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <RedditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h6"
                            component="p"
                            color="textPrimary"
                            gutterBottom
                            noWrap
                        >
                            Donate
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            gutterBottom
                        >
                            Please support our page to give more valuable
                            content.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to="/donate"
                        >
                            Donate Now
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Box mt={5} pb={2}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                >
                    {'© '}
                    {new Date().getFullYear()}
                    {'  Crafted by '}
                    <Link
                        color="inherit"
                        underline="none"
                        href="https://material-ui.com/"
                    >
                        {APP_NAME} Team.
                    </Link>
                </Typography>
            </Box>
        </>
    );
};

export default Footer;
