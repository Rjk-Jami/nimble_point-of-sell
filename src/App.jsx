import React, { useState } from 'react';
import Navbar from './Pages/Shared/Navbar/Navbar';

import { Outlet } from 'react-router-dom';
import SideNavBar from './Pages/Shared/SideNavBar/SideNavBar';

const App = () => {
  const [sideBar, setSideBar] = useState(false)
  console.log(sideBar)

  const sideBarF = () => {
    setSideBar(!sideBar)
  }





  return (
    <div className='relative'>
      <Navbar sideBarF={sideBarF} sideBar={sideBar} ></Navbar>
      <div className="flex relative">
        {/* side bar */}
        <SideNavBar sideBar={sideBar} ></SideNavBar>
        {/* content */}
        <div className={`${sideBar ? "pl-28" : ""} flex-1 `} >
         
         <Outlet></Outlet>
         
        </div>
      </div>
    
    </div>

  );
};

export default App;