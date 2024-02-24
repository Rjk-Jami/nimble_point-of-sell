import React, { useContext, useEffect, useState } from 'react';
import { NavContext } from '../../Provider/ActiveNavProvider';
import { useForm } from "react-hook-form"
import Button from '../../Components/Button';
import Button2 from '../../Components/Button2';
import useGenerator from '../../hooks/useGenerator';
import AsyncSelect from "react-select/async";
import ImageUpload from '../../Components/ImageUpload';
import { GlobalVariableContext } from '../../Provider/GlobalVariableProvider';
import moment from 'moment';
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink, Navigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CreateProduct = () => {
    const [updateTrigger, setUpdateTrigger] = useState(false); // State variable for triggering updates

    const { productCode } = useGenerator(updateTrigger)
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState(false);
    const { imageUrl, setImageUrl } = useContext(GlobalVariableContext)
    const { nav, setNav } = useContext(NavContext)
    const [axiosSecure] = useAxiosSecure()
    useEffect(() => {
        setNav('/products')
        setImageUrl('')
    }, [])
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    // console.log(imageUrl, "imageUrl")


    // category start select
    const categoryOptions = [
        { value: "monitor", label: "monitor" },
        { value: "camera", label: "camera" },
        { value: "smartWatch", label: "smartWatch" },
        { value: "headphones", label: "headphones" },
        { value: "keyboard", label: "keyboard" },
        { value: "microphone", label: "microphone" },
        { value: "mouse", label: "mouse" },
        { value: "speaker", label: "speaker" },
        { value: "laptop", label: "laptop" },
    ];
    // category start select 2
    const filterColors = (inputValue) => {
        return categoryOptions.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase()),
        );
    };
    // category start select 3
    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterColors(inputValue));
        }, 200);
    };
    // category start select 4
    const handleChange = (option) => {
        setSelectedOption(option);
    };
    // category start select 5
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#fff' : provided.borderColor,
        }),
    };

    const onSubmit = (data, e) => {
        const price = parseInt(data.price);
        data.cost = price
        let newPrice = price + (price * 0.15)
        data.price = newPrice
        const stock = parseInt(data.stock);
        data.stock = stock
        data.create = moment().format('L')
        data.category = selectedOption

        if (imageUrl !== " ") {
            data.image = imageUrl
            setError(false)

        }
        if (!data.image) {
            setError(true)
            // console.log(error)
        }

        // console.log(data)

        let createProduct = {
            name: data.name,
            image: data.image,
            code: data.code,
            category: data.category.value,
            brand: data.brand,
            cost: data.cost,
            price: data.price,
            stock: data.stock,
            createDate: data.create,
            sales: 0
        }
        // console.log(createProduct)
        if (createProduct.image === " ") {
            e.preventDefault()
            setError(true)
        }
        if (createProduct?.image !== undefined) {
            axiosSecure.post('/createProduct', createProduct)
                .then(res => {
                    // console.log(res)
                    setError(false)
                    reset()
                    setImageUrl('')
                    setUpdateTrigger(!updateTrigger)

                    // need to add swift
                })
        }


    }




    return (
        <div className='mt-20 container mx-auto  '>

            <div className=" flex items-center  mb-6 gap-2">
                <div className="relative">
                    <NavLink to={'/products'}><FaArrowLeft className='text-3xl pt-1 text-red-400 hover:text-red-300 '></FaArrowLeft></NavLink>
                </div>
                <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold '>Create Products</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto space-y-3">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className=" w-11/12 mx-auto lg:mx-0 lg:w-2/3 grid grid-cols-1  gap-3">
                        {/* name */}

                        <div className="relative">
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
                        {/* code */}
                        <div className="relative">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Code
                            </label>
                            <input
                                placeholder='Product code'
                                type="text"
                                id="code"
                                value={productCode}
                                {...register('code', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />

                        </div>
                        {/* category */}
                        <div className="relative">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <div className='mt-1'>
                                <AsyncSelect
                                    style={customStyles}
                                    cacheOptions
                                    loadOptions={loadOptions}
                                    defaultOptions
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        {/* brand */}
                        <div className="relative">
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                Brand
                            </label>
                            <input
                                placeholder='Product brand'
                                type="text"
                                id="brand"
                                {...register('brand', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.brand && <p className="text-red-500 absolute insert-0 right-0">Brand is required</p>}
                        </div>
                        {/* price */}
                        <div className="relative">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                placeholder='Product price'
                                type="text"
                                id="price"
                                {...register('price', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.price && <p className="text-red-500 absolute insert-0 right-0">Price is required</p>}
                        </div>
                        {/* STOCK */}
                        <div className="relative">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                Stock
                            </label>
                            <input
                                placeholder='Product stock'
                                type="text"
                                id="stock"
                                {...register('stock', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.stock && <p className="text-red-500 absolute insert-0 right-0">Stock is required</p>}
                        </div>

                    </div>
                    <div className="mx-auto">
                        <div className="block text-sm font-medium text-gray-700S">
                            <p>Add Image</p>
                        </div>
                        <div className="mt-1">
                            <ImageUpload></ImageUpload>
                            {error && <p className="text-red-500   bottom-0 left-0">image is required</p>}
                        </div>

                    </div>

                    
                </div>


                {/* button */}
                <div className="text-center lg:text-left ">
                    <Button2 type="submit" className={'bg-red-50 mt-3 lg:w-1/5'}>
                        <span className="relative group-hover:text-white font-semibold">Submit</span>
                    </Button2>
                </div>

            </form>
        </div>
    );
};

export default CreateProduct;