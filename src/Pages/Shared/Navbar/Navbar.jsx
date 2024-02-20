import React, { useContext, useState } from 'react';
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = ({ sideBarF, sideBar }) => {
const {user,isLoading,GoogleLogin,Logout, setIsLoading} = useContext(AuthContext)
const [error, setError] = useState('')  


console.log("user from nav", user)
const handleLogout = ()=>{
    Logout()
    .then(result=>{
        const loggedUser = result.user
                console.log("nav", loggedUser)
                
                navigate(from, { replace: true });

    })
    
    .catch(error => {
        setIsLoading(false)
        console.log(error)
        setError(error.message)
    })
}
    return (
        <div>
            <div className="navbar bg-white fixed  z-10 ">
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
                        <svg className={`swap-on fill-current ${sideBar ? 'translate-x-0' : '-translate-x-24 md:transform-none'}`}  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                    </label>
                    
                </div>

                
                <div className="navbar-end">
                <NavLink to="/POS" className=" px-3 py-2 btn-outline mx-3 text-xl font-bold text-red-400 border-2 shadow-lg shadow-red-400 hover:bg-red-400 hover:shadow-lg hover:shadow-red-400 hover:border-0">POS</NavLink>
                    {
                        user ?  <>
                        <div className="avatar placeholder">
                          <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                            {
                                user?.photoURL ? <img src={user?.photoURL} alt="" /> : <BsFillPersonFill className='w-full text-red-400'></BsFillPersonFill>
                            }
                            
                          </div>
                        </div>
                        <button onClick={handleLogout} className="font-semibold btn btn-success mx-4">Log out</button>
                      </> :
                        <NavLink to="/login" className="btn btn-secondary">Login</NavLink> 
                        
                        
                        
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;