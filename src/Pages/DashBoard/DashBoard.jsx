import React, { useContext, useEffect, useState } from 'react';
import Overview1 from './Overview1';
import TopSellingP from './topSellingP';
import RevenueFromEachProducts from './RevenueFromEachProducts';
import StockAlertTable from './StockAlertTable';
import TransactionsSummary from './TransactionsSummary';

import { NavContext } from '../../Provider/ActiveNavProvider';
import useSales from '../../hooks/useSales';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';


const DashBoard = () => {
    const {user,isLoadingAuth,GoogleLogin,Logout, setIsLoading} = useContext(AuthContext)
    const { nav, setNav } = useContext(NavContext)
    const { sales, isLoading, error,refetch  } = useSales()
const [salesByCashRatio, setSalesByCashRatio] = useState([])
const [salesByCardRatio, setSalesByCardRatio] = useState([])
useEffect(() => {
    const timer = setTimeout(() => {
        refetch(); // Fetch data or perform any initial operations here after 1 second delay
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timer); // Cleanup function to clear the timer if component unmounts or effect re-runs
}, []);

useEffect(() => {
    
    setNav('/');
    
        const salesByCash = sales?.filter(sale => sale.paymentMethod === "CASH");
        const cashRatio = salesByCash ? salesByCash.length / sales.length : 0;

        if (cashRatio) {
            setSalesByCashRatio(cashRatio);
        }

        const salesByCard = sales?.filter(sale => sale.paymentMethod === "CARD");
        const cardRatio = salesByCard ? salesByCard.length / sales.length : 0;

        if (cardRatio) {
            setSalesByCardRatio(cardRatio);
        }

}, [sales]);
    // console.log(salesByCashRatio*100, "salesByCash")
    // console.log(salesByCardRatio*100,"salesByCard")

    return (
        <>
        <Helmet>
        <title>Nimble-POS -Dashboard</title>
      </Helmet>
            <div className=" mt-20 container mx-auto">
                {/* overview */}

                <div className="mb-6 ">
                   <Overview1></Overview1>
                </div>
                {/*  top selling and Revenue From Each Products */}
                <div className="flex flex-col lg:flex-row mt-6 gap-3 w-full">
                    <div className="  md:mx-0 relative w-full lg:w-2/5 bg-red-100 p-5 bg-opacity-40">
                        <p className='text-2xl lg:text-3xl font-semibold absolute'>Top Selling Products</p>
                     <TopSellingP classN={"w-full"}></TopSellingP>

                    </div>
                    <div className=" md:mx-0 relative flex-1  bg-red-100 p-5 bg-opacity-40">
                        <p className='text-2xl lg:text-3xl font-semibold  left- md:left-24'>Revenue Rockstars</p>
                        <div className="overflow-auto ">
                <RevenueFromEachProducts></RevenueFromEachProducts>
                        </div>
                    </div>

                </div>
                {/*  top selling and Revenue From Each Products END*/}

                {/* stock alert and transaction summary */}
                <div className=" flex flex-col lg:flex-row mt-5 gap-3 w-full">
                    <div className="w-full lg:w-1/2 bg-red-100 p-5 bg-opacity-40">
                        <p className=' text-2xl lg:text-3xl font-semibold '>Stock Alert</p>
                        <StockAlertTable></StockAlertTable>

                    </div>
                    <div className="flex-1 bg-red-100  bg-opacity-40 p-5">
                        <p className=' text-2xl lg:text-3xl font-semibold'>Transactions Summary </p>
                        <div className="flex flex-col md:flex-row   items-center  justify-center">
                            <div className="">

                                <TransactionsSummary name={"Cash"} value={(salesByCashRatio*100).toFixed(2)}></TransactionsSummary>
                            </div>
                            <div className="">
                                <TransactionsSummary name={"Card"} value={(salesByCardRatio*100).toFixed(2)}></TransactionsSummary>
                            </div>
                        </div>
                    </div>
                </div>
                {/* stock alert and transaction summary END */}

                {/* Recent sales */}



            </div>
        </>
    );
};

export default DashBoard;