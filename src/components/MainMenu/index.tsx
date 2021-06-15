import { FC, ReactElement } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Home from '@material-ui/icons/Home';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PersonIcon from '@material-ui/icons/Person';

import { DONATION, HOME, LOGIN, LOGOUT, REQUEST } from '../../constants/base';
import { Link } from 'react-router-dom';

import useStyles from './MainMenu.styles';
import useToggleTheme from '../../hooks/useToggleTheme';
import { Typography } from '@material-ui/core';

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
    const classes = useStyles();
    const [theme, setTheme] = useToggleTheme();
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
            <div className={classes.avatar}>
                <Avatar>A</Avatar>
                <div>
                <Typography variant='h6' component='p'>Karthi A</Typography>
                <Typography variant='caption' component='p'>Karthikthee7@gmail.com</Typography>
                </div>
            </div>
            <Divider />
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary={HOME} />
                </ListItem>

                <ListItem button component={Link} to="/request">
                    <ListItemIcon>
                        <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary={REQUEST} />
                </ListItem>
                <ListItem button component={Link} to="/donation">
                    <ListItemIcon>
                        <LocalCafeIcon />
                    </ListItemIcon>
                    <ListItemText primary={DONATION} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={onHandleTheme}>
                    <ListItemIcon>
                        {
                            theme === 'light' ?
                                <Brightness4Icon />
                            :
                                <Brightness7Icon />
                        }
                    </ListItemIcon>
                    <ListItemText primary="Dark Mode" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button component={Link} to="/privacy">
                    <ListItemText primary="Privacy Policy" />
                </ListItem>
                <ListItem button component={Link} to="/contact">
                    <ListItemText primary="Contact" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemText primary="About" />
                </ListItem>
            </List>

            <Divider />
            <List>
                <ListItem button component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={LOGOUT} />
                </ListItem>
            </List>
        </div>
    );
};

export default MainMenu;
