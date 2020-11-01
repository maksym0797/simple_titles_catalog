import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import Title from '../../../../models/Title';
import typography from './../../../../styles/typography';

export default function TitleItem({ item }: { item: Title }) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{ ...typography.h3, ...typography.bold }}>
                    {item.name}
                </Text>
                <View>
                    <Text style={typography.p}>
                        Type: {item.isShow ? 'TV Show' : 'Movie'}
                    </Text>
                    <Text style={typography.p}>Release Year: {item.year}</Text>
                    <Text style={typography.p}>
                        Availiable at: {item.platformsNames}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    imageContainer: {
        flexDirection: 'column',
        width: '30%',
        height: 150,
        marginRight: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        marginVertical: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});
