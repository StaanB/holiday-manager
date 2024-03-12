import axios from 'axios';

const api = axios.create({
    baseURL: 'https://holiday-manager-api.vercel.app/',
});

export default api;