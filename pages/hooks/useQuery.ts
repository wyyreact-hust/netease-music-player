import exp from 'constants';
import { useLocation } from 'react-router'

const useQuery = () => {
    const { search } = useLocation();
    const result: IDictionary<string> = {}

    search.substring(1).split('&').reduce((prev, curr) => {
        const [key, value] = curr.split('=');
        (prev as any)[key] = decodeURIComponent(value);
        return prev;
    }, result)

    return result;
}

export default useQuery;