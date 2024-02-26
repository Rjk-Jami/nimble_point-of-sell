import React, { useEffect, useState } from 'react';
import productImg from "../../assets/products.png"
import orderImg from "../../assets/checklist.png"
import revenueImg from "../../assets/revenue.png"
import expenseImg from "../../assets/spending.png"
import useSales from '../../hooks/useSales';
import useProducts from '../../hooks/useProducts';
const Overview1 = () => {
    const { sales } = useSales()
    const { products } = useProducts()
    const [totalExpense, setTotalExpense] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)
    useEffect(() => {
        let totalSales = 0;
        sales?.forEach(product => {
            const total = product.revenue
            totalSales += total;
        });
        setTotalSales(totalSales);
    }, [sales]);
    useEffect(() => {
        let totalProduct = 0;
        products?.map(product => {
            const total = product.stock
            totalProduct += total;
        });
        setTotalProduct(totalProduct);
    }, [products]);

    useEffect(() => {
        let totalExpense = 0;
        products?.map(product => {
            const total = product.price * (product.sales + product.stock);
            totalExpense += total;
        });
        setTotalExpense(totalExpense);
    }, [products]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 ">

            <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                <img className='w-20' src={productImg} alt="" />
                <div className="text-right">
                    <p className='text-xl font-semibold'>Total Products</p>
                    <p className='text-4xl font-bold'>{totalProduct.toFixed()}</p>
                </div>
            </div>
            <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                <img className='w-20' src={orderImg} alt="" />
                <div className="text-right">
                    <p className='text-xl font-semibold'>Total <span>S</span>ales</p>
                    <p className='text-4xl font-bold'>{sales?.length}</p>
                </div>
            </div>
            <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                <img className='w-20' src={revenueImg} alt="" />
                <div className="text-right">
                    <p className='text-xl font-semibold'>Total Revenue</p>
                    <p className='text-4xl font-bold'>${totalSales.toFixed()}</p>
                </div>
            </div>
            <div className="  bg-gradient-to-r from-red-200 to-gray-100 rounded-xl p-6 flex justify-between items-center">
                <img className='w-20' src={expenseImg} alt="" />
                <div className="text-right">
                    <p className='text-xl font-semibold'>Total Expenses</p>
                    <p className='text-4xl font-bold'>${totalExpense.toFixed()}</p>
                </div>
            </div>

        </div>
    );
};

export default Overview1;