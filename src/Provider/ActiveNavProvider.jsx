import React, { createContext, useState } from 'react';
export const NavContext = createContext(null)

const ActiveNavProvider = ({children}) => {
    const [nav, setNav] =useState('')
    const navInfo ={
        nav, setNav
    } 
    return (
        <NavContext.Provider value={navInfo}>
            {children}
        </NavContext.Provider>
    );
};

export default ActiveNavProvider;