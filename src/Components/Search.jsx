import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FallingLines } from 'react-loader-spinner';
import useProducts from '../hooks/useProducts';
import { TiDelete } from "react-icons/ti";
import useSearch from '../hooks/UseSearch';

const Search = ({ handleKeyUp, searchInputRef, handleSelect, placeholder }) => {
    const { products, isLoading, error, refetch } = useProducts()
    const [inputValue, setInputValue] = useState("");
    const { deleteInput } = useSearch()
    useEffect(() => {
        const handleKeyPress = (event) => {
            // Check if Ctrl (or Command on Mac) + K is pressed
            if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
                // Prevent the default behavior of the key combination
                event.preventDefault();

                // Focus on the search input
                searchInputRef.current.focus();
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const clearInput = () => {
        setInputValue("");
        searchInputRef.current.focus();
    };
    const doNothing = () => {

    }
    return (
        <div>
            <div className="">

                <div className="join border-0 w-full  rounded-none">
                    <div className=" flex relative w-full ">

                        {
                            isLoading ? <div className=" h-full text-xl ">
                                <span className="loading loading-spinner loading-xl absolute text-red-400 h-full inset-y-0 left-0  ms-3"></span>
                            </div> : <FaSearch className='h-full text-xl absolute  inset-y-0 left-0  ms-3' />
                        }
                        <input value={inputValue} onChange={handleInputChange} onSelect={handleSelect ? handleSelect : () => doNothing()} type="text" onKeyUp={handleKeyUp} ref={searchInputRef} className="w-full input  input-bordered border-red-300 focus:outline-none focus:bg-red-100 focus:bg-opacity-40 join-item bg-transparent ps-10" placeholder={placeholder} />
                        <div className="pe-8  hidden  absolute lg:flex  items-center gap-1 inset-y-0 right-0  text-xs opacity-30 mx-2">
                            <kbd className="kbd">ctrl</kbd>
                            <p>+</p>
                            <kbd className="kbd">k</kbd>

                        </div>
                        {
                            inputValue && <div onClick={() => {
                                clearInput();
                                deleteInput();
                            }} className=" hidden  absolute lg:flex  items-center gap-1 inset-y-0 right-0  text-xs  mx-2">
                                < TiDelete className='text-2xl text-red-400 hover:text-black p-0 m-0' />

                            </div>
                        }
                    </div>


                </div>
            </div>


        </div>
    );
};

export default Search;