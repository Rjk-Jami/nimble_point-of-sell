import React, { useEffect, useRef } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = ({ handleSearch, searchInputRef }) => {

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
                        <input type="text" ref={searchInputRef} className="w-full input  input-bordered border-red-300 focus:outline-none focus:bg-red-100 focus:bg-opacity-40 join-item bg-transparent " placeholder="Search With Code" />
                        <div className="  hidden  absolute lg:flex items-center gap-1 inset-y-0 right-0  text-xs opacity-40 mx-2">
                            <kbd className="kbd">ctrl</kbd>
                            <p>+</p>
                            <kbd className="kbd">k</kbd>
                        </div>
                    </div>
                    <button onClick={handleSearch} className="btn join-item btn-outline hover:bg-red-400 hover:border-red-300 border-red-300"><FaSearch />
                    </button>

                </div>
            </div>


        </div>
    );
};

export default Search;