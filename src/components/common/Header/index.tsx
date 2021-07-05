import { cloneElement, useState, FC, ReactElement } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import MenuIcon from '@material-ui/icons/Menu';

import { APP_NAME } from '../../../constants/base';

import MyDrawer from '../MyDrawer';
import MainMenu from '../../MainMenu';
import MenuPopUp from '../MenuPopUp';
import useStyles from './styles';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/useReduxHooks';
import { logoutUser } from '../../../features/auth/authSlice';

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
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const classes = useStyles();
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

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleLogout = () => {
        handleProfileMenuClose();
        dispatch(logoutUser(false));
    };

    return (
        <div className={classes.root}>
            <ElevationAppBar>
                <AppBar color="default">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            className={clsx(
                                classes.menuButton,
                                classes.sectionMobile
                            )}
                            onClick={onToggleDrawer(true)}
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
                            variant="h6"
                            noWrap
                            className={classes.title}
                            color="inherit"
                            underline="none"
                            component={NavLink}
                            to="/"
                        >
                            {APP_NAME}
                        </Link>
                        <div className={classes.sectionDesktop}>
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
                                            className={classes.avatar}
                                            alt="Jhon Doe"
                                            src="/broken-image.jpg"
                                        >
                                            U
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
                        </div>
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
        </div>
    );
};

export default Header;
