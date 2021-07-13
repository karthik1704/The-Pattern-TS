import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';

const Register: FC = (): ReactElement => {
    const [registerState, setRegisterState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
    });
    const { push } = useHistory();

    const [register, { isLoading }] = useRegisterMutation();

    const handleChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setRegisterState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        try {
            await register(registerState).unwrap();
            push('/');
        } catch (err) {
            console.log('err ->', err);
        }
    };

    return <p>Register</p>;
};

export default Register;
