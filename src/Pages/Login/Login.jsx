import React, { useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider,getAuth,onAuthStateChanged,signInWithPopup } from "firebase/auth";
import { app } from '../../Components/firebase/firebase.config';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const {user,isLoading,GoogleLogin,Logout} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
        console.log("user",user)
const handleGoogleLogin = ()=>{
    GoogleLogin()
    navigate(from);
    // navigate(from, { replace: true });
}


        return (
        <div>
            <div className="hero min-h-screen">
            <div className="hero-content  flex-col lg:flex-row-reverse">
                {/* <div className="text-center hidden   lg:block  lg:text-left">
                    <img src="https://i.ibb.co/khLm0zY/login-banner.jpg" className='w-3/4 mx-auto rounded-xl' alt="" />
                </div> */}
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
                    <div className="card-body">
                        <form >
                        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                            <h1 className="text-5xl font-bold">Login now!</h1>

                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input className='input input-bordered' type="text" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />

                                {errors.email && <span>{errors.email.message}</span>}
                            </div> */}
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                
                                <input className="input input-bordered" type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must have at least 6 characters' } })} />
                                <div className="password-icon flex items-center gap-3 my-1" onClick={togglePasswordVisibility}>
                                    {showPassword ? <><AiFillEyeInvisible /> <span>Hide password</span></> :<> <AiFillEye /> <span>Show password</span></> }
                                </div>
                                {errors.password && <span>{errors.password.message}</span>}

                            </div> */}
                            {/* <div className="form-control mt-6">
                                <button className="btn btn-primary" type='submit'>Login</button>
                            </div> */}
                            {/* error message from firebase */}
                            {/* {
                                error ?? <p className='bg-text-red-500'>{error}</p>
                            } */}
                            {/* <div className="text-center my-3">
                                    <p className='text-sm'>New here?<Link to="/signUp"><span className='font-bold text-accent'> Create a New Account</span></Link></p>
                                </div> */}
                            <div className="flex flex-col w-full border-opacity-50">
                                    <div className="divider">OR</div>
                                    <div className="">
                                        <button onClick={handleGoogleLogin} className='btn w-full btn-outline btn-accent  text-xl font-bold'>G</button>
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