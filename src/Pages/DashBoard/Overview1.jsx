import React from 'react';
import productImg from "../../assets/products.png"
import orderImg from "../../assets/checklist.png"
import revenueImg from "../../assets/revenue.png"
import expenseImg from "../../assets/spending.png"
const Overview1 = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
                    
                        <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                            <img className='w-20' src={productImg} alt="" />
                            <div className="text-right">
                                <p className='text-xl font-semibold'>Total Products</p>
                                <p className='text-4xl font-bold'>110</p>
                            </div>
                        </div>
                        <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                            <img className='w-20' src={orderImg} alt="" />
                            <div className="text-right">
                                <p className='text-xl font-semibold'>Total <span>O</span>ders</p>
                                <p className='text-4xl font-bold'>272</p>
                            </div>
                        </div>
                        <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                            <img className='w-20' src={revenueImg} alt="" />
                            <div className="text-right">
                                <p className='text-xl font-semibold'>Total Revenue</p>
                                <p className='text-4xl font-bold'>$87561</p>
                            </div>
                        </div>
                        <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                            <img className='w-20' src={expenseImg} alt="" />
                            <div className="text-right">
                                <p className='text-xl font-semibold'>Total Expenses</p>
                                <p className='text-4xl font-bold'>$43650</p>
                            </div>
                        </div>
                        
                    
                    
                        
                    
                </div>
    );
};

export default Overview1;