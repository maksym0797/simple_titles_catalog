import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import DefaultButton from '../../components/button';
import { AuthContext } from '../../context';
import customStyles from '../../styles';

export default function HomeScreen({}) {
    const authContext = React.useContext(AuthContext);
    return (
        <SafeAreaView style={customStyles.paddingContainer}>
            <ScrollView>
                <Text>sdsd</Text>
                <DefaultButton
                    text={'Sign Out'}
                    onClick={authContext.signOut}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
