import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';

const useProducts = () => {
    const [axiosSecure] = useAxiosSecure()

    const { data: products, isLoading, error, refetch  } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosSecure.get('/products');
            return response.data;
        }
    });

    return { products, isLoading, error,refetch };
};

export default useProducts;