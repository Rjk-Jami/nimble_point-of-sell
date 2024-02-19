import React from 'react';
import { NavLink } from 'react-router-dom';

const RecentSales = () => {
    return (
        <div className='overflow-x-auto'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>REFERENCE</th>
                            <th>CUSTOMER</th>
                            <th>STATUS</th>
                            <th>GRAND TOTAL</th>
                            <th>PAID</th>
                            <th>DUE</th>
                            <th>PAYMENT STATUS</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr className="hover:bg-red-50">

                            <td className='link text-blue-600 font-bold'><NavLink>1545548</NavLink></td>
                            <td>Name</td>
                            <td>
                                <button className=' badge bg-opacity-50  badge-success rounded-lg    text-sm font-semibold'>Complete</button>
                                <button className=' badge  badge-error bg-opacity-50 rounded-lg    text-sm font-semibold'>Incomplete</button>
                            </td>
                            
                            <td>$2200</td>
                            <td>$200</td>
                            <td>$200</td>
                            <td>
                                <button className=' badge badge-outline badge-success rounded-lg    text-sm font-semibold'>Paid</button>
                                <button className=' badge badge-outline badge-error rounded-lg    text-sm font-semibold'>Due</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentSales;