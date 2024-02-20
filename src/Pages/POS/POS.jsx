import React, { useContext, useEffect, useRef, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import useSearch from '../../hooks/UseSearch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Search from '../../Components/Search';
import Button from '../../Components/Button';
import Button3 from '../../Components/Button3';
import img from '../../assets/istockphoto-147747269-612x612.jpg'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { LuTrash2 } from 'react-icons/lu';
import useGenerator from '../../hooks/useGenerator';
const POS = () => {
    const { user } = useContext(AuthContext)
    const { products, isLoading, error, refetch } = useProducts()
    const { handleKeyUp, newProducts, setNewProducts, noResult,handleKeyUpCode } = useSearch();
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
    // form
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    
    //reference 
    const {reference} = useGenerator()
    useEffect(() => {
        setNewProducts(products)
    }, [products])
    // all category name
    const allCategoryNames = [...new Set(products?.map(product => product.category))];
    // console.log(allCategoryNames)
    // all brand names
    const allBrandNames = [...new Set(products?.map(product => product.brand))];
    // console.log(allBrandNames)

    //filter by category
    const handleFilterByCategory = () => {

        // console.log(selectedCategory, "1")
        if (!selectedCategory) {
            setSelectedCategory(allCategoryNames[1])

        }
        else {
            // Find the index of the currently selected category
            const currentIndex = allCategoryNames.indexOf(selectedCategory);
            // Select the next category in the array, or loop back to the beginning if at the end
            // console.log(currentIndex)
            const newSelectedCategory = allCategoryNames[(currentIndex + 1) % allCategoryNames.length]
            setSelectedCategory(newSelectedCategory)
        }
        if (selectedCategory) {
            const filteredProducts = products?.filter(product => product.category === selectedCategory);
            // console.log(filteredProducts)

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
            // console.log(currentIndex)
            const newSelectedBrand = allBrandNames[(currentIndex + 1) % allBrandNames.length]
            setSelectedBrand(newSelectedBrand)
        }
        if (selectedBrand) {
            const filteredProducts = products?.filter(product => product.brand === selectedBrand);
            // console.log(filteredProducts)

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
        // console.log(sortedProducts);
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
    const onSubmit = (data, e) => {

    }
    const handleDelete =()=>{

    }
     // State for selected products
     const [selectedProducts, setSelectedProducts] = useState([]);

     const handleSelectProduct = (id) => {
         const selectProduct = products.find(product => product._id === id);
         
         if (selectProduct) {
             // Push the selected product into the selectedProducts array
             setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, selectProduct]);
 
             // Return the updated array
             return selectedProducts;
         }
     };
    return (
        <div className='pt-20 container mx-auto '>
            <div className=" flex flex-col xl:flex-row gap-5">
                {/* left */}
                <div className="w-full xl:w-1/2 bg-white p-3">
                    {/* search */}
                    <div className="">
                        <Search handleSelect={handleSelect} handleKeyUp={handleKeyUpCode} searchInputRef={searchInputRef} ></Search>
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
                            (!classNameForCategory && !classNameForBrand && !classNameForSales) && <p className='text-xl font-semibold'>Products: All</p>
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
                            newProducts && newProducts.map(product => <div onClick={()=>handleSelectProduct(product._id)} className="flex h-fit flex-col items-center hover:shadow-lg hover:shadow-red-300">
                                <img className='w-40 h-32' src={product.image} alt="" />
                                <h1 className='text-md text-slate-600 text-center'>{product.name}</h1>
                                <h1 className='text-lg text-slate-600 font-bold '>{product.code}</h1>
                            </div>)
                        }
                    </div>
                </div>
                {/* right */}
                <div className="flex-1 ">
                    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto space-y-3">
                        <div className="flex flex-col lg:flex-row gap-3">
                            {/* reference */}

                            <div className="relative flex-1">
                                <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                                    Reference Number
                                </label>
                                <input
                                    placeholder='Reference Number'
                                    type="text"
                                    id="reference"
                                    value={reference}
                                    {...register('reference', { required: true })}
                                    className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                                />
                            </div>

                            {/* customer */}

                            <div className="relative flex-1">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    placeholder='Product name'
                                    type="text"
                                    id="name"
                                    {...register('name', { required: true })}
                                    className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                                />
                                {errors.name && <p className="text-red-500 absolute insert-0 right-0">Name is required</p>}
                            </div>
                            {/* biller */}
                            <div className="flex-1">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Biller
                                </label>
                                <input
                                    placeholder='Biller name'
                                    type="text"
                                    id="biller"
                                    value={user?.email}
                                    {...register('biller', { required: true })}
                                    className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                                />
                            </div>


                        </div>
                        {/* selected products */}
                        <div className="">
                            <div className="bg-white p-5 bg-opacity-100 relative ">
                                <div className="overflow-x-auto scrollbar h-96" >
                                    <table className="table  table-xs table-pin-rows table-pin-cols">
                                        {/* head */}
                                        <thead>
                                            <tr>

                                                <th className='uppercase'>Product</th>
                                                <th className='uppercase'>Code</th>
                                                <th className='uppercase'>Price</th>
                                                <th className='uppercase'>stock</th>
                                                <th className='uppercase'>Quantity</th>
                                                <th className='uppercase'>Sub Total</th>
                                                <th className='uppercase'>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>


                                            {
                                                selectedProducts?.map(product => <tr className="hover:bg-red-50">
                                                    
                                                    <td className=''>{product.name}</td>
                                                    <td className='font-bold'>{product.code}</td>
                                                    <td className='font-bold'>{product.price}</td>
                                                    <td className={`${product?.stock && parseInt(product.stock) < 20 ? "text-red-400" : "text-green-600"} font-bold`}>{product.stock}</td>
                                                    <td className='font-bold'></td>
                                                    <td className='font-bold'></td>
                                                    <td className={`font-bold`}> < LuTrash2 className='hover:text-red-300' onClick={() => handleDelete(product._id)}></LuTrash2></td>
                                                </tr>)
                                            }



                                        </tbody>

                                    </table>

                                </div>
                            </div>
                        </div>
                    </form>

                </div>


            </div>

        </div>
    );
};

export default POS;