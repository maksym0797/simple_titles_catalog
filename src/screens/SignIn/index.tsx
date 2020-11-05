import { NavigationHelpers } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import DefaultButton from '../../components/button';
import authRepository from '../../repositories/authRepository';
import colors from '../../styles/colors';
import AuthResponse from '../../types/AuthResponse';
import { AuthContext } from '../../AuthContext';
import customStyles from './../../styles';
import typography from './../../styles/typography';

export default function SignInScreen({
    navigation,
}: {
    navigation: NavigationHelpers;
}) {
    const authContext = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    };

    const signIn = async () => {
        const authResponse: AuthResponse = await authRepository.login(
            email,
            password
        );
        authContext.signIn(authResponse.token);
    };

    return (
        <View
            style={{ ...customStyles.paddingContainer, ...styles.centerColumn }}
        >
            <View style={styles.header}>
                <Text style={typography.h1}>Titles Catalog</Text>
            </View>
            <View style={styles.formBody}>
                <Input
                    defaultValue={''}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'E-mail'}
                />
                <Input
                    defaultValue={''}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholder={'Password'}
                />
            </View>
            <View style={styles.footer}>
                <DefaultButton
                    text={'Sign In'}
                    containerStyle={{
                        backgroundColor: colors.success,
                    }}
                    textStyle={{
                        color: colors.white,
                        ...typography.bold,
                    }}
                    onClick={signIn}
                />
                <DefaultButton
                    text={'Sign Up'}
                    textStyle={{
                        color: colors.white,
                    }}
                    onClick={goToSignUp}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centerColumn: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    formBody: {
        width: '90%',
        height: '30%',
    },
    header: {
        height: '20%',
        justifyContent: 'center',
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '30%',
    },
});
