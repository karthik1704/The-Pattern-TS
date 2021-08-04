import { ChangeEvent, FC, ReactElement, MouseEvent, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import LoadingButton from '@material-ui/lab/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Lock from '@material-ui/icons/Lock';
import Mail from '@material-ui/icons/Mail';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { useHistory } from 'react-router-dom';
import { useLoginMutation, LoginRequest } from '../../features/auth/authApi';

const Login: FC = (): ReactElement => {
    const [loginState, setLoginState] = useState<LoginRequest>({
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
        console.log(loginState);
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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Mail />
                            </InputAdornment>
                        ),
                    }}
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Link
                        underline="hover"
                        color="textPrimary"
                        component={RouterLink}
                        to="/forgotpassword"
                    >
                        Forgot Password?
                    </Link>
                </Box>
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

                <Divider variant="middle" light>
                    {' '}
                    Or{' '}
                </Divider>
                <Typography>
                    Doesn't have account?{' '}
                    <Link
                        underline="hover"
                        color="textPrimary"
                        component={RouterLink}
                        to="/register"
                    >
                        Register now
                    </Link>{' '}
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
