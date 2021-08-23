import { FC, ReactElement, MouseEvent, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Alert from '@material-ui/core/Alert';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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
import {
    useRegisterMutation,
    RegisterRequest,
} from '../../features/auth/authApi';

interface LoginError {
    field: string | null;
    detail: string | null;
    non_field_errors?: [string] | null;
}

const schema = yup.object().shape({
    first_name: yup.string().required('Email address required*'),
    last_name: yup.string().required('Email address required*'),
    email: yup
        .string()
        .required('Email address required*')
        .email('Please enter vaild e-mail'),
    password1: yup
        .string()
        .trim('Should be startwith letters or numbers')
        .required('Password required*')
        .min(8),
    password2: yup
        .string()
        .trim('Should be startwith letters or numbers')
        .oneOf([yup.ref('password1'), null], 'Passwords must match')
        .required('Confrim password required*')
        .min(8),
    terms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
});

const Register: FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<RegisterRequest>({
        resolver: yupResolver(schema),
    });
    const [error, setError] = useState<LoginError>({
        field: null,
        detail: null,
        non_field_errors: null,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { push } = useHistory();

    const [register, { isLoading }] = useRegisterMutation();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleRegister = async (data: RegisterRequest) => {
        try {
            await register(data).unwrap();
            push('/');
        } catch (err) {
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
                    width: '40%',
                    // '&>*': {
                    //     my: 1,
                    // },
                }}
            >
                <Typography variant="h5" component="h2">
                    Create Account
                </Typography>
                {error?.detail && (
                    <Alert severity="error">{error.detail}</Alert>
                )}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { my: 1 },
                    }}
                    onSubmit={handleSubmit(handleRegister)}
                    noValidate
                    autoComplete="off"
                >
                    <Controller
                        name="first_name"
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
                                label="First Name"
                                type="text"
                                name="first_name"
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
                        name="last_name"
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
                                label="Last Name"
                                type="text"
                                name="last_name"
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
                        name="password1"
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
                                name="password1"
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
                    <Controller
                        name="password2"
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
                                name="password2"
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
                            justifyContent: 'start',
                        }}
                    >
                        <Controller
                            name="terms"
                            defaultValue={false}
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={value}
                                                onChange={onChange}
                                                color="secondary"
                                            />
                                        }
                                        label={
                                            <p>
                                                Accept{' '}
                                                <Link
                                                    underline="hover"
                                                    component={RouterLink}
                                                    to="/terms"
                                                >
                                                    terms & conditions
                                                </Link>
                                            </p>
                                        }
                                    />
                                    {error?.message && (
                                        <FormHelperText>
                                            {error?.message}
                                        </FormHelperText>
                                    )}
                                </FormGroup>
                            )}
                        />
                    </Box>
                    <LoadingButton
                        variant="contained"
                        color="secondary"
                        loading={isLoading}
                        startIcon={<Lock />}
                        type="submit"
                        fullWidth
                    >
                        Create Account
                    </LoadingButton>
                </Box>
                <Box>
                    <Divider variant="middle" light>
                        {' '}
                        or{' '}
                    </Divider>
                    <Typography>
                        Already have account?{' '}
                        <Link
                            underline="hover"
                            component={RouterLink}
                            to="/login"
                        >
                            Login here
                        </Link>{' '}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
