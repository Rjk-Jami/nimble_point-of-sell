import React, { useEffect, useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import { FallingLines } from 'react-loader-spinner';
import useProducts from '../hooks/useProducts';

const Search = ({ handleKeyUp, searchInputRef }) => {
    const { products, isLoading, error,refetch } = useProducts()

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
                        <input type="text"  onKeyUp={handleKeyUp} ref={searchInputRef} className="w-full input  input-bordered border-red-300 focus:outline-none focus:bg-red-100 focus:bg-opacity-40 join-item bg-transparent ps-10" placeholder="Search With Code" />
                        <div className="  hidden  absolute lg:flex  items-center gap-1 inset-y-0 right-0  text-xs opacity-40 mx-2">
                            <kbd className="kbd">ctrl</kbd>
                            <p>+</p>
                            <kbd className="kbd">k</kbd>
                            
                        </div>
                    </div>
                    

                </div>
            </div>


        </div>
    );
};

export default Search;