import { ChangeEvent, FC, ReactElement, MouseEvent, useState } from 'react';

import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import LoadingButton from '@material-ui/lab/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Lock from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { useHistory } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';

const Login: FC = (): ReactElement => {
    const [loginState, setLoginState] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { push } = useHistory();

    const [login, { isLoading }] = useLoginMutation();

    // Handling Show Password = True || False
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Handling Input Changes and Handling Login
    const handleChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setLoginState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            await login(loginState).unwrap();
            push('/');
        } catch (err) {
            console.log('err ->', err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 2,
            }}
        >
            <Paper
                elevation={16}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    '&>*': {
                        my: 1,
                    },
                }}
            >
                <Typography>Login</Typography>
                <TextField
                    variant="outlined"
                    placeholder="E-mail address"
                    label="E-mail address"
                    type="email"
                    name="email"
                    onChange={handleChange}
                ></TextField>
                <TextField
                    variant="outlined"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
                <LoadingButton
                    variant="contained"
                    color="secondary"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<Lock />}
                    onClick={handleLogin}
                >
                    Login
                </LoadingButton>
            </Paper>
        </Box>
    );
};

export default Login;
