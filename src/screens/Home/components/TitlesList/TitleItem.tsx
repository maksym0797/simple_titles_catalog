import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import Title from '../../../../models/Title';
import typography from './../../../../styles/typography';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import userRepository from '../../../../repositories/userRepository';

export default function TitleItem({ item }: { item: Title }) {
    const [isFavourite, setFavourite] = useState(item.isFavourite);

    useEffect(() => {
        setFavourite(item.isFavourite);
    }, [item.isFavourite]);

    const toggleFavourite = () => {
        if (isFavourite) {
            userRepository.dislikeTitle(item.id);
        } else {
            userRepository.likeTitle(item.id);
        }
        setFavourite(!isFavourite);
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <View style={styles.descriptionContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '65%',
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={styles.titleContainer}>
                        <Text
                            style={{
                                ...typography.h4,
                                ...typography.bold,
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                    <IconAwesome
                        name={isFavourite ? 'heart' : 'heart-o'}
                        size={22}
                        color={'#fff'}
                        onPress={toggleFavourite}
                    />
                </View>

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
    titleContainer: {
        flexDirection: 'row',
        maxWidth: '80%',
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    imageContainer: {
        flexDirection: 'column',
        width: '30%',
        height: 150,
        marginRight: 15,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        marginVertical: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
});
