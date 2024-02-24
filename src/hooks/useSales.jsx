import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
const useSales = () => {
    const [axiosSecure] = useAxiosSecure()

    const { data: sales, isLoading, error, refetch  } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const response = await axiosSecure.get('/sales');
            return response.data;
        }
    });

    return { sales, isLoading, error,refetch };
};

export default useSales;