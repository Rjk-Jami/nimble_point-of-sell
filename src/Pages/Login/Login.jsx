import React, { useContext, useEffect, useState } from 'react';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import img from '../../assets/logo.png'
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const { user, isLoadingAuth, GoogleLogin, Logout, createUserWithEmailAndPass, SignInWithEmailAndPass } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
  
    const navigate = useNavigate();
    const to = '/'
    // console.log("user", user)
   

    const onSubmit = (data) => {
        // console.log(data);
        // Perform login logic here

        SignInWithEmailAndPass(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                // console.log(loggedUser)
                // add user to db
                if(loggedUser){
                    const userData = {
                        email: loggedUser.email,
                        joinDate: loggedUser.metadata.creationTime,
                        role: 'admin'
                    }
                    //    console.log(userData)
                    // axios.post('https://nimble-server-seven.vercel.app/user', userData)
                    //     .then(res => {
                            
                           
                    //     })
                        setError('')
                        navigate(to);
                }   

               
            })
            .catch(error => {

                // console.log(error)
                setError(error.message)
            })
    }

    //password show and hide
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    //google login
    const handleGoogleLogin = () => {
        GoogleLogin()
        .then(result => {
            const loggedUser = result.user
            // console.log(loggedUser)
            // add user to db
            if(loggedUser){
                const userData = {
                    email: loggedUser.email,
                    joinDate: loggedUser.metadata.creationTime,
                    role: 'biller'
                }
                   console.log(userData)
                // axios.post('https://nimble-server-seven.vercel.app/user', userData)
                //     .then(res => {
                        
                //     })
                    setError('')
                        navigate(to);
            }

            
        })
        // navigate(from);
       
    }


    return (
        <div className=" bg-red-400 w-full">
<Helmet>
        <title>Nimble-POS -Login</title>
      </Helmet>
            <div className="  h-screen flex items-center">
                <div className="md:w-8/12 xl:w-9/12 hidden md:flex items-center">
                    {/* <img className='h-80' src={img} alt=""/> */}
                    <div className="mx-8">
                        <h1 className='font-bold md:text-6xl xl:text-9xl text-white'>Nimble POS</h1>
                        <h1 className='font-bold  md:text-2xl xl:text-4xl text-white lg:ms-1 xl:ms-2 '>Manage your business in <span className='font-extrabold'>One</span> platform</h1>
                    </div>
                </div>
                <div className="relative w-full md:w-4/12 xl:w-3/12 h-screen px-4 flex items-center  bg-white justify-center">
                    <div className="absolute flex items-center  top-0">
                        <img className='w-32 md:w-20 lg:w-32 mb-6 ' src={img} alt="" />
                        <h1 className='font-bold text-4xl md:text-2xl xl:text-5xl text-black'>Nimble POS</h1>
                    </div>
                    <div className="w-full">

                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="text-4xl font-bold text-center">Login to <span className='text-red-400'>Dashboard</span></h1>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input placeholder='admin@gmail.com'  className='input input-bordered' type="text" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />

                                    {errors.email && <span>{errors.email.message}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>

                                    <input placeholder='admin123' className="input input-bordered" type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must have at least 6 characters' } })} />
                                    <div className="password-icon flex items-center gap-3 my-1" onClick={togglePasswordVisibility}>
                                        {showPassword ? <><AiFillEyeInvisible /> <span>Hide password</span></> : <> <AiFillEye /> <span>Show password</span></>}
                                    </div>
                                    {errors.password && <span>{errors.password.message}</span>}

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn   hover:bg-red-300 hover:text-white bg-red-400 font-bold text-xl" type='submit'>Login</button>
                                </div>
                                {/* error message from firebase */}
                                <div className="text-red-500">
                                {
                                    error ?? <p className=''>{error}</p>
                                }
                                </div>

                                <div className="flex flex-col w-full border-opacity-50">
                                    <div className="divider">OR</div>
                                    <div className="">
                                        <button onClick={handleGoogleLogin} className='btn w-full btn-outline hover:border-0 hover:bg-red-400  text-xl font-bold'>G</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;