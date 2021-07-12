import { TextField } from '@material-ui/core';
import { FC, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';

const Login: FC = (): ReactElement => {
    const [loginState, setLoginState] = useState({
        email: '',
        password: '',
    });
    const { push } = useHistory();

    const [login, { isLoading }] = useLoginMutation();
    return (
        <div>
            <TextField></TextField>
        </div>
    );
};

export default Login;
