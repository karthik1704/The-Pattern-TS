import { FC, ReactElement } from 'react';
import { APP_NAME } from '../../../constants/base';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import { Button, Link } from '@material-ui/core';

import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';

// Icons
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';

import useStyles from './Footer.style';
import useToggleTheme from '../../../hooks/useToggleTheme';

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
    const classes = useStyles();

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
                className={classes.root}
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
                        <Typography variant="subtitle2" color="textSecondary">
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
                                    component={RouterLink}
                                    to={link.to}
                                    key={link.name}
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                color="textSecondary"
                                variant="subtitle2"
                                onClick={onHandleDarkMode}
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
                            size="large"
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            href="https://fb.com/"
                            target="_blank"
                            rel="noreferrer"
                            size="large"
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                            size="large"
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            href="https://reddit.com/"
                            target="_blank"
                            rel="noreferrer"
                            size="large"
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
                    <Link color="inherit" href="https://material-ui.com/">
                        {APP_NAME} Team.
                    </Link>
                </Typography>
            </Box>
        </>
    );
};

export default Footer;
