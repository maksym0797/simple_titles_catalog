import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import DefaultButton from '../../components/button';
import { AuthContext } from '../../context';
import titlesRepository from '../../repositories/titlesRepository';
import customStyles from '../../styles';
import SearchBar from './components/SearchBar';
import TitlesList from './components/TitlesList';
import TitleItem from './components/TitlesList/TitleItem';

export default function HomeScreen({}) {
    const authContext = React.useContext(AuthContext);
    const [titles, setTitles] = useState([]);
    const [keyword, setQueryKeyword] = useState('');
    const fetchTitles = async (page: Number = 1) => {
        const titles = await titlesRepository.search(keyword, page);
        setTitles(titles);
    };
    useEffect(() => {
        fetchTitles();
    }, [keyword]);

    return (
        <SafeAreaView style={{ ...customStyles.paddingContainer }}>
            <SearchBar setQuery={setQueryKeyword} />
            <TitlesList titles={titles} />
            <DefaultButton text={'Sign Out'} onClick={authContext.signOut} />
        </SafeAreaView>
    );
}
