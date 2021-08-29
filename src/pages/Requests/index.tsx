import { FC, ReactElement, useState } from 'react';

import Alert from '@material-ui/core/Alert';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingButton from '@material-ui/lab/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Lock from '@material-ui/icons/Lock';

// import { useHistory } from 'react-router-dom';
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
        .url('Enter vaild url')
        .required('Please enter website'),
    email: yup
        .string()
        .required('Email address required*')
        .email('Please enter vaild e-mail'),

    promotion: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
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
        setError(null);
        console.log(data);
        try {
            await createRequest(data).unwrap();
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
            console.log(err);
            setError(err);
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
                    justifyContent: 'end',
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
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                fullWidth
                                defaultValue={value}
                                variant="outlined"
                                label="App Name"
                                type="text"
                                name="app_name"
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
                                autoFocus
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="copyright"
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
                                label="Copyright"
                                type="text"
                                name="copyright"
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="app_url"
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
                                label="App URL/ Website URL"
                                type="text"
                                name="app_url"
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="platform"
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
                                label="Platform"
                                type="text"
                                name="platform"
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="description"
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
                                label="Why do you love this app?"
                                type="text"
                                name="description"
                                multiline
                                rows={4}
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
                            ></TextField>
                        )}
                    />

                    <Controller
                        name="name"
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
                                label="Name"
                                type="text"
                                name="name"
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
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
                            ></TextField>
                        )}
                    />
                    <Controller
                        name="country"
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
                                label="Country"
                                type="text"
                                name="country"
                                onChange={onChange}
                                helperText={error?.message}
                                error={error && true}
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
                                field: { onChange, value },
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
                                                    value={value}
                                                    onChange={onChange}
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
                        startIcon={<Lock />}
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
