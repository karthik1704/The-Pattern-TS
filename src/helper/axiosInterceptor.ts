import axios from 'axios';
import { logoutUser, refreshAccessToken } from '../features/auth/authSlice';

import store from '../features/store';

let headers = {};

const myAxios = axios.create({
    headers,
});

myAxios.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem('access_token');
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
    async (error) => {
        const originalRequest = await error.config;
        console.log(error.response);
        console.log(originalRequest);
        console.log(originalRequest._retry);
        console.log(error.response.status === 401);
        const t = localStorage.getItem('refresh_token');
        if (t) {
            const tp = JSON.parse(atob(t?.split('.')[1]));
            const now = Math.ceil(Date.now() / 1000);
            console.log(tp);
            console.log(tp.exp > now);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            const refreshToken = localStorage.getItem('refresh_token');
            console.log(refreshToken);
            originalRequest._retry = true;
            if (refreshToken) {
                axios
                    .post(
                        `${process.env.REACT_APP_API_URL}auth/token/refresh/`,
                        {
                            refresh: refreshToken,
                        }
                    )
                    .then((res) => {
                        const access_token = res.data.access;
                        console.log('im here');
                        console.log('access:', access_token);
                        localStorage.setItem('access_token', access_token);
                        store.dispatch(refreshAccessToken({ access_token }));
                        myAxios.defaults.headers[
                            'Authorization'
                        ] = `Bearer ${access_token}`;
                        originalRequest.headers[
                            'Authorization'
                        ] = `Bearer ${access_token}`;
                        return myAxios(originalRequest);
                    })
                    .catch((error) => {
                        console.log('Axios Refersh token error code:', error);
                        store.dispatch(logoutUser(false));
                        delete myAxios.defaults.headers.common['Authorization'];
                        return Promise.reject(error);
                    });
            } else {
                store.dispatch(logoutUser(false));
            }
        }

        return Promise.reject(error);
    }
);

export default myAxios;
