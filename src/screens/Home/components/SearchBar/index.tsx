/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import IconFeather from 'react-native-vector-icons/Feather';

export default function SearchBar({ setQuery }: { setQuery: Function }) {
    const [text, setText] = useState('');
    useEffect(() => {
        setQuery(text);
    }, [text]);
    return (
        <View style={styles.barContainer}>
            <Input
                value={text}
                onChangeText={setText}
                keyboardType={'web-search'}
                placeholder={'Search'}
                placeholderTextColor={'#8190A5'}
                inputContainerStyle={styles.inputContainer}
                textAlignVertical={'top'}
                inputStyle={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    barContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        marginRight: 10,
    },
    inputContainer: {
        borderBottomWidth: 0,
        backgroundColor: '#E5E9F2',
        width: '100%',
    },
    input: {
        backgroundColor: '#E5E9F2',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
});
