import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useProducts = () => {
    const [axiosSecure] = useAxiosSecure()
    const {user,isLoadingAuth,GoogleLogin,Logout} = useContext(AuthContext)

    const { data: products, isLoading, error, refetch  } = useQuery({
        queryKey: ['products'],
        enabled: !!localStorage.getItem("access-token") && !!user && !isLoadingAuth,
        queryFn: async () => {
            const response = await axiosSecure?.get('/products');
            return response.data;
        }
    });

    return { products, isLoading, error,refetch };
};

export default useProducts;