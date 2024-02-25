import React, { useEffect, useRef } from 'react';
import useSearch from '../../hooks/UseSearch';
import useSales from '../../hooks/useSales';
import Search from '../../Components/Search';
import { Helmet } from 'react-helmet-async';

const People = () => {
    const { handleKeyUp, newSales, setNewSales, noResult } = useSearch();
    const { sales, isLoading, error, refetch } = useSales()
    const searchInputRef = useRef(null)
    const allCustomerNames = [...new Set(sales?.map(sales => sales.customer))];
    // console.log(allCustomerNames)

    useEffect
    return (
        <div className='pt-20 container mx-auto '>
            <Helmet>
        <title>Nimble-POS -People</title>
      </Helmet>
            <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold'>Customer List</h1>
            <div className="mt-10 px-5 lg:px-5 xl:px-0">
                
                <div className="bg-white p-5 bg-opacity-100 relative">
                    <div className="overflow-x-auto scrollbar" >
                        <table className="table  table-md table-pin-rows table-pin-cols">
                            {/* head */}
                            <thead>
                                <tr>

                                    <th className='uppercase'>Customer</th>
                                    <th className='uppercase'>all reference </th>
                                    <th className='uppercase'>Purchase Date</th>
                                    
                                    <th className='uppercase'>Total Spend</th>

                                </tr>
                            </thead>
                            <tbody className=''>


                                {
                                    allCustomerNames?.map((product, i) => {
                                        const customerSales = sales?.filter(sale => sale.customer === product);
                                        console.log(customerSales)

                                        if (customerSales.length > 1) {
                                            return (
                                                <tr key={i} className="hover:bg-red-50">
                                                    <td className=''>{product}</td>
                                                    <td className='font-bold'>{customerSales?.map((s, index) => (
                                                        <span key={index}>
                                                            {s.reference}{index < customerSales.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}</td>
                                                   <td className='font-bold'>{customerSales?.map((s, index) => (
                                                        <span key={index}>
                                                            {s.saleDate}{index < customerSales.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}</td>
                                                    
                                                    <td className='font-bold text-xl'>{customerSales.reduce((acc, curr) => acc + curr.revenue, 0).toFixed(2)}</td>

                                                </tr>
                                            )
                                        }
                                        else {
                                            return (
                                                <tr key={i} className="hover:bg-red-50">
                                                    <td className=''>{product}</td>
                                                    <td className='font-bold'>{ customerSales[0].reference}</td>
                                                    <td className='font-bold'>{ customerSales[0].saleDate}</td>
                                                    
                                                    
                                                    <td className='font-bold text-xl'>{ customerSales[0].revenue.toFixed(2)}</td>

                                                </tr>
                                            )
                                        }


                                    })
                                }



                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default People;