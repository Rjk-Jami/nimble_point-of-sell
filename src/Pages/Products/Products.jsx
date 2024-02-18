import React, { useContext, useEffect, useRef, useState } from 'react';
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
import useProducts from '../../hooks/useProducts';
import { FallingLines } from 'react-loader-spinner';

const Products = () => {
    const { nav, setNav} = useContext(NavContext)
    const { handleKeyUp, newProducts, setNewProducts,noResult} = useSearch();
    const { products, isLoading, error,refetch } = useProducts()
    const  searchInputRef = useRef(null)

    useEffect(()=>{
        setNewProducts(products)

    },[products])

   

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
                    <div className="w-full lg:w-1/3 flex">
                        <div className="flex-1">
                        <Search handleKeyUp={handleKeyUp} searchInputRef={searchInputRef} ></Search>
                        </div>
                        
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
                


                <div className="bg-white p-5 bg-opacity-100 relative">
                    <div className="overflow-x-auto ">
                        <table className="table ">
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
                            <tbody className=''>
                                
                                
                            {
                                        newProducts?.map(product=> <tr className="hover:bg-red-50">
                                        <td className=''>
                                            <img className='w-20 h-20' src={product.image} alt="" />
                                           
                                        </td>
                                        <td className=''>{product.name}</td>
                                        <td className='font-bold'>{product.code}</td>
                                        <td className=''>{product.category}</td>
                                        <td className=''>{product.brand}</td>
                                        <td className='font-bold'>{product.price}</td>
                                        <td className={`${product?.stock && parseInt(product.stock) < 20 ? "text-red-400" : "text-green-600"} font-bold`}>{product.stock}</td>
    
    
                                        <td>
                                            <div className="flex items-center gap-2 text-lg">
                                                < LuEye className='hover:text-red-300 animate-pulse 	'onClick={handleDetails} ></LuEye>
                                                < RiEditLine className='hover:text-red-300 'onClick={handleEdit}></RiEditLine>
                                                < LuTrash2 className='hover:text-red-300' onClick={handleDelete}></LuTrash2>
                                            </div>
                                        </td>
                                    </tr>)
                                       } 

                                

                            </tbody>
                            
                        </table>
                        
                    </div>
                </div>


            </div>
            {
                                    noResult && <div>
                                        <p className='text-2xl text-center '>{noResult}</p>
                                    </div>
                                }
        </div>
    );
};

export default Products;