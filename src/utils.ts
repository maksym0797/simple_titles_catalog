import Title from './models/Title';
import userRepository from './repositories/userRepository';

export default {
    getFavouriteTitles() {
        return userRepository.favouriteTitles();
    },

    async getFavouriteIds() {
        const items: Array<Title> = await this.getFavouriteTitles();

        return items.map((item: Title) => item.id);
    },
};
