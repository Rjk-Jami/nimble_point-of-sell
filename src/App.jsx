import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Pages/Shared/Navbar/Navbar';

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SideNavBar from './Pages/Shared/SideNavBar/SideNavBar';
import { AuthContext } from './Provider/AuthProvider';
import Login from './Pages/Login/Login';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [sideBar, setSideBar] = useState(false)
  const { user, isLoadingAuth } = useContext(AuthContext)
  const location = useLocation()
  //need to change -=========================================
  const inLog = localStorage.getItem('inLog')
  const inLogToken = import.meta.env.VITE_INLOGTOKEN
  // console.log(inLogToken, "inLogToken")
  // size controller for chart, so that it reload in every media breakpoint.

  useEffect(() => {
    const mediaQuery640 = window.matchMedia('(max-width: 640px)');
    const mediaQuery768 = window.matchMedia('(min-width: 768px)');
    const mediaQuery1024 = window.matchMedia('(min-width: 1024px)');
    const mediaQuery1280 = window.matchMedia('(min-width: 1280px)');
    const mediaQuery1366 = window.matchMedia('(min-width: 1366px)');

    const handleChange = () => {

      if (mediaQuery640.matches || mediaQuery1024.matches || mediaQuery1280.matches || mediaQuery768 || mediaQuery1366) {
        window.location.reload();
      }
    };

    mediaQuery640.addEventListener('change', handleChange);
    mediaQuery768.addEventListener('change', handleChange);
    mediaQuery1024.addEventListener('change', handleChange);
    mediaQuery1280.addEventListener('change', handleChange);
    mediaQuery1366.addEventListener('change', handleChange);


    return () => {
      mediaQuery640.removeEventListener('change', handleChange);
      mediaQuery768.removeEventListener('change', handleChange);
      mediaQuery1024.removeEventListener('change', handleChange);
      mediaQuery1280.removeEventListener('change', handleChange);
      mediaQuery1366.removeEventListener('change', handleChange);
    };
  }, []);
  // console.log(sideBar)

  const sideBarF = () => {
    setSideBar(!sideBar)
  }





  return (

    <>
      {(inLogToken === inLog || user) ?
        <div className='relative'>
          <Toaster
            position="top-right"
            reverseOrder={true}
          />
          <Navbar sideBarF={sideBarF} sideBar={sideBar} ></Navbar>

          <div className="flex relative">
            {/* side bar */}
            <SideNavBar sideBar={sideBar} ></SideNavBar>
            {/* content */}
            <div className={`${sideBar ? "xl:pl-28" : "xl:ml-56"} w-full `} >
          
              <Outlet></Outlet>

            </div>
          </div>

        </div> : <Login></Login>
      }
    </>

  );
};

export default App;