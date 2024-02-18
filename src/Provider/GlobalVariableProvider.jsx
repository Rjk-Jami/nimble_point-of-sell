import React, { createContext, useState } from 'react';
export const GlobalVariableContext = createContext(null)
const GlobalVariableProvider = ({children}) => {
    const [imageUrl, setImageUrl] = useState(' ')
    
    
    
    const variableInfo = {
        imageUrl, setImageUrl
    }
    return (
        <GlobalVariableContext.Provider value={variableInfo}>
            {children}
        </GlobalVariableContext.Provider>
    );
};

export default GlobalVariableProvider;