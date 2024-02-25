import React from 'react';
import { useForm } from 'react-hook-form';
import Button2 from '../../Components/Button2';
import useUsers from '../../hooks/useUsers';
import { use } from 'echarts';
import { Helmet } from 'react-helmet-async';

const Settings = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
   const  {users, isLoadingUsers, error,refetch } =useUsers()
    
    const onSubmit = (data, e) => {
        
        // console.log(data)
      
        

        
        // console.log(createProduct)
        
        
        }
        const onSubmitStripe = (data,e)=>{
            // console.log(data)
        }
    let    newSales = false

    
    return (
        <div className='pt-20 container mx-auto '>
            <Helmet>
        <title>Nimble-POS -Settings</title>
      </Helmet>
            <h1 className=' px-7 lg:px-0 text-2xl lg:text-3xl font-bold'>System Settings</h1>
            <div className="mt-20 px-5 lg:px-5 xl:px-0">

                <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto space-y-3">

                    <div className=" w-full mx-auto lg:mx-0 lg:w-2/3 grid grid-cols-1 md:grid-cols-2  gap-3">
                        {/*Brand name */}

                        <div className="relative">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Brand Name
                            </label>
                            <input
                                value={'Nimble'}
                                placeholder='Brand Name'
                                type="text"
                                id="name"
                                {...register('name', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.name && <p className="text-red-500 absolute insert-0 right-0">Name is required</p>}
                        </div>

                        {/* Logo */}
                        <div className="relative">
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                                Company Logo 
                            </label>
                            <input
                            
                                placeholder=' Company Logo Link'
                                type="file"
                                id="logo"
                                {...register('logo', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.logo && <p className="text-red-500 absolute insert-0 right-0">logo is required</p>}
                        </div>


                        {/* Telephone */}
                        <div className="relative">
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                Telephone
                            </label>
                            <input
                            defaultValue={'01786076080'}
                                placeholder='Telephone'
                                type="text"
                                id="telephone"
                                {...register('telephone', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.telephone && <p className="text-red-500 absolute insert-0 right-0">Telephone is required</p>}
                        </div>
                        {/* Address */}
                        <div className="relative">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <input
                            defaultValue={'Dhaka, Bangladesh'}
                                placeholder='Location'
                                type="text"
                                id="address"
                                {...register('address', { required: true })}
                                className=" mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.address && <p className="text-red-500 absolute insert-0 right-0">Address is required</p>}
                        </div>


                    </div>

                    {/* button */}
                    <div className="text-left ">
                        <Button2 type="submit" className={'bg-red-50 mt-3 lg:w-1/5'}>
                            <span className="relative group-hover:text-white font-semibold">Save Changes</span>
                        </Button2>
                    </div>

                </form>
            </div>
            {/* stripe */}
            <div className="mt-20 px-5 lg:px-5 xl:px-0">
            <h1 className=' my-3 lg:px-0 text-2xl lg:text-2xl font-bold'>Payment Gateway</h1>

                <form onSubmit={handleSubmit(onSubmitStripe)} className=" mx-auto space-y-3">

                    <div className=" w-full mx-auto lg:mx-0 lg:w-2/3 grid grid-cols-1 md:grid-cols-2  gap-3">
                        {/*Stripe Key */}

                        <div className="relative">
                            <label htmlFor="key" className="block text-sm font-medium text-gray-700">
                                Stripe Key
                            </label>
                            <input
                               
                                placeholder='***********************************'
                                type="text"
                                id="key"
                                {...register('key', { required: true })}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            {errors.key && <p className="text-red-500 absolute insert-0 right-0">Key is required</p>}
                        </div>

                        

                        {/* Stripe Secret */}
                        <div className="relative">
                            <label htmlFor="secret" className="block text-sm font-medium text-gray-700">
                            Stripe Secret
                            </label>
                            <input
                            
                                placeholder='Please leave this field if you haven’t changed it'
                                type="text"
                                id="secret"
                                {...register('secret', )}
                                className="mt-1 px-3 py-1.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-300 focus:border-red-300"
                            />
                            
                        </div>
                        

                    </div>

                    {/* button */}
                    <div className="text-left ">
                        <Button2 type="submit" className={'bg-red-50 mt-3 lg:w-1/5'}>
                            <span className="relative group-hover:text-white font-semibold">Save Changes</span>
                        </Button2>
                    </div>

                </form>
            </div>
            <div className="mt-20 px-5 lg:px-5 xl:px-0">
            <h1 className=' my-3 lg:px-0 text-2xl lg:text-2xl font-bold'>Manage User</h1>
            <div className="bg-white p-5 bg-opacity-100 relative  w-full lg:w-2/3">
                    <div className="overflow-x-auto scrollbar" >
                        <table className="table  table-md table-pin-rows table-pin-cols">
                            {/* head */}
                            <thead>
                                <tr>

                                    
                                    <th className='uppercase'>Email</th>
                                    <th className='uppercase'>join date</th>
                                    <th className='uppercase'>role</th>
                                    
                                </tr>
                            </thead>
                            <tbody className=''>


                                {users &&
                                    users?.map(user => <tr key={user._id} className="hover:bg-red-50">
                                        <td className='font-bold'>{user.email}</td>
                                        <td className='font-bold'>{user.joinDate}</td>
                                        <td className='font-bold'>{user.role}</td>
                                    </tr>)
                                }



                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;