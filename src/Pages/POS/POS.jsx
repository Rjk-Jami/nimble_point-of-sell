import React, { useContext, useEffect, useRef, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import useSearch from '../../hooks/UseSearch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Search from '../../Components/Search';
import Button3 from '../../Components/Button3';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { LuTrash2 } from 'react-icons/lu';
import useGenerator from '../../hooks/useGenerator';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { GlobalVariableContext } from '../../Provider/GlobalVariableProvider';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
const POS = () => {
    const { user } = useContext(AuthContext)
    const { products, isLoading, error, refetch } = useProducts()
    const { handleKeyUp, newProducts, setNewProducts, noResult, handleKeyUpCode,inputLoad } = useSearch();
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
    const [classNameForCash, setClassNameForCash] = useState('bg-red-400 text-white')
    const [classNameForCard, setClassNameForCard] = useState(null)
    // form
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    // State for selected products
    const [selectedProducts, setSelectedProducts] = useState([]);
    //reference 
    const [updateTrigger, setUpdateTrigger] = useState(false); // State variable for triggering updates

    const { reference } = useGenerator(updateTrigger)

    //Payment Method
    const [paymentMethod, setPaymentMethod] = useState('CASH')
    const [checkCheckout, setCheckCheckout] = useState(false)

    useEffect(() => {
        if (selectedProducts.length > 0) {
            setCheckCheckout(true)
        }
        else {
            setCheckCheckout(false)
        }
    }, [selectedProducts])

    useEffect(() => {
        setNewProducts(products)
    }, [products,inputLoad])
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


    // select product for purchase
    const handleSelectProduct = (id) => {
        if (selectedProducts) {

            const exitsProduct = selectedProducts.find(product => product._id === id)

            if (exitsProduct) {
                return
            }
        }
        const selectProduct = products?.find(product => product._id === id);
        if (selectProduct) {
            selectProduct.quantity = 1
            // Push the selected product into the selectedProducts array
            setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, selectProduct]);

            // Return the updated array
            return selectedProducts;
        }
    };


    // delete selected Product
    const handleDelete = (id) => {
        //  console.log(id)
        if (selectedProducts) {
            const updatedSelectedProducts = selectedProducts.filter(product => product._id !== id);
            setSelectedProducts(updatedSelectedProducts)
        }

    }
    //quantity minus
    const handleQuantityMin = (id) => {
        setSelectedProducts(prevSelectedProducts => {
            return prevSelectedProducts.map(product => {
                if (product._id === id) {
                    const newQuantity = Math.max(product.quantity - 1, 1)
                    return { ...product, quantity: newQuantity }
                }
                return product
            })
        })


    }
    //quantity plus
    const handleQuantityPlus = (id) => {
        setSelectedProducts(prevSelectedProducts => {
            return prevSelectedProducts.map(product => {
                if (product._id === id) {
                    const newQuantity = product.quantity + 1
                    return { ...product, quantity: newQuantity }
                }
                return product
            })
        })
    }
    // Initialize total cost
    let totalCost = 0;
    if (selectedProducts) {
        selectedProducts.map(product => {
            const updateTotalCost = product.quantity * product.price
            totalCost += updateTotalCost
        })
    }
    // console.log(totalCost)
    // console.log(selectedProducts)
    let totalItem = 0;
    if (selectedProducts) {
        selectedProducts.map(product => {
            const updateTotalItem = product.quantity
            totalItem += updateTotalItem
        })
    }
    const [discount, setDiscount] = useState(5)
    const handleKeyUpForDiscount = (event) => {
        if (event?.target?.value) {
            const newDiscount = parseInt(event.target.value)
            setDiscount(newDiscount)

        }
    }


    const coupons = [
        'RSK24', 'RJK24'
    ]
    const [coupon, setCoupon] = useState(null)
    const handleKeyUpForCoupon = (event) => {

        if (event?.target?.value) {
            const couponInput = event.target.value
            console.log(couponInput)
            if (coupons.find(coupon => coupon === couponInput)) {
                setDiscount(20)
                setCoupon(couponInput)
            }
            else {
                setCoupon(null)
                setDiscount(5)
            }
        }


    }
    //grand Total
    const grandTotal = totalCost - (totalCost * discount / 100).toFixed(2)
    // pay cash
    const handlePayWithCash = () => {
        setPaymentMethod('CASH')
        setClassNameForCash('bg-red-400 text-white')
        setClassNameForCard(null)

    }
    //pay card
    const handlePayWithCard = () => {
        setPaymentMethod('CARD')
        setClassNameForCash(null)
        setClassNameForCard('bg-red-400 text-white')
    }

    // console.log(discount)

    // checkout
    const onSubmit = (data, e) => {
        // console.log(data)

        if (selectedProducts?.length > 0) {
            axiosSecure.post('/sales', {
                reference: reference,
                customer: data?.name,
                biller: user?.email,
                products: selectedProducts.map(product =>({
                    id: product._id,
                    quantity: product.quantity
                })),
                totalPrice: totalCost,
                discount: discount,
                coupon: coupon && coupon,
                revenue: grandTotal,
                paymentMethod:paymentMethod,
                saleDate: moment().format('L')
            })
                .then(data => {
                    // console.log(data.data.insertedId)
                    if (data?.data.insertedId) {
                        toast.success('Sale Done')
                        const updateProducts = products?.filter(product => {
                            return selectedProducts.some(selected => selected._id === product._id)
                        }).map(product => {
                            const selectedProduct = selectedProducts?.find(selected => selected._id === product._id)
                            if (selectedProduct) {
                                // console.log(selectedProduct, "jami")
                                const newSale = product.sales + selectedProduct.quantity
                                const newStock = product.stock - selectedProduct.quantity
                                return { ...product, sales: newSale, stock: newStock }
                            }
                            return (product)
                        })

                        // console.log(updateProducts)
                        if(updateProducts){
                            updateProducts.map(product=>{
                                const { _id, ...forUpdate } = product;
                                axiosSecure.patch(`/updateProductsAfterSale/${_id}`, forUpdate)
                        .then(res=>{
                            // console.log(res.data)
                            if(res.data.modifiedCount){
                                refetch()
                                reset()
                                setUpdateTrigger(!updateTrigger)
                            }
                        })
                            })
                        }
                        
                        setSelectedProducts([])
                    }
                })
        }
    }
    // update the real product in db



    return (
        <div className='pt-20 container mx-auto '>
            <Helmet>
        <title>Nimble-POS</title>
      </Helmet>
            <div className=" flex flex-col xl:flex-row gap-5">
                {/* left */}
                <div className="w-full xl:w-1/2 bg-white p-3">
                    {/* search */}
                    <div className="">
                        <Search  placeholder={"Search With Name" } handleSelect={handleSelect} handleKeyUp={handleKeyUp} searchInputRef={searchInputRef} ></Search>
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
                    <div className=" p-2 bg-red-400 bg-opacity-90 text-white rounded-t-lg">
                        <p className='text-xl font-bold text-center '>Products</p>

                    </div>
                    {/* products */}
                    <div className="flex flex-wrap gap-5 justify-center overflow-auto scrollbar  h-96 xl:h-[600px]">
                        {
                            newProducts && newProducts.map((product, i) => <div key={i} onClick={() => handleSelectProduct(product._id)} className="flex h-fit flex-col items-center hover:shadow-lg hover:shadow-red-300">
                                <img className='w-40 h-32' src={product.image} alt="" />
                                <h1 className='text-md text-slate-600 text-center'>{product.name}</h1>
                                <h1 className='text-lg text-slate-600 font-bold '>{product.code}</h1>
                            </div>)
                        }
                    </div>
                </div>
                {/* right */}
                <div className="flex-1 ">
                    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto space-y-3 flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-3">
                            {/* reference */}

                            <div className="relative flex-1">
                                <label htmlFor="reference" className="block text-md font-medium text-gray-700">
                                    Reference Number
                                </label>
                                <input
                                    placeholder='Reference Number'
                                    type="text"
                                    id="reference"
                                    defaultValue={reference && reference}
                                    {...register('reference')}
                                    className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                                />
                            </div>

                            {/* customer */}

                            <div className="relative flex-1">
                                <label htmlFor="name" className="block text-md font-medium text-gray-700">
                                    Customer
                                </label>
                                <input
                                    placeholder='Customer'
                                    type="text"
                                    id="name"
                                    defaultValue={"walk-in-customer"}
                                    {...register('name', { required: true })}
                                    className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                                />
                                {errors.name && <p className="text-red-500 absolute insert-0 right-0">Name is required</p>}
                            </div>
                            {/* biller */}
                            <div className="flex-1">
                                <label htmlFor="name" className="block text-md font-medium text-gray-700">
                                    Biller
                                </label>
                                <input
                                    placeholder='Biller name'
                                    type="text"
                                    id="biller"
                                    defaultValue={user?.email}
                                    {...register('biller',)}
                                    className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                                />
                            </div>


                        </div>
                        {/* selected products */}
                        <div className="">
                            <div className="bg-white p-5 bg-opacity-100 relative ">
                                <div className="overflow-x-auto scrollbar h-96" >
                                    <table className="table  table-md table-pin-rows table-pin-cols">
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
                                                selectedProducts?.map((product, i) => <tr key={i} className="hover:bg-red-50">

                                                    <td className=''>{product.name}</td>
                                                    <td className='font-bold'>{product.code}</td>
                                                    <td className='font-bold'>{product.price}</td>
                                                    <td className={`${product?.stock && parseInt(product.stock) < 20 ? "text-red-400" : "text-green-600"} font-bold`}>{product.stock}</td>
                                                    <td className='font-bold flex items-center justify-center gap-0'>
                                                        <div onClick={() => handleQuantityMin(product._id)} className="bg-red-100 p-1 hover:bg-red-300 hover:text-white"><FaMinus />
                                                        </div>
                                                        <div className="">
                                                            <input className='input-xs w-12 text-center ' type="text" value={product.quantity} readOnly />
                                                        </div>
                                                        <div onClick={() => handleQuantityPlus(product._id)} className="bg-red-100 p-1 hover:bg-red-300 hover:text-white"><FaPlus className='' />
                                                        </div>
                                                    </td>
                                                    <td className='font-bold'>{(product.price * product.quantity).toFixed(2)}</td>
                                                    <td className={`font-bold`}> < LuTrash2 className=' text-xl hover:text-red-300' onClick={() => handleDelete(product._id)}></LuTrash2></td>
                                                </tr>)
                                            }



                                        </tbody>

                                    </table>

                                </div>
                            </div>
                        </div>


                        <div className="grid grid-cols-2 md:grid-cols-2 items-center justify-items-center text-md ">
                            <div className="flex gap-1 w-full ">
                                <p>Total Item: </p>
                                <p className='font-bold'>{totalItem}</p>
                            </div>
                            <div className="flex gap-1 w-full">
                                <p>Total Cost: </p>
                                <p className='font-bold'>{totalCost.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-1 w-full ">
                                <p>Discount: </p>
                                <input className=' px-2 w-full md:w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300' value={discount && discount} onChange={handleKeyUpForDiscount} type="number" />
                            </div>
                            <div className="flex gap-1 w-full ">
                                <p>Coupon: </p>
                                <input className='px-2 w-full md:w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300' placeholder='Coupon Code' onChange={handleKeyUpForCoupon} type="text" />
                            </div>
                        </div>
                        <div className="p-2 bg-red-400 bg-opacity-90 text-white font-bold text-2xl rounded-b-lg text-center">
                            <p>Grand Total : {grandTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-items-center gap-3">
                            {/* cash */}
                            <div className="w-full">
                                <div onClick={handlePayWithCash} className={`${classNameForCash ? classNameForCash : "bg-transparent"}  w-full relative inline-flex items-center justify-center px-5 py-2.5  overflow-hidden  font-medium tracking-tighter   group rounded-xl  border-2 group-hover:border-0 border-red-300 `}>
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-400 rounded-lg group-hover:w-full group-hover:h-full"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-white"></span>
                                    <span className="relative text-xl transition-colors duration-200 ease-in-out group-hover:text-white">CASH</span>
                                </div>
                            </div>
                            {/* card */}
                            <div className="w-full ">
                                <div onClick={handlePayWithCard} className={`${classNameForCard ? classNameForCard : "bg-transparent"} w-full relative inline-flex items-center justify-center px-5 py-2.5  overflow-hidden  font-medium tracking-tighter    group rounded-xl  border-2 group-hover:border-0 border-red-300 `}>
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-400 rounded-lg group-hover:w-full group-hover:h-full"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-white"></span>
                                    <span className="relative text-xl  transition-colors duration-200 ease-in-out group-hover:text-white">CARD</span>
                                </div>
                            </div>

                        </div>
                        <div className="w-full">

                            <button type='submit' className={`${checkCheckout ? ' ' : ""}  w-full relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-400 ease-out border-2 border-red-400 rounded-lg shadow-md group`}>
                                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-400 opacity-90 group-hover:translate-x-0 ease">
                                    {
                                        checkCheckout ? <><span className='pr-2'>Checkout</span><span className="loading loading-dots loading-md"></span></> :
                                            <><span className='pr-2'>Please Select Product</span></>
                                    }
                                </span>
                                <span className="absolute flex items-center justify-center w-full h-full text-red-400 transition-all duration-300 transform group-hover:translate-x-full ease disabled">Checkout</span>
                                <span className="relative invisible">Checkout</span>
                            </button>
                        </div>

                    </form>

                </div>


            </div>

        </div>
    );
};

export default POS;