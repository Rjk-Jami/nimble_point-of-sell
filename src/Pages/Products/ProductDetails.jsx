import React from 'react';
import useProducts from '../../hooks/useProducts';
import { NavLink, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetails = () => {
    const { products, isLoading, refetch } = useProducts()
    let { id } = useParams();
    const product = products?.find((product) => product._id === id)
    console.log(product)

    return (
        <div className='mt-20 container mx-auto  '>
            <div className=" flex items-center  mb-6 gap-2">
                <div className="relative px-5">
                    <NavLink to={'/products'}><FaArrowLeft className='text-3xl pt-1 text-red-400 hover:text-red-300 '></FaArrowLeft>
                    </NavLink>
                </div>
                <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold '>Product Details : {product?.code}</h1>
            </div>
            <div className="flex flex-col xl:flex-row gap-6 ">
                <div className=" mx-auto xl:mx-0">
                    <img className='w-96' src={product?.image} alt="" />
                </div>
                <div className=" xl:w-2/3">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra  table-lg table-pin-rows table-pin-cols">
                            {/* head */}
                            <thead>
                                
                            </thead>
                            <tbody className=''>


                                {
                                    product &&
                                    <>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>ID</td>
                                            <td className='font-bold'>{product._id}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Name</td>
                                            <td className='font-bold'>{product.name}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Code</td>
                                            <td className='font-bold'>{product.code}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Category</td>
                                            <td className='font-bold'>{product.category}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Brand</td>
                                            <td className='font-bold'>{product.brand}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Sales</td>
                                            <td className='font-bold text-fuchsia-500'>{product.sales}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Cost</td>
                                            <td className='font-bold'>{product.cost}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Price</td>
                                            <td className='font-bold'>{product.price}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Stock</td>
                                            <td className={`${product?.stock && (product.stock) < 20 ? "text-red-400" : "text-green-600"} font-bold`}>{product.stock}</td>
                                        </tr>
                                        <tr className="hover:bg-red-50">
                                            <td className=''>Added Date</td>
                                            <td className='font-bold'>{product.createDate}</td>
                                        </tr>
                                    </>
                                }




                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;