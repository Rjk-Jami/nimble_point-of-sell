import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {
    
    const {Logout} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        axiosSecure.interceptors.request.use( config => {
            // Do something before request is sent
            const token = localStorage.getItem('access-token');
            if(token){
                config.headers.Authorization = `bearer ${token}`
                // console.log("axiosSecure", config.headers.Authorization)
            }
            return config;
          });

          axiosSecure.interceptors.response.use(response => 
            response, async (error)=> {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            console.log(error)
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await Logout();
                navigate('/login');
              }
            return Promise.reject(error);
          });
    },[Logout, navigate])
    
    
    
    return [axiosSecure]
};

export default useAxiosSecure;