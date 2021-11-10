import { FC, ReactElement, MouseEvent, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Lock from '@mui/icons-material/Lock';
import Mail from '@mui/icons-material/Mail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useLoginMutation, LoginRequest } from '../../features/auth/authApi';

interface LoginError {
    field: string | null;
    detail: string | null;
    non_field_errors?: [string] | null;
}

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email address required*')
        .email('Please enter vaild e-mail'),
    password: yup
        .string()
        .trim('Should be startwith letters or numbers')
        .required('Password required*'),
});

const Login: FC = (): ReactElement => {
    // const [loginState, setLoginState] = useState<LoginRequest>({
    //     email: '',
    //     password: '',
    // });

    const { handleSubmit, control } = useForm<LoginRequest>({
        resolver: yupResolver(schema),
    });

    const [error, setError] = useState<LoginError>({
        field: null,
        detail: null,
        non_field_errors: null,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    let location = useLocation();

    const loginSuccessPath = location.state?.from?.pathname || '/';

    const [login, { isLoading }] = useLoginMutation();

    // Handling Show Password = True || False
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogin = async (data: LoginRequest) => {
        error &&
            setError({
                field: null,
                detail: null,
                non_field_errors: null,
            });
        try {
            await login(data).unwrap();
            navigate(loginSuccessPath, { replace: true });
        } catch (err: any) {
            console.log('err ->', err);
            if (err.data === undefined) {
                setError({
                    ...error,
                    detail: 'Something Went Wrong, Please try again',
                });
            } else if (err.data.non_field_errors) {
                setError({
                    ...error,
                    detail: 'Email or Password incorrect',
                });
            } else {
                setError(err.data);
            }
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
                    // '&>*': {
                    //     my: 1,
                    // },
                }}
            >
                <Typography variant="h5" component="h2">
                    Login
                </Typography>
                {error?.detail && (
                    <Alert severity="error">{error.detail}</Alert>
                )}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { my: 1 },
                    }}
                    onSubmit={handleSubmit(handleLogin)}
                    noValidate
                    autoComplete="off"
                >
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                autoComplete="email"
                                variant="outlined"
                                placeholder="E-mail address"
                                label="E-mail address"
                                type="email"
                                error={error && true}
                                helperText={error?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail />
                                        </InputAdornment>
                                    ),
                                }}
                                autoFocus
                                {...field}
                            ></TextField>
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                variant="outlined"
                                label="Password"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                error={error && true}
                                helperText={error?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
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
                                {...field}
                            ></TextField>
                        )}
                    />

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
                        startIcon={<Lock />}
                        type="submit"
                        fullWidth
                    >
                        Login
                    </LoadingButton>
                </Box>
                <Box>
                    <Divider variant="middle" light>
                        {' '}
                        or{' '}
                    </Divider>
                    <Typography>
                        Doesn't have account?{' '}
                        <Link
                            underline="hover"
                            component={RouterLink}
                            to="/register"
                        >
                            Register now
                        </Link>{' '}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
