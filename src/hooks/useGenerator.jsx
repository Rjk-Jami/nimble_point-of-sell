import React, { useState } from 'react';
import { useEffect } from "react";


const useGenerator = () => {
    const [productCode, setProductCode] = useState('');

useEffect(()=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) { // Adjust the length of the random string as needed
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

    setProductCode(result);
},[])

    return {productCode}
};

export default useGenerator;