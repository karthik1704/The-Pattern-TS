import axios from 'axios';
import { API_URL } from '../constants/base';

let headers = {};

const myAxios = axios.create({
    baseURL: API_URL,
    headers,
});

myAxios.interceptors.request.use(
    async (config) => {
        const token = await window.localStorage.getItem('accesstoken');
        if (token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Axios Error -> ', JSON.stringify(error));
        return Promise.reject(error);
    }
);

export default myAxios;