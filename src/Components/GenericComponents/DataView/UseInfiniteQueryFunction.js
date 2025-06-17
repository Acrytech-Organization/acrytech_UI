import { useInfiniteQuery } from '@tanstack/react-query';
import { FETCHING_ITEMS_LIMIT } from '../../../Helpers/helpers';

const UseInfiniteQueryFunction = (props) => {
    const {
        queryKeyParameter,
        queryFunction,
        limitSupported,
        filterData
    } = props;

    const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: queryKeyParameter,
        queryFn: queryFunction,
        getNextPageParam: (_lastPage, allPages) => {
            if (!limitSupported) return undefined;
            if (_lastPage.length < FETCHING_ITEMS_LIMIT) return undefined;
            return allPages.length;
        },
        select: (result) => {
            let dataToReturn = result.pages.flatMap((current) => current);
            if (filterData) {
                dataToReturn = filterData(dataToReturn);
            }
            return dataToReturn;
        }
    });
    const loading = isLoading || isFetching;
    const canFetchData = !loading && limitSupported && hasNextPage;

    const fetchOnScroll = (event) => {
        if (!canFetchData) return
        const { scrollTop, clientHeight, scrollHeight } = event.target;

        // clientHeight is data showing on screen (in the dataView)
        // scrollHeight is entire height of the data if shown all on the screen.
        // scrollTop is the height of the data which is scrolled out of the dataView (from the top)
        // scrollTop is scrollHeight-clientHeight
        // we want to fetchNextData when we alredy viewed around 90% the entire data
        // i.e fetch when 10% remaining;

        const fetchOn = scrollHeight * 90 / 100;

        if (scrollTop + clientHeight >= fetchOn) {
            fetchNextPage();
        }
    };

    return { data, error, loading, fetchNextPage, canFetchData, fetchOnScroll };
};

export default UseInfiniteQueryFunction;
