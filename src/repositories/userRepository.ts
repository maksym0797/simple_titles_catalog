import { API_URL } from '../constants';
import Title from '../models/Title';
import authorizedClient from './../clients/authorizedClient';

export default {
    async likeTitle(titleId: Number) {
        const client = await authorizedClient();

        return client.put(`${API_URL}/api/users/titles/${titleId}/like?like=1`);
    },

    async dislikeTitle(titleId: Number) {
        const client = await authorizedClient();

        return client.put(`${API_URL}/api/users/titles/${titleId}/like?like=0`);
    },

    async favouriteTitles() {
        const client = await authorizedClient();

        const response = await client.get(`${API_URL}/api/users/favourites`);

        return response.data.map(Title.create);
    },
};
