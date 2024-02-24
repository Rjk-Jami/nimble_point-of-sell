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
const Expenses = () => {
    const { nav, setNav } = useContext(NavContext)
    const { handleKeyUp, newProducts, setNewProducts, noResult } = useSearch();
    const { products, isLoading, error, refetch } = useProducts()
    const searchInputRef = useRef(null)
    const [axiosSecure] = useAxiosSecure()
const [totalExpense, setTotalExpense] = useState(0)
    useEffect(() => {
        setNewProducts(products)
        
        

    }, [products])
    useEffect(() => {
        setNav('/')

    }, [])
    // total Expense
    useEffect(() => {
        let totalExpense = 0;
        products?.map(product => {
            const total = product.price * (product.sales + product.stock);
            totalExpense += total; 
        });
        setTotalExpense(totalExpense);
    }, [products]);

    
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
    return (
        <div className='mt-20 container mx-auto '>

            <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold'>Total Expense : {(totalExpense).toFixed(2)}</h1>

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
                                <span className="relative group-hover:text-white font-semibold">Create Expense</span>
                                <span className="relative group-hover:text-white"><IoMdAddCircleOutline />
                                </span>
                            </span>
                        </Button>
                    </div>
                </div>



                <div className="bg-white p-5 bg-opacity-100 relative">
                    <div className="overflow-x-auto scrollbar" >
                        <table className="table  table-md table-pin-rows table-pin-cols">
                            {/* head */}
                            <thead>
                                <tr>

                                    <th className='uppercase'>Date</th>
                                    <th className='uppercase'>Code</th>
                                    <th className='uppercase'>name</th>
                                    <th className='uppercase'>Total</th>
                                    <th className='uppercase'>Category</th>
                                    <th className='uppercase'>Supplier</th>
                                    <th className='uppercase'>Unit Price</th>
                                    <th className='uppercase'>Stock</th>
                                    <th className='uppercase'>Total Expense</th>
                                    <th className='uppercase'>action</th>
                                </tr>
                            </thead>
                            <tbody className=''>


                                {
                                    newProducts?.map(product => <tr className="hover:bg-red-50">
                                        <td className=''>{product.createDate}</td>
                                        <td className='font-bold'>{product.code}</td>
                                        <td className='font-bold'>{product.name}</td>
                                        <td className='font-bold'>{product.stock + product.sales}</td>
                                        <td className=''>{product.category}</td>
                                        <td className=''>{product.brand}</td>
                                        <td className='font-bold'>{product.price}</td>
                                        <td className={`${product?.stock && parseInt(product.stock) < 20 ? "text-red-400" : "text-green-600"} font-bold`}>{product.stock}</td>
                                        <td className='font-bold'>{(product.price * (product.stock + product.sales)).toFixed(2)}</td>

                                        <td>
                                            <div className="flex items-center gap-2 text-lg ">
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
                    <p className='text-2xl text-center '>{noResult}</p>
                </div>
            }
        </div>
    );
};

export default Expenses;