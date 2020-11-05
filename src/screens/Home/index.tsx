import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import DefaultButton from '../../components/button';
import { AuthContext } from '../../AuthContext';
import titlesRepository from '../../repositories/titlesRepository';
import customStyles from '../../styles';
import SearchBar from './components/SearchBar';
import TitlesList from './components/TitlesList';
import utils from '../../utils';

export default function HomeScreen({}) {
    const authContext = React.useContext(AuthContext);
    const [titles, setTitles] = useState([]);
    const [favouriteIds, setFavouriteIds] = useState([]);
    const [keyword, setQueryKeyword] = useState('');
    const fetchTitles = async (page: Number = 1) => {
        const newTitles = await titlesRepository.search(keyword, page);
        setTitles(page > 1 ? titles.concat(newTitles) : newTitles);
    };
    const fetchFavouriteIds = async () => {
        const favouriteIds = await utils.getFavouriteIds();

        setFavouriteIds(favouriteIds);
    };
    useEffect(() => {
        fetchTitles();
    }, [keyword]);
    useEffect(() => {
        fetchFavouriteIds();
    }, []);

    return (
        <SafeAreaView
            style={{
                ...customStyles.paddingContainer,
                backgroundColor: '#151515',
            }}
        >
            <SearchBar setQuery={setQueryKeyword} />
            <TitlesList
                titles={titles}
                fetchPage={fetchTitles}
                keyword={keyword}
                favouriteIds={favouriteIds}
            />
            <DefaultButton
                containerStyle={{ height: 20 }}
                text={'Sign Out'}
                onClick={authContext.signOut}
            />
        </SafeAreaView>
    );
}
