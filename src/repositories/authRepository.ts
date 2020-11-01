import unAuthorizedClient from './../clients/unAuthorizedClient';
import { AxiosResponse } from 'axios';
import AuthResponse from '../types/AuthResponse';
import { API_URL } from '../constants';

export default {
    async login(email: string, password: string) {
        const response: AxiosResponse = await unAuthorizedClient.post(
            `${API_URL}/api/auth/signin`,
            {
                email,
                password,
            }
        );

        return new AuthResponse(response.data);
    },
    async signUp(name: string, email: string, password: string) {
        const response: AxiosResponse = await unAuthorizedClient.post(
            `${API_URL}/api/auth/signup`,
            {
                name,
                email,
                password,
            }
        );

        return new AuthResponse(response.data);
    },
};
