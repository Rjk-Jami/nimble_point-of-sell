import React, { useEffect, useRef, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import useSearch from '../../hooks/UseSearch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Search from '../../Components/Search';
import Button from '../../Components/Button';
import Button3 from '../../Components/Button3';
import img from '../../assets/istockphoto-147747269-612x612.jpg'
const POS = () => {
    const { products, isLoading, error, refetch } = useProducts()
    const { handleKeyUp, newProducts, setNewProducts, noResult } = useSearch();
    const searchInputRef = useRef(null)
    const [axiosSecure] = useAxiosSecure()
    //category state
    const [selectedCategory, setSelectedCategory] = useState(null)
    //brand state
    const [selectedBrand, setSelectedBrand] = useState(null)

    // for dynamic class
    const [classNameForCategory, setHandleFilterByCategory] = useState(null)
    const [classNameForBrand, setHandleFilterByBrand] = useState(null)
    const [classNameForSales, setHandleFilterBySales] = useState(null)

    useEffect(() => {
        setNewProducts(products)
    }, [products])
    // all category name
    const allCategoryNames = [...new Set(products?.map(product => product.category))];
    console.log(allCategoryNames)
    // all brand names
    const allBrandNames = [...new Set(products?.map(product => product.brand))];
    console.log(allBrandNames)

    //filter by category
    const handleFilterByCategory = () => {

        console.log(selectedCategory, "1")
        if (!selectedCategory) {
            setSelectedCategory(allCategoryNames[1])

        }
        else {
            // Find the index of the currently selected category
            const currentIndex = allCategoryNames.indexOf(selectedCategory);
            // Select the next category in the array, or loop back to the beginning if at the end
            console.log(currentIndex)
            const newSelectedCategory = allCategoryNames[(currentIndex + 1) % allCategoryNames.length]
            setSelectedCategory(newSelectedCategory)
        }
        if (selectedCategory) {
            const filteredProducts = products?.filter(product => product.category === selectedCategory);
            console.log(filteredProducts)

            setNewProducts(filteredProducts)
        }
        // category filter dynamic class
        setHandleFilterByCategory('bg-red-400 text-white')
        setHandleFilterBySales(null)
        setHandleFilterByBrand(null)
    }


    //filter by brand name
    const handleFilterByBrand = () => {
        if (!selectedBrand) {
            setSelectedBrand(allBrandNames[1])

        }
        else {
            // Find the index of the currently selected category
            const currentIndex = allBrandNames.indexOf(selectedBrand);
            // Select the next category in the array, or loop back to the beginning if at the end
            console.log(currentIndex)
            const newSelectedBrand = allBrandNames[(currentIndex + 1) % allBrandNames.length]
            setSelectedBrand(newSelectedBrand)
        }
        if (selectedBrand) {
            const filteredProducts = products?.filter(product => product.brand === selectedBrand);
            console.log(filteredProducts)

            setNewProducts(filteredProducts)
        }

        // brand filter dynamic class
        setHandleFilterByCategory(null)
        setHandleFilterByBrand('bg-red-400 text-white')
        setHandleFilterBySales(null)
    }
    // filter by top sales
    const handleFilterBySales = () => {
        const sortedProducts = products.slice().sort((a, b) => b.sales - a.sales);
        console.log(sortedProducts);
        setNewProducts(sortedProducts)
        // sales filter dynamic class
        setHandleFilterByCategory(null)
        setHandleFilterByBrand(null)
        setHandleFilterBySales('bg-red-400 text-white')

    }
    // when  select search all filters dynamic class removed
    const handleSelect = () => {

        setNewProducts(products)
        setHandleFilterByCategory(null)
        setHandleFilterByBrand(null)
        setHandleFilterBySales(null)
    }
    return (
        <div className='pt-20 container mx-auto '>
            <div className=" flex flex-col xl:flex-row">
                {/* right */}
                <div className="w-full xl:w-1/2 bg-white p-3">
                    {/* search */}
                    <div className="">
                        <Search handleSelect={handleSelect} handleKeyUp={handleKeyUp} searchInputRef={searchInputRef} ></Search>
                    </div>
                    {/* filter */}
                    <div className="flex justify-items-center gap-3">
                        <div className="w-full">
                            <Button3 handleFunction={handleFilterByCategory} className={` mt-3 w-full text-center ${classNameForCategory} `}> <span className="relative group-hover:text-white font-semibold ">Category</span></Button3>
                        </div>
                        <div className="w-full">
                            <Button3 handleFunction={handleFilterByBrand} className={` ${classNameForBrand} mt-3 w-full text-center`}> <span className="relative group-hover:text-white font-semibold">Brand</span></Button3>
                        </div>
                        <div className="w-full ">
                            <Button3 handleFunction={handleFilterBySales} className={` ${classNameForSales} mt-3 w-full text-center `}> <span className="relative group-hover:text-white font-semibold">Sales</span></Button3>
                        </div>
                    </div>
                    <div className=" p-2 bg-rose-50 bg-opacity-70 rounded-t-lg">
                        {
                            (!classNameForCategory && !classNameForBrand && !classNameForSales) &&   <p className='text-xl font-semibold'>Products: All</p>
                        }
                        {
                            (classNameForCategory) && 
                            <p className='text-xl font-semibold'>Products: {selectedCategory}</p>
                        }
                        {
                            (classNameForBrand) && 
                            <p className='text-xl font-semibold'>Products: {selectedBrand}</p>
                        }
                        {
                            (classNameForSales) && 
                            <p className='text-xl font-semibold'>Products: Top Sales</p>
                        }
                       
                    </div>
                    {/* products */}
                    <div className="flex flex-wrap gap-5 justify-center overflow-auto scrollbar  h-96 xl:h-[600px]">
                        {
                            newProducts && newProducts.map(product => <div className="flex flex-col items-center hover:shadow-lg hover:shadow-red-300">
                                <img className='w-40 h-32' src={product.image} alt="" />
                                <h1 className='text-md text-slate-600 text-center'>{product.name}</h1>
                                <h1 className='text-lg text-slate-600 font-bold '>{product.code}</h1>
                            </div>)
                        }
                    </div>
                </div>
                {/* left */}
                <div className="flex-1">


                </div>


            </div>

        </div>
    );
};

export default POS;