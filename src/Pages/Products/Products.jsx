import React, { useContext, useRef } from 'react';
import { RiListSettingsLine } from "react-icons/ri";
import useSearch from '../../hooks/UseSearch';
import Search from '../../Components/Search';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { RiEditLine } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import img1 from '../../assets/istockphoto-147747269-612x612.jpg'
import img2 from '../../assets/istockphoto-182848294-612x612.jpg'
import { NavContext } from '../../Provider/ActiveNavProvider';
const Products = () => {
    const { nav, setNav} = useContext(NavContext)
    const { searchResults, loading, noResultsFound, handleSearch, searchInputRef } = useSearch();
    const handleDetails=()=>{
        
    }
    const handleEdit=()=>{

    }
    const handleDelete=()=>{

    }
    return (
        <div className='mt-20 container mx-auto '>
            <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold'>Products List</h1>

            {/* product nav */}
            <div className="mt-20 px-5 lg:px-5 xl:px-0">
                <div className="flex gap-3 flex-col  lg:flex-row justify-between">
                    <div className="w-full lg:w-1/3">
                        <Search handleSearch={handleSearch} searchInputRef={searchInputRef} ></Search>
                    </div>
                    <div className="flex gap-3">
                        <Button link={'/'}>
                            <span className='flex items-center gap-2'>
                                <span className="relative group-hover:text-white font-semibold">Pdf</span>

                            </span>
                        </Button>
                        <Button link={'/createProduct'}>
                            <span className='flex items-center gap-2'>
                                <span className="relative group-hover:text-white font-semibold">Create Product</span>
                                <span className="relative group-hover:text-white"><IoMdAddCircleOutline />
                                </span>
                            </span>
                        </Button>
                    </div>
                </div>
                {/* <div className="">
                    <a href="" className="btn btn-outline btn-info rounded-md px-3.5 py-1 m-1 overflow-hidden relative group cursor-pointer  font-medium text-black ">
                        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-red-200 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease "></span>
                        <span onClick={handleDownload} className="relative text-info transition duration-300 group-hover:text-white ease">Resume</span>
                    </a>
                </div> */}


                <div className="bg-red-100 p-5 bg-opacity-40">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>

                                    <th className='uppercase'>Image</th>
                                    <th className='uppercase'>Name</th>
                                    <th className='uppercase'>Code</th>
                                    <th className='uppercase'>Category</th>
                                    <th className='uppercase'>Brand</th>
                                    <th className='uppercase'>Price</th>
                                    <th className='uppercase'>Stock</th>
                                    <th className='uppercase'>action</th>
                                </tr>
                            </thead>
                            <tbody>


                                <tr className="hover:bg-red-50">
                                    <td className=''>
                                        <img className='w-20 h-20' src={img1} alt="" />
                                        
                                    </td>
                                    <td className=''>Name</td>
                                    <td className=''>Code</td>
                                    <td className=''>Category</td>
                                    <td className=''>Brand</td>
                                    <td className=''>Price</td>
                                    <td className=''>Stock</td>


                                    <td>
                                        <div className="flex items-center gap-2 text-lg">
                                            < LuEye className='hover:text-red-300 animate-pulse 	'onClick={handleDetails} ></LuEye>
                                            < RiEditLine className='hover:text-red-300 'onClick={handleEdit}></RiEditLine>
                                            < LuTrash2 className='hover:text-red-300' onClick={handleDelete}></LuTrash2>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
            
        </div>
    );
};

export default Products;