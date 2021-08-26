import { FC, ReactElement } from 'react';

import Alert from '@material-ui/core/Alert';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import LoadingButton from '@material-ui/lab/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    useCreateRequestMutation,
    Request,
} from '../../features/request/requestApi';

const schema = yup.object().shape({
    name: yup.string().required('First name required*'),
    app_name: yup.string().required('Last name required*'),
    url: yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Please enter website'),
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
    promotion: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
});

const Requests: FC = (): ReactElement => {
    const { handleSubmit, control, reset } = useForm<Request>({
        resolver: yupResolver(schema),
    });

    const [createRequest, { error, isSuccess, isLoading }] =
        useCreateRequestMutation();

    const handleRequestSubmit = async (data: Request) => {};

    return <p>Requests</p>;
};

export default Requests;
