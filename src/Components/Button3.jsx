import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Button3 = ({ children, handleFunction, className }) => {
    // button3 with nav
    return (
        <div onClick={()=>handleFunction()} className={`px-5 py-2.5 relative rounded group overflow-hidden font-medium border-2 border-red-300  text-gray-600 hover:text-white inline-block ${className}`}>
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0  bg-red-400 group-hover:h-full opacity-90"></span>
            {children}
        </div>
    );
};

export default Button3;
