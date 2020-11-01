import unAuthorizedClient from './../clients/unAuthorizedClient';
import { AxiosResponse } from 'axios';
import AuthResponse from '../types/AuthResponse';

export default {
    async login(email: string, password: string) {
        const response: AxiosResponse = await unAuthorizedClient.post(
            `http://127.0.0.1/api/auth/signin`,
            {
                email,
                password,
            }
        );

        return new AuthResponse(response.data);
    },
    async signUp(name: string, email: string, password: string) {
        const response: AxiosResponse = await unAuthorizedClient.post(
            `http://127.0.0.1/api/auth/signup`,
            {
                name,
                email,
                password,
            }
        );

        return new AuthResponse(response.data);
    },
};
