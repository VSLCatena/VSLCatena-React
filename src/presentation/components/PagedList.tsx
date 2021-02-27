import * as React from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo, RefreshControl } from 'react-native';


const PAGED_LIMIT = 10

export interface State<T> {
    items: ReadonlyArray<T>,
    isLoading: boolean,
    noMoreItems: boolean,
}

/**
 * A PagedList is an easy way to display chunked data from Firebase Firestore
 */
abstract class PagedList<T> extends React.Component<Partial<FlatListProps<any>>, State<T>> {

    constructor(props: FlatListProps<any>) {
        super(props);

        this.state = {
            items: [],
            isLoading: false,
            noMoreItems: false,
        };
    }

    render(): React.ReactNode {
        return (
            <FlatList
                data={this.state.items}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={this.state.isLoading} onRefresh={this.refresh.bind(this)} />
                }
                onEndReached={this.load.bind(this)}
                {...this.props}
                />
        );
    }

    /**
     * Get new date from the source
     * @param lastItem  The last item we received, null if this is the first request
     * @param limit     The amount of items we should grab
     * @returns         A list of new data
     */
    abstract getData(lastItem: T|null, limit: number): Promise<T[]>;
    

    /**
     * Creates/renders an item
     * @param itemData  data containing the item
     * @returns         A valid react element to draw
     */
    abstract renderItem(item: ListRenderItemInfo<T>): React.ReactElement<T>;
    

    componentDidMount() {
        this.load();
    }

    private async refresh() {
        if (this.state.isLoading) return;
        console.debug("Refreshing page...");
        this.setState({
            items: [],
            noMoreItems: false,
        }, () => {
            this.load();
        });

    }

    private async load() {
        if (this.state.isLoading || this.state.noMoreItems) return;

        this.setState({
            isLoading: true,
        }, () => {
            this.loadInternal();
        });
    }

    private async loadInternal() {
        console.debug("Loading new data...");
        var lastItem = null;
        if (this.state.items.length > 0) {
            lastItem = this.state.items[this.state.items.length - 1];
        }

        let newData = await this.getData(lastItem, PAGED_LIMIT);
        console.debug("Received "+newData.length+" new items...");
        this.setState({
            isLoading: false,
            items: [...this.state.items, ...newData],
            noMoreItems: newData.length < PAGED_LIMIT,
        });
    }
}


export default PagedList;