import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const {VITE_API_URL} = getEnvVariables();

const videosApi = axios.create({
    baseURL: VITE_API_URL
})

videosApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default videosApi;