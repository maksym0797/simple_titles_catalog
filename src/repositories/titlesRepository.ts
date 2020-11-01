import unAuthorizedClient from './../clients/unAuthorizedClient';
import { AxiosResponse } from 'axios';
import { API_URL } from '../constants';
import Title from '../models/Title';

export default {
    async search(q: string, page: Number = 1): Promise<Array<Title>> {
        const response = await unAuthorizedClient.get(
            `${API_URL}/api/titles/search?q=${q}&page=${page}`
        );

        return response.data.map(Title.create);
    },
};
