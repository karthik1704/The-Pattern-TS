import { useCallback, cloneElement, useState, FC, ReactElement } from 'react';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import MenuIcon from '@mui/icons-material/Menu';

import { APP_NAME } from '../../../constants/base';

import MyDrawer from '../MyDrawer';
import MainMenu from '../../MainMenu';
import MenuPopUp from '../MenuPopUp';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// import useAuth from '../../../hooks/useAuthHook';
import { useAppSelector, useAppDispatch } from '../../../hooks/useReduxHooks';
import { logoutUser } from '../../../features/auth/authSlice';

// Emotion Styled Components

const Root = styled('div')({
    flexGrow: 1,
});

// const SectionMobile = styled('div')(({ theme }) => ({
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//         display: 'none',
//     },
// }));

const SectionDesktop = styled('div')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

// React Code
interface Props {
    children: ReactElement;
}

const ElevationAppBar: FC<Props> = ({ children }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return cloneElement(children, { elevation: trigger ? 4 : 0 });
};

const Header: FC = (): ReactElement => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [drawer, setDrawer] = useState<boolean>(false);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
        null
    );

    const onToggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setDrawer(open);
        };

    const onClickAway = () => {
        setDrawer(false);
    };

    const handleProfileMenuClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = useCallback(() => {
        setProfileAnchorEl(null);
    }, [setProfileAnchorEl]);

    const handleLogout = () => {
        handleProfileMenuClose();
        dispatch(logoutUser(false));
    };

    return (
        <Root>
            <ElevationAppBar>
                <AppBar color="transparent">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{
                                marginRight: 2,
                                display: {
                                    sm: 'flex',
                                    md: 'none',
                                },
                            }}
                            onClick={onToggleDrawer(true)}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                        <MyDrawer
                            anchor="left"
                            onClose={onToggleDrawer}
                            open={drawer}
                            clickAway={onClickAway}
                        >
                            <MainMenu onToggle={onToggleDrawer} />
                        </MyDrawer>
                        <Link
                            sx={{
                                flexGrow: 1,
                                display: 'block',
                            }}
                            variant="h6"
                            noWrap
                            color="inherit"
                            underline="none"
                            component={NavLink}
                            to="/"
                        >
                            {APP_NAME}
                        </Link>
                        <SectionDesktop>
                            <Button color="inherit" component={NavLink} to="/">
                                APPS
                            </Button>
                            {isAuthenticated ? (
                                <>
                                    <Button
                                        color="inherit"
                                        component={NavLink}
                                        to="/request"
                                    >
                                        Request
                                    </Button>

                                    <IconButton
                                        onClick={handleProfileMenuClick}
                                        aria-controls="profile-menu"
                                        aria-haspopup="true"
                                        disableRipple
                                        disableFocusRipple
                                        size="small"
                                    >
                                        <Avatar
                                            sx={{
                                                m: 1,
                                            }}
                                            alt={user?.first_name}
                                            src={user?.avatar}
                                        >
                                            {user?.email[0]}
                                        </Avatar>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Button
                                        color="inherit"
                                        component={NavLink}
                                        to="/request"
                                    >
                                        Request
                                    </Button>
                                    <Button
                                        color="inherit"
                                        component={NavLink}
                                        to="/login"
                                    >
                                        Login
                                    </Button>
                                </>
                            )}
                        </SectionDesktop>
                    </Toolbar>
                </AppBar>
            </ElevationAppBar>
            <Toolbar id="back-to-top-anchor" />
            <MenuPopUp
                id="profile-menu"
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
            >
                <MenuItem
                    onClick={handleProfileMenuClose}
                    component={NavLink}
                    to="/profile"
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={handleProfileMenuClose}
                    component={NavLink}
                    to="/myboards"
                >
                    My Board
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuPopUp>
        </Root>
    );
};

export default Header;
