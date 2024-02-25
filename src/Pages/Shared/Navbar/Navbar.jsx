import React, { useContext, useState } from 'react';
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { BsFillPersonFill } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { FiSettings } from 'react-icons/fi';

const Navbar = ({ sideBarF, sideBar }) => {
    const { user, isLoadingAuth, GoogleLogin, Logout, setIsLoading } = useContext(AuthContext)
    const [error, setError] = useState('')


    // console.log("user from nav", user)
    const handleLogout = () => {
        Logout()
            .then(result => {
                const loggedUser = result.user
                // console.log("nav", loggedUser)

                navigate(from, { replace: true });

            })

            .catch(error => {
                setIsLoading(false)
                // console.log(error)
                setError(error.message)
            })
    }
    return (
        <div>
            <div className="navbar bg-white fixed  z-50 ">
                <div className="navbar-start space-x-3 relative ">
                    <img className='w-10' src={logo} alt="" />
                    <a className={`${sideBar ? "opacity-100" : "opacity-0 md:opacity-100 "} transition-opacity ease-in-out delay-75 duration-300 text-2xl font-bold `}>
                        NIMBLE
                    </a>


                    <label className="  swap swap-rotate text-red-400">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onClick={sideBarF} />

                        {/* hamburger icon */}
                        <svg className={`swap-off fill-current  ${sideBar ? 'translate-x-0' : '-translate-x-24 md:transform-none'}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                        {/* close icon */}
                        <svg className={`swap-on fill-current ${sideBar ? 'translate-x-0' : '-translate-x-24 md:transform-none'}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                    </label>

                </div>


                <div className="navbar-end">
                    <NavLink to="/POS" className=" px-3 py-2 btn-outline mx-3 text-xl font-bold text-red-400 border-2 shadow-lg shadow-red-400 hover:bg-red-400 hover:shadow-lg hover:shadow-red-400 hover:border-0">POS</NavLink>
                    <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                    {
                                        user?.photoURL ? <><img src={user?.photoURL} alt="" tabIndex={0} role="button" className="btn btn-circle btn-md md:btn-sm" />
                                        <ul tabIndex={0} className=" dropdown-content z-[1] card card-compact p-2 shadow bg-base-100 rounded-box w-28 text-right">
                                        
                                        <li className='w-auto'><NavLink to={'/settings'} className="justify-start flex flex-row-reverse gap-2 items-center text-md hover:text-red-300 cursor-pointer " >
                                            <FiSettings   className="font-semibold  " /><p>logout</p></NavLink> </li>
                                            <li className='w-auto'><div onClick={handleLogout} className="justify-start flex flex-row-reverse gap-2 items-center text-md hover:text-red-300 cursor-pointer " >
                                            <TbLogout2   className="font-semibold  " /><p>logout</p></div> </li>
                                            
                                        </ul></> : <><BsFillPersonFill tabIndex={0} role="button" className="btn btn-circle  btn-md md:btn-sm w-full p-2 text-red-400"  ></BsFillPersonFill><ul tabIndex={0} className=" dropdown-content z-[1] card card-compact p-2 shadow bg-base-100 rounded-box w-28 text-right">
                                        
                                        <li className='w-auto'><NavLink to={'/settings'} className="justify-start flex flex-row-reverse gap-2 items-center text-md hover:text-red-300 cursor-pointer " >
                                            <FiSettings   className="font-semibold  " /><p>logout</p></NavLink> </li>
                                            <li className='w-auto'><div onClick={handleLogout} className="justify-start flex flex-row-reverse gap-2 items-center text-md hover:text-red-300 cursor-pointer " >
                                            <TbLogout2   className="font-semibold  " /><p>logout</p></div> </li>
                                            
                                        </ul></>
                                    }
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;