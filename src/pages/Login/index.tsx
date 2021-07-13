import { TextField } from '@material-ui/core';
import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';

const Login: FC = (): ReactElement => {
    const [loginState, setLoginState] = useState({
        email: '',
        password: '',
    });
    const { push } = useHistory();

    const [login, { isLoading }] = useLoginMutation();

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
        <div>
            <TextField></TextField>
        </div>
    );
};

export default Login;
