import { useState, FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';

const Register: FC = (): ReactElement => {
    const [registerState, setRegisterState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password1: '',
    });
    const { push } = useHistory();

    const [register, { isLoading }] = useRegisterMutation();

    return <p>Register</p>;
};

export default Register;
