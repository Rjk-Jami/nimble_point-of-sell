import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
const useSales = () => {
    
    const [axiosSecure] = useAxiosSecure()
    const {user,isLoadingAuth,GoogleLogin,Logout} = useContext(AuthContext)
    const { data: sales , isLoading, error, refetch  } = useQuery({
        queryKey: ['sales'],
        enabled: !!localStorage.getItem("access-token") && !!user && !isLoadingAuth,
        queryFn: async () => {
            const response = await axiosSecure.get('/sales');
            return response.data;
        }
    });

    return { sales, isLoading, error,refetch };
};

export default useSales;