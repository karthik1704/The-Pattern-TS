import { FC, ReactElement, MouseEvent, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Lock from '@mui/icons-material/Lock';
// import Mail from '@mui/icons-material/Mail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
    first_name: yup.string().required('First name required*'),
    last_name: yup.string().required('Last name required*'),
    email: yup
        .string()
        .required('Email address required*')
        .email('Please enter vaild e-mail'),
    password1: yup
        .string()
        .trim('Should be startwith letters or numbers')
        .required('Password required*')
        .min(8, 'Password must be at least 8 characters'),
    password2: yup
        .string()
        .trim('Should be startwith letters or numbers')
        .oneOf([yup.ref('password1'), null], 'Passwords must match')
        .required('Confrim password required*')
        .min(8, 'Confrim password must be at least 8 characters'),
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
        error &&
            setError({
                field: null,
                detail: null,
                non_field_errors: null,
            });
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
            } else if (err.data.email) {
                setError({
                    ...error,
                    detail: err.data?.email,
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
                    width: { xs: '100vw', md: '40%' },
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
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                type="text"
                                error={error && true}
                                helperText={error?.message}
                                autoFocus
                                {...field}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                type="text"
                                error={error && true}
                                helperText={error?.message}
                                {...field}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="E-mail address"
                                type="email"
                                error={error && true}
                                helperText={error?.message}
                                {...field}
                            ></TextField>
                        )}
                    />

                    <Controller
                        name="password1"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password"
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
                    <Controller
                        name="password2"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Confrim Password"
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
                            justifyContent: 'start',
                        }}
                    >
                        <Controller
                            name="terms"
                            defaultValue={false}
                            control={control}
                            render={({
                                field: { onChange, value, ref },
                                fieldState: { error },
                            }) => (
                                <FormControl
                                    required
                                    error={error && true}
                                    variant="standard"
                                >
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={value}
                                                    onChange={(e) =>
                                                        onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                    inputRef={ref}
                                                    color="secondary"
                                                />
                                            }
                                            label={
                                                <>
                                                    I agree{' '}
                                                    <Link
                                                        underline="hover"
                                                        component={RouterLink}
                                                        to="/terms"
                                                    >
                                                        terms & conditions
                                                    </Link>
                                                </>
                                            }
                                        />
                                        {error?.message && (
                                            <FormHelperText>
                                                {error?.message}
                                            </FormHelperText>
                                        )}
                                    </FormGroup>
                                </FormControl>
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
