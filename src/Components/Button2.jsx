import React, { useRef } from 'react';

const Button2 = ({ children, className, type}) => {
    // button without nav
  return (
    <div>
      <button type={type} className={`px-5 py-2.5 relative rounded group overflow-hidden font-medium border-2 border-red-300 text-gray-600  inline-block ${className}`}>
        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0  bg-red-400 group-hover:h-full opacity-90"></span>
        {children}
      </button>
    </div>
  );
};

export default Button2;
