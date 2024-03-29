import React, { useContext } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { LuBox } from "react-icons/lu";
import { TbAdjustmentsCog } from "react-icons/tb";
import { RiWallet3Line } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuBadgePercent } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { NavContext } from '../../../Provider/ActiveNavProvider';

const SideNavBar = ({ sideBar }) => {
    const { nav, setNav} = useContext(NavContext)
    // console.log(nav, "side")
    const classForSidebarXl = "bg-red-100 mx-7 md:w-40 md:py-5  md:px-4  rounded-lg hover:bg-red-300 hover:text-white  hover:duration-300 hover:rounded-lg "
    const classForSidebarXlActive = "bg-red-400 mx-7 md:w-40 md:py-5 text-white   md:px-4  rounded-lg "
    
    
    const classForSideBarMd = "bg-red-100  p-3 mt-6 m-3 rounded-lg a hover:bg-red-300  hover:duration-300 hover:rounded-lg"
    const classForSideBarMdActive = "bg-red-400  p-3 mt-6 m-3 rounded-lg text-white"



    return (
        <div>
            <div className={` mt-16 transition-transform bg-red-50 ${sideBar ? "translate-x-0  " : "-translate-x-full absolute md:translate-x-0   md:hidden"
                }   text-4xl  overflow-auto scrollbar h-full fixed  top-[0px]  md:top-[0px] lg:top-[6px] xl:top-1 left-0 z-10`}
                style={{ height: 'calc(100vh - 4rem)', position: 'fixed', left: '0', zIndex: '10' }}
            >
                <ul className='flex flex-col mx-3 text-gray-600 flex-grow  '>

                    <NavLink to="/"
                        className={({ isActive }) => isActive ? `${classForSideBarMdActive}` : `${classForSideBarMd}`} >
                        <li className=""><LuLayoutDashboard></LuLayoutDashboard></li>
                    </NavLink>

                    <NavLink to="/products"
                        className={({ isActive }) => isActive || (nav === "/products") ? `${classForSideBarMdActive}` : `${classForSideBarMd}`} >
                        <li className=""><LuBox></LuBox></li>
                    </NavLink>

                    

                    <NavLink to="/expenses"
                        className={({ isActive }) => isActive || (nav === "/expenses") ? `${classForSideBarMdActive}` : `${classForSideBarMd}`} >
                        <li className=""><RiWallet3Line></RiWallet3Line></li>
                    </NavLink>

                    

                    <NavLink to="/sales"
                        className={({ isActive }) => isActive || (nav === "/sales")? `${classForSideBarMdActive}` : `${classForSideBarMd}`} >
                        <li className=""><LuBadgePercent></LuBadgePercent></li>
                    </NavLink>

                    <NavLink to="/people"
                        className={({ isActive }) => isActive || (nav === "/people")? `${classForSideBarMdActive}` : `${classForSideBarMd}`} >
                        <li className=""><BsPeople></BsPeople></li>
                    </NavLink>

                    <NavLink to="/settings"
                        className={({ isActive }) => isActive || (nav === "/settings")? `${classForSideBarMdActive}` : `${classForSideBarMd}`} >
                        <li className=""><FiSettings></FiSettings></li>
                    </NavLink>

                    <NavLink to="/reports"
                        className={({ isActive }) => isActive || (nav === "/reports") ? `${classForSideBarMdActive}` : `${classForSideBarMd}`} >
                        <li className=""><RiFileList3Line></RiFileList3Line></li>
                    </NavLink>
                </ul>

            </div>
            <div
                id='xl'
                className={`h-screen pt-16 transition-transform ${!sideBar ? "md:-translate-x-0" : "-translate-x-full absolute  "
                    } ease-out duration-300  hidden xl:block  text-4xl  overflow-auto scrollbar fixed  lg:top-1 `}
            >
                <ul className=' text-gray-600  flex flex-col gap-7 items-center my-7 '>
                    <NavLink to="/"
                        className={({ isActive }) => isActive ? `${classForSidebarXlActive}` : `${classForSidebarXl}`} >
                        <li className="md:flex md:flex-col items-center">
                            <LuLayoutDashboard></LuLayoutDashboard>
                            <p className=' text-2xl font-thin'>Dashboard</p>
                        </li>
                    </NavLink>

                    <NavLink to="/products"
                        className={({ isActive }) => isActive || (nav === "/products") ? `${classForSidebarXlActive}` : `${classForSidebarXl}`} >
                    <li className="md:flex md:flex-col items-center">
                        <LuBox></LuBox>
                        <p className=' text-2xl font-thin'>Products</p>
                    </li>
                    </NavLink>

                    

                    <NavLink to="/expenses"
                        className={({ isActive }) => isActive || (nav === "/expenses") ? `${classForSidebarXlActive}` : `${classForSidebarXl}`} >
                    <li className="md:flex md:flex-col items-center">
                        <RiWallet3Line></RiWallet3Line>
                        <p className=' text-2xl font-thin'> Expenses</p>
                    </li>
                    </NavLink>

                    

                    <NavLink to="/sales"
                        className={({ isActive }) => isActive  || (nav === "/sales")? `${classForSidebarXlActive}` : `${classForSidebarXl}`} >
                    <li className="md:flex md:flex-col items-center" >
                        <LuBadgePercent></LuBadgePercent>
                        <p className=' text-2xl font-thin'> Sales</p>
                    </li>
                    </NavLink>

                    <NavLink to="/people"
                        className={({ isActive }) => isActive || (nav === "/people") ? `${classForSidebarXlActive}` : `${classForSidebarXl}`} >
                    <li className="md:flex md:flex-col items-center">
                        <BsPeople></BsPeople>
                        <p className=' text-2xl font-thin'>People</p>
                    </li>
                    </NavLink>

                    <NavLink to="/settings"
                        className={({ isActive }) => isActive || (nav === "/settings")? `${classForSidebarXlActive}` : `${classForSidebarXl}`} >
                    <li className="md:flex md:flex-col items-center">
                        <FiSettings></FiSettings>
                        <p className=' text-2xl font-thin'> Settings</p>
                    </li>
                    </NavLink>

                    <NavLink to="/reports"
                        className={({ isActive }) => isActive || (nav === "/reports")? `${classForSidebarXlActive}` : `${classForSidebarXl}`} >
                    <li className="md:flex md:flex-col items-center">
                        <RiFileList3Line></RiFileList3Line>
                        <p className=' text-2xl font-thin'> Reports</p>
                    </li>
                    </NavLink>
                </ul>

            </div>
        </div>
    );
};

export default SideNavBar;