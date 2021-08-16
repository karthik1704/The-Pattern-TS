import { FC, ReactElement, MouseEvent, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Alert from '@material-ui/core/Alert';
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
    email: yup.string().required('Email required').email('Invalid E-mail'),
    password: yup
        .string()
        .trim('Should be startwith letters or numbers')
        .required('Password required*')
        .trim()
        .min(8, 'Password atleast 8 characters'),
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
    // const handleChange = ({
    //     target: { name, value },
    // }: ChangeEvent<HTMLInputElement>) => {
    //     setLoginState((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleLogin = async (data: LoginRequest) => {
        try {
            await login(data).unwrap();
            push('/');
        } catch (err) {
            console.log('err ->', err);
            if (err.data === undefined) {
                setError({
                    ...error,
                    detail: 'Something Went Wrong',
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
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                fullWidth
                                defaultValue={value}
                                variant="outlined"
                                placeholder="E-mail address"
                                label="E-mail address"
                                type="email"
                                name="email"
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail />
                                        </InputAdornment>
                                    ),
                                }}
                                autoFocus
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
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                fullWidth
                                defaultValue={value}
                                variant="outlined"
                                label="Password"
                                placeholder="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
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
