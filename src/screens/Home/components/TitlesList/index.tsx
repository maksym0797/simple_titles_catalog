import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Title from '../../../../models/Title';
import TitleItem from './TitleItem';

export default function TitlesList({
    titles,
    fetchPage,
    keyword,
    favouriteIds = [],
}: {
    titles: Array<Title>;
    fetchPage: Function;
    keyword: string;
    favouriteIds: Array<Number>;
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

    const renderItem = ({ item }: { item: Title }) => {
        console.log(favouriteIds);
        item.isFavourite = favouriteIds.includes(item.id);
        console.log(item.isFavourite);
        return <TitleItem item={item} />;
    };

    return (
        <>
            {false && <TitleItem item={titles[0]} />}
            <FlatList
                data={titles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onEndReached={() => {
                    setPage(page + 1);
                }}
                onEndReachedThreshold={0.5}
            />
        </>
    );
}
