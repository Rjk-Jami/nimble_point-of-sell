import React, { useState } from 'react';
import Navbar from './Pages/Shared/Navbar/Navbar';
import { LuLayoutDashboard } from "react-icons/lu";
import { LuBox } from "react-icons/lu";
import { TbAdjustmentsCog } from "react-icons/tb";
import { RiWallet3Line } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuBadgePercent } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";

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
        <div className={`transition-transform ${sideBar ? "translate-x-0  " : "-translate-x-full  md:translate-x-0 absolute  md:hidden"
          }  text-4xl bg-[#1e293b] scrollbar`}

        >
          <ul className='space-y-3 text-white h-screen'>
            <li className='border-2 p-3 m-3 rounded-lg'><LuLayoutDashboard></LuLayoutDashboard></li>
            <li className='border-2 p-3 m-3 rounded-lg'><LuBox></LuBox></li>
            <li className='border-2 p-3 m-3 rounded-lg'><TbAdjustmentsCog></TbAdjustmentsCog></li>
            <li className='border-2 p-3 m-3 rounded-lg'><RiWallet3Line></RiWallet3Line></li>
            <li className='border-2 p-3 m-3 rounded-lg'><MdOutlineShoppingBag></MdOutlineShoppingBag></li>
            <li className='border-2 p-3 m-3 rounded-lg'><LuBadgePercent></LuBadgePercent></li>
            <li className='border-2 p-3 m-3 rounded-lg'><BsPeople></BsPeople></li>
            <li className='border-2 p-3 m-3 rounded-lg'><FiSettings></FiSettings></li>
            <li className='border-2 p-3 m-3 rounded-lg'><RiFileList3Line></RiFileList3Line></li>
          </ul>

        </div>
        <div
          id='xl'
          className={`transition-transform ${!sideBar ? "md:-translate-x-0" : "-translate-x-full absolute  "
            } ease-out duration-300  hidden md:block  text-4xl bg-[#1e293b] overflow-auto scrollbar`}
        >
          <ul className=' text-white h-screen flex flex-col gap-7 items-center my-7 '>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4  rounded-lg'>
              <LuLayoutDashboard></LuLayoutDashboard>
              <p className=' text-2xl font-thin'>Dashboard</p>
              </li>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg '>
              <LuBox></LuBox>
              <p className=' text-2xl font-thin'>Products</p>
              </li>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg'>
              <TbAdjustmentsCog></TbAdjustmentsCog>
              <p className=' text-2xl font-thin'>Adjustments</p>
              </li>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg '>
              <RiWallet3Line></RiWallet3Line>
              <p className=' text-2xl font-thin'> Expenses</p>
              </li>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg '>
              <MdOutlineShoppingBag></MdOutlineShoppingBag>
              <p className=' text-2xl font-thin'>Purchases</p>
              </li>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg  '>
              <LuBadgePercent></LuBadgePercent>
              <p className=' text-2xl font-thin'> Sales</p>
              </li>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg'>
              <BsPeople></BsPeople>
              <p className=' text-2xl font-thin'>People</p>
              </li>
            <li className='mx-7 md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg'>
              <FiSettings></FiSettings>
              <p className=' text-2xl font-thin'> Settings</p>
              </li>
            <li className='mx-7  md:w-40 md:py-5 border-2 md:flex md:flex-col items-center md:px-4 rounded-lg'>
              <RiFileList3Line></RiFileList3Line>
              <p className=' text-2xl font-thin'> Reports</p>
              </li>
          </ul>

        </div>
        {/* content */}
        <div className=" flex-1">
          <div className=" bg-slate-500 w-full h-40">

          </div>
        </div>
      </div>
    </div>

  );
};

export default App;