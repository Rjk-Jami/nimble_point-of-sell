import React, { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import { NavLink, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useSales from '../../hooks/useSales';

const SalesDetails = () => {
    const { products } = useProducts()
    const { sales, isLoading, refetch } = useSales()
    let { id } = useParams();
    const sale = sales?.find((product) => product._id === id)
    // console.log(sale)
    const [saleProducts, setSaleProducts] = useState([])
    useEffect(() => {
        if (sale && products) {
            if (sale.products.length > 1) {
                const productIds = sale.products.map(saleProduct => saleProduct.id);
                console.log(productIds, "productIds")

                const allSaleProductsNames = products.filter(product => productIds.includes(product._id));
                setSaleProducts(allSaleProductsNames);

            }
            else {
                const allSaleProductsNames = products.find(product => product._id === sale.products[0].id);
                setSaleProducts(allSaleProductsNames);
            }


            // Do whatever you want with allSaleProductsNames here
        }
    }, [sale, products]);
    // console.log(saleProducts)
    return (
        <div className='mt-20 container mx-auto  '>
            <div className=" flex items-center  mb-6 gap-2">
                <div className="relative px-5">
                    <NavLink to={'/products'}><FaArrowLeft className='text-3xl pt-1 text-red-400 hover:text-red-300 '></FaArrowLeft>
                    </NavLink>
                </div>
                <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold '>Product Details : {sale?.reference}</h1>
            </div>
            <div className="px-3 md:px-0 bg-white p-5 bg-opacity-100 relative">
                <div className="flex flex-col md:flex-row gap-2 ">
                    <div className="w-full ">
                        <p className='text-xl text-center'>Name: {sale?.customer}</p>
                    </div>
                    <div className="w-full">
                        <p className='text-xl w-full text-center'>Reference: {sale?.reference}</p>
                    </div>
                    <div className="w-full">
                        <p className='text-xl w-full text-center'>Biller : {sale?.biller}</p>
                    </div>
                </div>
                <div className="text-center my-2 text-xl">
                    <p>Sale Date: {sale?.saleDate}</p>
                </div>




                <div className="bg-white p-5 bg-opacity-100 relative">
                    <div className="overflow-x-auto scrollbar" >
                        <table className="table  table-md table-pin-rows table-pin-cols " >
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='uppercase'>Product Name</th>
                                    <th className='uppercase'>quantity</th>
                                    <th className='uppercase'>price</th>


                                </tr>
                            </thead>
                            <tbody className=''>



                                {
                                    sale &&
                                    sale?.products?.map(saleP => {
                                        if(saleProducts?.length > 0){
                                            const product = saleProducts?.find(product => product._id === saleP.id);
                                            // console.log(product,"product")
                                            return (
                                                <tr className="hover:bg-red-50" key={saleP.id}>
                                                    <td className=''>{product?.name}</td>
                                                    <td className=''>{saleP.quantity}</td>
                                                    <td className=''>{saleP.quantity * product?.price}</td>
                                                </tr>
                                            );
                                        }
                                        else{
                                           
                                            return  <tr className="hover:bg-red-50" key={saleP.id}>
                                                    <td className=''>{saleProducts?.name}</td>
                                                    <td className=''>{saleP.quantity}</td>
                                                    <td className=''>{saleP.quantity * saleProducts?.price}</td>
                                                </tr>
                                        }
                                        
                                    })
                                }




                            </tbody>

                        </table>

                    </div>
                    <div className="">
                        <div className="flex justify-between">
                            <div className="">
                                <p>Coupon: {sale?.coupon}</p>
                            </div>
                            <div className="">
                                <p>total: {(sale?.totalPrice)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end">
                            <div className="">
                                <p>Discount: {sale?.discount}</p>
                            </div>

                            <div className="">
                                <p>Grand Total: {(sale?.revenue)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesDetails;