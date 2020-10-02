import * as React from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo, RefreshControl } from 'react-native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import { ChunkedListProps, ItemData, FetcherHolder } from '../utils/firebase/ChunkedListFetcher';



export interface State<T> {
    items: ReadonlyArray<ItemData<T>>,
    isLoading: boolean,
    fetcher: FetcherHolder<T>,
}

const DEFAULT_LOADING_LIMIT = 10;

export type PagedListProps = ChunkedListProps & Partial<FlatListProps<any>>;

/**
 * A PagedList is an easy way to display chunked data from Firebase Firestore
 */
abstract class PagedList<T> extends React.Component<Partial<PagedListProps>, State<T>> {

    constructor(props: PagedListProps) {
        super(props);
        
        
        var fetcherHolder = new FetcherHolder(
            {...this.getInfo(), ...props},
            this.convert.bind(this),
            this.loadData.bind(this),
        );

        this.state = {
            items: [],
            fetcher: fetcherHolder,
            isLoading: false,
        };
    }

    render(): React.ReactNode {
        return (
            <FlatList
                data={this.state.items}
                renderItem={this.internalRenderItem.bind(this)}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={this.state.isLoading} onRefresh={this.refresh.bind(this)} />
                }
                onEndReached={this.load.bind(this)}
                {...this.props}
                />
        );
    }

    private async refresh() {
        this.state.fetcher.reset();
    }

    private async load() {
        if (this.state.isLoading) return;

        this.setState({
            isLoading: true,
        }, () => {
            this.state.fetcher.load();
        });
    }

    private loadData(items: ReadonlyArray<ItemData<T>>) {
        this.setState({
            isLoading: false,
            items: items,
        });
    }

    /** internal function that calls renderItem */
    private internalRenderItem(
        itemData: ListRenderItemInfo<ItemData<T>>
    ): React.ReactElement<T> {
        return this.renderItem(itemData.item.item); 
    }

    /**
     * Generate needed info
     */
    abstract getInfo(): ChunkedListProps;
    
    /**
     * converts a QueryDocumentSnapshot object to <T>.
     * @param data  The snapshot retrieved from Firestore
     * @returns     The object, or null.
     */
    abstract convert(data: FirebaseFirestoreTypes.DocumentData): T|null;
    

    /**
     * Creates/renders an item
     * @param itemData  data containing the item
     * @returns         A valid react element to draw
     */
    abstract renderItem(item: T): React.ReactElement<T>;
}


export default PagedList;