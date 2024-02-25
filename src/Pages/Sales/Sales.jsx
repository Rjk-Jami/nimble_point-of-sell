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
import useSales from '../../hooks/useSales';
import { Helmet } from 'react-helmet-async';

const Sales = () => {
    const { nav, setNav } = useContext(NavContext)
    const { handleKeyUpCode, newSales, setNewSales, noResult ,inputLoad} = useSearch();
    const { sales, isLoading, error, refetch } = useSales()
    const searchInputRef = useRef(null)
    const [axiosSecure] = useAxiosSecure()
    const [totalSales, setTotalSales] = useState(0)
    useEffect(() => {
        setNewSales(sales)



    }, [sales,inputLoad])
    useEffect(() => {
        setNav('/')

    }, [])
    // total Expense
    useEffect(() => {
        let totalSales = 0;
        sales?.forEach(product => {
            const total = product.revenue
            totalSales += total;
        });
        setTotalSales(totalSales);
    }, [sales]);

    const handleSelect = () => {

        setNewSales(sales)
        
    }

    return (
        <div className='mt-20 container mx-auto '>
            <Helmet>
        <title>Nimble-POS -Sales</title>
      </Helmet>
            <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold'>Total Sales : {(totalSales).toFixed(2)}</h1>

            {/* product nav */}
            <div className="mt-20 px-5 lg:px-5 xl:px-0">
                <div className="flex gap-3 flex-col  lg:flex-row justify-between">
                    <div className="w-full lg:w-1/3 flex">
                        <div className="flex-1">
                            <Search  handleSelect={handleSelect} placeholder={"Search With Reference"} handleKeyUp={handleKeyUpCode} searchInputRef={searchInputRef} ></Search>
                        </div>

                    </div>
                    <div className="flex gap-3">

                        <Button link={'/sales'}>
                            <span className='flex items-center gap-2'>
                                <span className="relative group-hover:text-white font-semibold">Pdf</span>

                            </span>
                        </Button>
                        <Button link={'/pos'}>
                            <span className='flex items-center gap-2'>
                                <span className="relative group-hover:text-white font-semibold">Create Sales</span>
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
                                    <th className='uppercase'>reference</th>
                                    <th className='uppercase'>name</th>
                                    <th className='uppercase'>biller</th>
                                    <th className='uppercase'>Items</th>
                                    <th className='uppercase'>Price</th>
                                    <th className='uppercase'>discount</th>
                                    <th className='uppercase'>Coupon</th>
                                    <th className='uppercase'>Grand Price</th>
                                    <th className='uppercase'>action</th>
                                </tr>
                            </thead>
                            <tbody className=''>


                                {
                                    newSales?.map(product => <tr key={product._id} className="hover:bg-red-50">
                                        <td className=''>{product.saleDate}</td>
                                        <td className='font-bold'>{product.reference}</td>
                                        <td className='font-bold'>{product.customer}</td>
                                        <td className='font-bold'>{product.biller}</td>
                                        <td className=''>{product.products.length}</td>
                                        <td className=''>{(product.totalPrice).toFixed(2)}</td>
                                        <td className='font-bold'>{product.discount}</td>
                                        <td className='font-bold'>{product?.coupon}</td>
                                        <td className='font-bold'>{(product.revenue).toFixed(2)}</td>



                                        <td>
                                            <div className="flex items-center gap-2 text-md ">
                                                <NavLink to={`/salesDetails/${product._id}`}>
                                                    <div className="hover:text-red-300 animate-pulse flex items-center gap-1 font-bold">
                                                        < LuEye className=' '  ></LuEye>
                                                        <p>Details</p>
                                                    </div>
                                                </NavLink>


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

export default Sales;