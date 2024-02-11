import React from 'react';
import Overview1 from './Overview1';
import TopSellingP from './topSellingP';
import RevenueFromEachProducts from './RevenueFromEachProducts';
import StockAlertTable from './StockAlertTable';
import TransactionsSummary from './TransactionsSummary';


const DashBoard = () => {
    return (
        <>
            <div className=" mt-20 container mx-auto">
                {/* overview */}

                <div className="mb-6 ">
                    <Overview1></Overview1>
                </div>
                {/*  top selling and Revenue From Each Products */}
                <div className="flex flex-col md:flex-row">
                    <div className="  md:mx-0 relative w-full md:w-1/3 ">
                        <p className='text-3xl font-semibold absolute'>Top Selling Products</p>
                        <TopSellingP classN={"w-full"}></TopSellingP>

                    </div>
                    <div className="  md:mx-0 relative flex-1">
                        <p className='text-3xl font-semibold absolute left- md:left-24'>Revenue From Each Products</p>
                        <div className=" mt-5">
                            <RevenueFromEachProducts></RevenueFromEachProducts>
                        </div>
                    </div>

                </div>
                {/*  top selling and Revenue From Each Products END*/}

                {/* stock alert and transaction summary */}
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <StockAlertTable></StockAlertTable>

                    </div>
                    <div className="w-full md:w-1/2">
                        <p className='md:ml-24 text-3xl font-semibold'>Transactions Summary </p>
                    <div className="flex flex-col md:flex-row  justify-center">
                        <div className="">
                            <p></p>
                            <TransactionsSummary name={"Cash"} value={10}></TransactionsSummary>
                        </div>
                        <TransactionsSummary name={"Card"} value={50}></TransactionsSummary>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashBoard;