import React from 'react';
import Overview1 from './Overview1';
import TopSellingP from './topSellingP';
import RevenueFromEachProducts from './RevenueFromEachProducts';


const DashBoard = () => {
    return (
        <>
            <div className=" mt-20 container mx-auto">
                {/* overview */}

                <div className="mb-6 ">
                    <Overview1></Overview1>
                </div>

                <div className="flex flex-col">
                <div className="w-full  md:mx-0 relative   ">
                    <p className='text-3xl font-semibold absolute'>Top Selling Products</p>
                    <TopSellingP></TopSellingP>

                </div>

                <div className=" mt-10 md:mx-0 relative w-full">
                <p className='text-2xl font-semibold absolute left- md:left-24'>Revenue From Each Products</p>
                    <div className=" mt-5">
                    <RevenueFromEachProducts></RevenueFromEachProducts>
                    </div>
                </div>
                </div>

            </div>
        </>
    );
};

export default DashBoard;