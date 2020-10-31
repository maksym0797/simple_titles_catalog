import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        return {
            ...config,
        };
    },
    (err) => {
        console.log(err);
        return Promise.reject(new Error('Sorry, got the error, try again later.'));
    },
);

export default axios;
