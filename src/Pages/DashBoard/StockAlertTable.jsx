import React from 'react';
import useProducts from '../../hooks/useProducts';
import { NavLink } from 'react-router-dom';

const StockAlertTable = () => {
    const { products, isLoading, error, refetch } = useProducts()
    const alertProducts = products?.filter(product => product.stock <= 20);
        return (
        <div className='overflow-x-auto h-44 scrollbar'>
            <div className="overflow-x-auto">
                <table className="table table-pin-rows">
                    {/* head */}
                    <thead>
                        <tr>

                            <th className='uppercase'>Code</th>
                            <th className='uppercase'>Product</th>
                            <th className='uppercase'>Quantity</th>
                            <th className='uppercase'>action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            alertProducts?.map(product=>
                                <tr className="hover:bg-red-50">

                            <td className='font-bold'>{product.code}</td>
                            <td>{product.name}</td>
                            <td className='text-red-400 font-bold'>{product.stock}</td>
                            <td><NavLink to={`/updateProduct/${product._id}`} className='badge-lg rounded-lg bg-red-200 hover:bg-red-300 hover:text-white text-sm font-bold'>Order</NavLink></td>
                        </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockAlertTable;