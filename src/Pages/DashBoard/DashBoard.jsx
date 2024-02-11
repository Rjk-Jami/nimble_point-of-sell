import React from 'react';
import Overview1 from './Overview1';
import TopSellingP from './topSellingP';
import RevenueFromEachProducts from './RevenueFromEachProducts';
import StockAlertTable from './StockAlertTable';
import TransactionsSummary from './TransactionsSummary';
import RecentSales from './RecentSales';


const DashBoard = () => {
    return (
        <>
            <div className=" mt-20 container mx-auto">
                {/* overview */}

                <div className="mb-6 ">
                    <Overview1></Overview1>
                </div>
                {/*  top selling and Revenue From Each Products */}
                <div className="flex flex-col md:flex-row mt-6 gap-3">
                    <div className="  md:mx-0 relative w-full md:w-2/5 bg-red-100 p-5 bg-opacity-40">
                        <p className='text-2xl lg:text-3xl font-semibold absolute'>Top Selling Products</p>
                        <TopSellingP classN={"w-full"}></TopSellingP>

                    </div>
                    <div className="  md:mx-0 relative flex-1  bg-red-100 p-5 bg-opacity-40">
                        <p className='text-2xl lg:text-3xl font-semibold  left- md:left-24'>Revenue From Each Products</p>
                        <div className=" ">
                            <RevenueFromEachProducts></RevenueFromEachProducts>
                        </div>
                    </div>

                </div>
                {/*  top selling and Revenue From Each Products END*/}

                {/* stock alert and transaction summary */}
                <div className="flex flex-col md:flex-row mt-5 gap-3">
                    <div className="w-full md:w-1/2 bg-red-100 p-5 bg-opacity-40">
                        <p className=' text-2xl lg:text-3xl font-semibold'>Stock Alert</p>
                        <StockAlertTable></StockAlertTable>

                    </div>
                    <div className="w-full md:w-1/2 bg-red-100 p-5 bg-opacity-40">
                        <p className='md:ml-24 text-2xl lg:text-3xl font-semibold'>Transactions Summary </p>
                        <div className="flex  flex-row  items-center  justify-center">
                            <div className="">

                                <TransactionsSummary name={"Cash"} value={10}></TransactionsSummary>
                            </div>
                            <div className="">
                                <TransactionsSummary name={"Card"} value={50}></TransactionsSummary>
                            </div>
                        </div>
                    </div>
                </div>
                {/* stock alert and transaction summary END */}

                {/* Recent sales */}
                <div className="mt-5 bg-red-100 p-5 bg-opacity-40">
                    <p className='text-2xl lg:text-3xl font-semibold'>Recent Sales</p>
                    <RecentSales></RecentSales>
                </div>


            </div>
        </>
    );
};

export default DashBoard;