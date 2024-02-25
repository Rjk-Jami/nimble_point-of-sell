import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const useUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    
    const { data: users, isLoading: isLoadingUsers , error, refetch  } = useQuery({
        queryKey: ['users'],
        enabled: !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const response = await axiosSecure?.get('/users');
            return response.data;
        }
    });

    return { users, isLoadingUsers, error,refetch };
};

export default useUsers;