import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import DefaultButton from '../../components/button';
import { AuthContext } from '../../context';
import customStyles from '../../styles';
import SearchBar from './components/SearchBar';

export default function HomeScreen({}) {
    const authContext = React.useContext(AuthContext);
    return (
        <SafeAreaView style={customStyles.paddingContainer}>
            <SearchBar
                setQuery={(text: string) => {
                    console.log(text);
                }}
            />
            <Text>sdsd</Text>
            <DefaultButton text={'Sign Out'} onClick={authContext.signOut} />
        </SafeAreaView>
    );
}
