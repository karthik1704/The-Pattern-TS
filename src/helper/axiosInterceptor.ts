import axios from 'axios';
import { logoutUser, refreshAccessToken } from '../features/auth/authSlice';

let headers = {};

const myAxios = axios.create({
    headers,
});

myAxios.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem('accesstoken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Axios Error -> ', JSON.stringify(error));
        return Promise.reject(error);
    }
);

myAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !==
                `${process.env.REACT_APP_API_URL}/auth/token/refresh`
        ) {
            const refreshToken = localStorage.getItem('refresh_token');
            originalRequest._retry = true;
            if (refreshToken) {
                axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/auth/token/refresh`,
                        {
                            refresh: refreshToken,
                        }
                    )
                    .then((res) => {
                        const access_token = res.data.access;
                        refreshAccessToken(access_token);
                        myAxios.defaults.headers.common[
                            'Authorization'
                        ] = `Bearer ${access_token}`;
                        originalRequest.headers[
                            'Authorization'
                        ] = `Bearer ${access_token}`;
                        return myAxios(originalRequest);
                    })
                    .catch((error) => {
                        console.log('Axios Refersh token error code:', error);
                        logoutUser(false);
                        return Promise.reject(error);
                    });
            } else {
                logoutUser(false);
            }
        }
        return Promise.reject(error);
    }
);

export default myAxios;
