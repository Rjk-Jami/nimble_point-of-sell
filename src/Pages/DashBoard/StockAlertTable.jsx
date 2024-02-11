import React from 'react';

const StockAlertTable = () => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Code</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr className="hover">

                            <td>abh1545</td>
                            <td>Monitor</td>
                            <td>40</td>
                            <td><button className='badge-lg rounded-lg bg-red-100 hover:bg-red-300 hover:text-white text-sm font-bold'>Order Now</button></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockAlertTable;