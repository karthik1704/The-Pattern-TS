import { FC, ReactElement, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    useCreateRequestMutation,
    Request,
} from '../../features/request/requestApi';

const schema = yup.object().shape({
    name: yup.string().required('Name required*'),
    copyright: yup.string().required('Copyright required*'),
    platform: yup.string().required('Platform required*'),
    country: yup.string(),
    description: yup.string(),
    app_name: yup.string().required('App name required*'),
    // app_url: yup
    //     .string()
    //     .matches(
    //         /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //         'Enter correct url!'
    //     )
    //     .required('Please enter website'),
    app_url: yup
        .string()
        .url('Enter vaild url - ex: https://example.com')
        .required('Please enter website'),
    email: yup
        .string()
        .required('Email address required*')
        .email('Please enter vaild e-mail'),

    promotion: yup
        .boolean()
        .oneOf([true], 'You must accept promotions')
        .required('You must accept promotions'),
});

interface IError {
    status: number;
    data: any;
}

const Requests: FC = (): ReactElement => {
    const { handleSubmit, control, reset } = useForm<Request>({
        resolver: yupResolver(schema),
    });

    const [createRequest, { isSuccess, isLoading }] =
        useCreateRequestMutation();

    const [error, setError] = useState<IError | null>(null);

    const handleRequestSubmit = async (data: Request) => {
        // clearing error messages
        setError(null);

        try {
            await createRequest(data).unwrap();
            // Reset Form once Success
            reset({
                app_name: '',
                copyright: '',
                platform: '',
                description: '',
                app_url: '',
                name: '',
                email: '',
                country: '',
                promotion: false,
            });
        } catch (err) {
            setError(err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'end' },
                alignItems: 'center',
                my: 2,
                mr: { xs: 0, md: 4 },
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
                    App Request
                </Typography>
                {isSuccess && (
                    <Alert severity="success">
                        App Requested submitted successfully!.
                    </Alert>
                )}
                {error && <Alert severity="error">Someting went wrong.</Alert>}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { my: 1 },
                    }}
                    onSubmit={handleSubmit(handleRequestSubmit)}
                    noValidate
                    autoComplete="off"
                >
                    <Controller
                        name="app_name"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="App Name"
                                type="text"
                                error={error && true}
                                helperText={error?.message}
                                autoFocus
                                {...field}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="copyright"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Copyright"
                                type="text"
                                error={error && true}
                                helperText={error?.message}
                                {...field}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="app_url"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="App URL/ Website URL"
                                type="text"
                                error={error && true}
                                helperText={error?.message}
                                {...field}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="platform"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Platform"
                                type="text"
                                error={error && true}
                                helperText={error?.message}
                                {...field}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Why do you love this app?"
                                type="text"
                                multiline
                                rows={4}
                                error={error && true}
                                helperText={error?.message}
                                {...field}
                            ></TextField>
                        )}
                    />

                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Name"
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
                        name="country"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Country"
                                type="text"
                                error={error && true}
                                helperText={error?.message}
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
                            name="promotion"
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
                                            label="Promotion newsletter"
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
                        type="submit"
                        fullWidth
                    >
                        Submit Request
                    </LoadingButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default Requests;
