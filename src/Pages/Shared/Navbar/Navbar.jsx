import React, { useContext, useState } from 'react';
import logo from '../../../assets/logo.svg'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
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

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?  <>
                        <div className="avatar placeholder">
                          <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                            <img src={user?.photoURL} alt="" />
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