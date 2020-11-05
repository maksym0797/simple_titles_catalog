import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { TOKEN_NAME } from '../constants';

export default async function client() {
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.interceptors.request.use(
        (config) => {
            return {
                ...config,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        },
        (err) => {
            console.log(err);
            return Promise.reject(
                new Error('Sorry, got the error, try again later.')
            );
        }
    );

    return axios;
}
