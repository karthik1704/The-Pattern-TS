import { FC, ReactElement } from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Home from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PersonIcon from '@mui/icons-material/Person';

import { DONATION, HOME, LOGIN, LOGOUT, REQUEST } from '../../constants/base';
import { Link as RouterLink } from 'react-router-dom';

import useToggleTheme from '../../hooks/useToggleTheme';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { styled } from '@mui/material/styles';

// emotion Styled Components
const AvatarSection = styled('div')({
    display: 'flex',
    //alignItems: 'center',
    flexDirection: 'column',
    '&>*': {
        m: 1,
    },
});

// React Code
interface Props {
    onToggle: (
        open: boolean
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

// interface Menu {
//     name: string;
//     to: string;
//     icon?: ReactElement;
// }

// const NavLinks: Menu[] = [
//     {
//         name: HOME,
//         to: '/',
//         icon: <Home />,
//     },
//     {
//         name: REQUEST,
//         to: '/request',
//         icon: <PlaylistAddIcon />,
//     },
// ];

const MainMenu: FC<Props> = ({ onToggle }): ReactElement => {
    const [theme, setTheme] = useToggleTheme();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const onHandleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        }
        if (theme === 'dark') {
            setTheme('light');
        }
    };
    return (
        <div
            role="presentation"
            onClick={onToggle(false)}
            onKeyDown={onToggle(false)}
            style={{ width: 250 }}
        >
            {isAuthenticated ? (
                <AvatarSection>
                    <Avatar>A</Avatar>
                    <div>
                        <Typography variant="h6" component="p">
                            Karthi A
                        </Typography>
                        <Typography variant="caption" component="p">
                            Karthikthee7@gmail.com
                        </Typography>
                    </div>
                </AvatarSection>
            ) : (
                <AvatarSection>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                    <Typography variant="body1">
                        New User?{' '}
                        <Link component={RouterLink} to="/register">
                            Register Now{' '}
                        </Link>
                    </Typography>
                </AvatarSection>
            )}
            <Divider />
            <List>
                <ListItem button component={RouterLink} to="/">
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary={HOME} />
                </ListItem>

                <ListItem button component={RouterLink} to="/request">
                    <ListItemIcon>
                        <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary={REQUEST} />
                </ListItem>
                <ListItem button component={RouterLink} to="/donate">
                    <ListItemIcon>
                        <LocalCafeIcon />
                    </ListItemIcon>
                    <ListItemText primary={DONATION} />
                </ListItem>
            </List>
            {isAuthenticated && (
                <>
                    <Divider />
                    <List>
                        <ListItem button component={RouterLink} to="/profile">
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/myboards">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Board" />
                        </ListItem>
                    </List>
                </>
            )}
            <Divider />
            <List>
                <ListItem button onClick={onHandleTheme}>
                    <ListItemIcon>
                        {theme === 'light' ? (
                            <Brightness4Icon />
                        ) : (
                            <Brightness7Icon />
                        )}
                    </ListItemIcon>
                    <ListItemText primary="Dark Mode" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button component={RouterLink} to="/privacy">
                    <ListItemText primary="Privacy Policy" />
                </ListItem>
                <ListItem button component={RouterLink} to="/contact">
                    <ListItemText primary="Contact" />
                </ListItem>
                <ListItem button component={RouterLink} to="/about">
                    <ListItemText primary="About" />
                </ListItem>
            </List>
            {isAuthenticated && (
                <>
                    <Divider />
                    <List>
                        <ListItem button component={RouterLink} to="/logout">
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={LOGOUT} />
                        </ListItem>
                    </List>
                </>
            )}
        </div>
    );
};

export default MainMenu;
