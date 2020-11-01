import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Title from '../../../../models/Title';
import TitleItem from './TitleItem';

export default function TitlesList({ titles }: { titles: Array<Title> }) {
    return (
        <FlatList
            data={titles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={TitleItem}
        />
    );
}
