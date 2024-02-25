import React from 'react';
import useSales from '../../hooks/useSales';
import useSearch from '../../hooks/UseSearch';
import { Helmet } from 'react-helmet-async';

const Reports = () => {
   

    return (
        <div className='pt-20 container mx-auto '>
            <Helmet>
        <title>Nimble-POS -Reports</title>
      </Helmet>
            <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold'>System Reports</h1>
            <div className="h-52 bg-white mt-10 flex items-center justify-center">
            <h1 className=' px-7 lg:px-0 text-2xl font-bold animate-pulse'>Unfortunately, there is no available report at the moment!</h1>
            </div>
        </div>
    );
};

export default Reports;