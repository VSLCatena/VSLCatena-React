import firestore from "@react-native-firebase/firestore";
import { DocumentSnapshot } from "../TypeAliases";

export interface ChunkedListProps {
    path: string,
    orderedBy: string,
    descending?: boolean,
    limit?: number,
}

export default class ChunkedListFetcher {
    private lastDocument: DocumentSnapshot|null = null;
    private isLoading: boolean = false;
    isAtEnd: boolean = false;

    private props: Required<ChunkedListProps>;

    constructor(
        props: ChunkedListProps
    ) {
        this.props = {
            descending: false,
            limit: 10,
            ...props
        };
    }

    async fetchNext(): Promise<DocumentSnapshot[]|null> {
        // If we're already loading we just return null
        if (this.isLoading || this.isAtEnd) {
            return null;
        }

        // We set ourself as loading
        this.isLoading = true;

        // Create a collection reference and order it by what we retrieved from
        var reference = firestore().collection(this.props.path)
            .orderBy(this.props.orderedBy, (this.props.descending != true) ? "asc" : "desc");
        
        // If it's not the first call we want to start after the last document
        if (this.lastDocument != null)
            reference = reference.startAfter(this.lastDocument);

        // Limit the amount of documents
        reference = reference.limit(this.props.limit);

        // And get the data
        var data = (await reference.get()).docs;
        
        // If the data we received is smaller than the limit we set
        // we know that we're at the end, so we stop.
        if (data.length < this.props.limit) {
            this.isAtEnd = true;
        }

        // Keep a record of the last document. This is so we can make a request later
        // with this last document as startAfter later.
        this.lastDocument = data[data.length - 1];

        // Set isLoading to false
        this.isLoading = false;
        
        // And return the data
        return data;
    }
}


export interface ItemData<T> {
    id: string,
    item: T,
}


export class FetcherHolder<T> {

    private items: ReadonlyArray<ItemData<T>> = [];
    private fetcher: ChunkedListFetcher;

    /**
     * @param props     The props that will be used for firebase
     * @param converter Converts the documentData to type <T>
     * @param callback  The function that will be called when new data is loaded
     */
    constructor(
        private props: ChunkedListProps,
        private converter: (data: DocumentSnapshot) => T|null,
        private callback: (items: ReadonlyArray<ItemData<T>>) => void,
    ) {
        this.fetcher = new ChunkedListFetcher(props);
        this.load();
    }

    async load() {
        var fetcher = this.fetcher;

        if (fetcher == null || fetcher.isAtEnd)
            return;
        
        var newData = await fetcher.fetchNext();
        
        if (this.fetcher !== fetcher)
            return;

        if (newData !== null) {
            var convertedData = newData.map(doc => {
                var item = this.converter(doc);
                if (item == null) return null;

                return {
                    id: doc.id,
                    item: item,
                }
            })
            .filter((item): item is ItemData<T> => item !== null);

            this.items = [...this.items, ...convertedData];
            this.callback(this.items);
        }
    }

    async reset() {
        this.fetcher = new ChunkedListFetcher(this.props);
        this.items = [];
        this.load();
    }
}