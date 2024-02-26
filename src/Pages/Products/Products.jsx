import React, { useContext, useEffect, useRef, useState } from 'react';
import useSearch from '../../hooks/UseSearch';
import Search from '../../Components/Search';
import { Link, NavLink } from 'react-router-dom';
import Button from '../../Components/Button';
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { RiEditLine } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import { NavContext } from '../../Provider/ActiveNavProvider';
import useProducts from '../../hooks/useProducts';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Products = () => {
    const { nav, setNav } = useContext(NavContext)
    const { handleKeyUp, newProducts, setNewProducts, noResult ,inputLoad} = useSearch();
    const { products, isLoading, error, refetch } = useProducts()
    const searchInputRef = useRef(null)
    const [axiosSecure] = useAxiosSecure()
    useEffect(() => {
        setNav('/')

    }, [])
    useEffect(() => {
        setNewProducts(products)

    }, [products,inputLoad])



    
    const handleDelete = (id) => {
        // console.log(id)
        axiosSecure.delete(`/deleteProduct/${id}`)
            .then(res => {
                // console.log(res.data.deletedCount)
                if (res.data.deletedCount) {
                    toast.success('Deleted!')
                    refetch()
                }
            })

    }
    const handleSelect = () => {

        setNewProducts(products)
        
    }
    return (
        <div className='mt-20 container mx-auto '>
            <Helmet>
        <title>Nimble-POS -Product</title>
      </Helmet>
            <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold'>Products List : {products?.length}</h1>

            {/* product nav */}
            <div className="mt-5 px-5 lg:px-5 xl:px-0">
                <div className="flex gap-3 flex-col  lg:flex-row justify-between">
                    <div className="w-full lg:w-1/3 flex">
                        <div className="flex-1">
                            <Search handleSelect={handleSelect} placeholder={"Search With Name" } handleKeyUp={handleKeyUp} searchInputRef={searchInputRef} ></Search>
                        </div>

                    </div>
                    <div className="flex gap-3">
                        
                        <Button link={'/products'}>
                            <span className='flex items-center gap-2'>
                                <span className="relative group-hover:text-white font-semibold ">Pdf</span>

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


                {/* h-[600px] */}
                <div className="bg-white p-5 bg-opacity-100 relative">
                    <div className="overflow-x-auto scrollbar " >
                        <table className="table  table-sm table-pin-rows table-pin-cols">
                            {/* head */}
                            <thead className=''>
                                <tr>

                                    <th className='uppercase'>Image</th>
                                    <th className='uppercase'>Name</th>
                                    <th className='uppercase'>Code</th>
                                    <th className='uppercase'>Category</th>
                                    <th className='uppercase'>Brand</th>
                                    <th className='uppercase'>Price</th>
                                    <th className='uppercase'>Sales</th>
                                    <th className='uppercase'>Stock</th>
                                    <th className='uppercase'>action</th>
                                </tr>
                            </thead>
                            <tbody className=''>


                                {
                                    newProducts?.map(product => <tr className="hover:bg-red-50">
                                        <td className=''>
                                            <img className='w-10 h-10 md:w-20 md:h-20 ' src={product.image} alt="" />

                                        </td>
                                        <td className=''>{product.name}</td>
                                        <td className='font-bold'>{product.code}</td>
                                        <td className=''>{product.category}</td>
                                        <td className=''>{product.brand}</td>
                                        <td className='font-bold'>{product.price}</td>
                                        <td className='font-bold text-fuchsia-500'>{product.sales}</td>
                                        <td className={`${product?.stock && parseInt(product.stock) < 20 ? "text-red-400" : "text-green-600"} font-bold`}>{product.stock}</td>


                                        <td>
                                            <div className="flex items-center gap-2 text-lg">
                                                <NavLink to={`/productDetails/${product._id}`}>
                                                < LuEye className='hover:text-red-300 animate-pulse '  ></LuEye>
                                                </NavLink>
                                                <NavLink to={`/updateProduct/${product._id}`}>
                                                < RiEditLine className='hover:text-red-300 '></RiEditLine>
                                                </NavLink>
                                                < LuTrash2 className='hover:text-red-300' onClick={() => handleDelete(product._id)}></LuTrash2>
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
                    <p className='text-2xl text-center px-5 lg:px-5 xl:px-0 w-full'>{noResult}</p>
                </div>
            }
        </div>
    );
};

export default Products;