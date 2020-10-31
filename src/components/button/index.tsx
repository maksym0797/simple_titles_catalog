import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, } from 'react-native';
import typography from '../../styles/typography';

export default function DefaultButton(
    {
        text,
        containerStyle,
        textStyle,
        onClick,
    } : {
        text: string,
        containerStyle: object | null,
        textStyle: object | null,
        onClick: Function | null,
    }
) {
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
                style={{
                    ...styles.container,
                    ...containerStyle,
                }}
                onPress={onClick}
            >
                <Text style={{
                    ...styles.text,
                    ...textStyle,
                }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        height: 60,
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        ...typography.h3,
        ...typography.centerText,
        ...typography.bold,
        color: '#000',
    },
});
