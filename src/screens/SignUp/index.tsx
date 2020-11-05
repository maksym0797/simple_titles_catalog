import { NavigationHelpers } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import DefaultButton from '../../components/button';
import authRepository from '../../repositories/authRepository';
import customStyles from '../../styles';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import AuthResponse from '../../types/AuthResponse';
import { AuthContext } from '../../AuthContext';

export default function SignUpScreen({
    navigation,
}: {
    navigation: NavigationHelpers;
}) {
    const authContext = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const signUp = async () => {
        const authResponse: AuthResponse = await authRepository.signUp(
            name,
            email,
            password
        );
        authContext.signIn('dd');
    };

    return (
        <View
            style={{
                ...customStyles.paddingContainer,
                ...styles.centeredColumn,
            }}
        >
            <Input
                defaultValue={''}
                value={name}
                onChangeText={setName}
                placeholder={'Name'}
            />
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
            <DefaultButton
                text={'Sign In'}
                containerStyle={{
                    backgroundColor: colors.success,
                }}
                textStyle={{
                    color: colors.white,
                    ...typography.bold,
                }}
                onClick={signUp}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centeredColumn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
