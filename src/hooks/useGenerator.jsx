import React, { useState } from 'react';
import { useEffect } from "react";


const useGenerator = (updateDependency) => {
    const [productCode, setProductCode] = useState('');
    const [reference, setReference] = useState('');

useEffect(()=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) { // Adjust the length of the random string as needed
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

    setProductCode(result);

    let randomReference = Math.floor(Math.random() * 1000000)
    setReference(randomReference)

},[updateDependency])

    return {productCode,reference}
};

export default useGenerator;