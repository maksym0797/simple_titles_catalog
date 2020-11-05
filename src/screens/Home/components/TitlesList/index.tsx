import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Title from '../../../../models/Title';
import TitleItem from './TitleItem';

export default function TitlesList({
    titles,
    fetchPage,
    keyword,
}: {
    titles: Array<Title>;
    fetchPage: Function;
    keyword: string;
}) {
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log(page);
        fetchPage(page);
    }, [page]);

    useEffect(() => {
        setPage(1);
        console.log(page);
    }, [keyword]);

    return (
        <FlatList
            data={titles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={TitleItem}
            onEndReached={() => {
                setPage(page + 1);
            }}
            onEndReachedThreshold={0.5}
        />
    );
}
