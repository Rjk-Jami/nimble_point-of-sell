import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import ImageUpload from '../../Components/ImageUpload';
import { FaArrowLeft } from 'react-icons/fa';
import AsyncSelect from "react-select/async";
import moment from 'moment';

import Button2 from '../../Components/Button2';
import { useForm } from 'react-hook-form';
import { GlobalVariableContext } from '../../Provider/GlobalVariableProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const UpdateProduct = () => {
    const { products, isLoading, refetch } = useProducts()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { imageUrl, setImageUrl } = useContext(GlobalVariableContext)
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState(false);
    const [axiosSecure] = useAxiosSecure()

    // console.log(imageUrl)
    //get id from product
    let { id } = useParams();
    // console.log(id, 'update')
    //find by id 
    const product = products?.find((product) => product._id === id)

    // category start select
    const categoryOptions = [
        { value: "smartWatch", label: "smartWatch" },
        { value: "headphones", label: "headphones" },
        { value: "keyboard", label: "keyboard" },
        { value: "monitor", label: "monitor" },
        { value: "camera", label: "camera" },
        { value: "microphone", label: "microphone" },
        { value: "mouse", label: "mouse" },
        { value: "speaker", label: "speaker" },
        { value: "laptop", label: "laptop" },
    ];
    const index = product && categoryOptions.findIndex(option => option.value === product?.category)
    // console.log(index)


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
    //handle submit
    const onSubmit = (data, e) => {
        // console.log("Selected option:", selectedOption);
        // console.log("Product category:", product?.category);
        // Parsing price and stock to integers
        const price = parseInt(data.price);
        const stock = parseInt(data.stock);

        // Calculating new price with 15% markup
        const newPrice = price + (price * 0.15);

        // Setting properties in data object
        data.cost = price;
        data.price = newPrice;
        data.stock = stock;
        data.createDate = moment().format('L');

        // Setting category based on conditions
        data.category = selectedOption ? selectedOption.value : (product && product.category);
        // console.log(product?.category);

        // Setting image based on conditions
        data.image = imageUrl !== " " ? imageUrl : (product && product.image);

        // Creating updateProduct object
       



        axiosSecure.patch(`/updateProduct/${product?._id}`, {
            name: data.name,
            image: data.image,
            code: data.code,
            category: data.category, // Assuming category is an object with a 'value' property
            brand: data.brand,
            cost: data.cost,
            price: data.price,
            stock: data.stock,
            createDate: data.createDate // Correcting property name
        })
        .then(data=>{
            // console.log(data.data)
            if(data.data.modifiedCount){
                refetch()
                toast.success('Updated!')
                navigate('/products')
            }
        })

    };



    return (
        <div className='mt-20 container mx-auto  '>
<Helmet>
        <title>Nimble-POS -Product-Update</title>
      </Helmet>
            <div className=" flex items-center  mb-6 gap-2">
                <div className="relative">
                    <NavLink to={'/products'}><FaArrowLeft className='text-3xl pt-1 text-red-400 hover:text-red-300 '></FaArrowLeft>
                    </NavLink>
                </div>
                <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold '>Update Products</h1>
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
                                defaultValue={product?.name}
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
                                defaultValue={product?.code}
                                {...register('code', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />

                        </div>
                        {/* category */}
                        {product &&
                            <div className="relative">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <div className='mt-1'>
                                    <AsyncSelect
                                        defaultValue={categoryOptions[index]}
                                        style={customStyles}
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                        }
                        {/* brand */}
                        <div className="relative">
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                Brand
                            </label>
                            <input
                                defaultValue={product?.brand}
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
                                defaultValue={product?.price}
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
                                defaultValue={product?.stock}
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
                        <div className="flex items-center justify-center text-sm font-medium text-gray-700">
                            <div className="">
                                <p className='text-2xl text-center my-2'>Image</p>
                                <img className='w-52 ' src={product?.image} alt="" />
                            </div>

                        </div>
                        <div className="">
                            <p className='text-2xl text-center my-2'>Add New Image</p>
                            <div className="mt-1">
                                <ImageUpload ></ImageUpload>
                                {error && <p className="text-red-500   bottom-0 left-0">image is required</p>}
                            </div>
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

export default UpdateProduct;