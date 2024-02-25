import { useState, useRef } from 'react';
import axios from 'axios';
import useProducts from './useProducts';
import useSales from './useSales';

const useSearch = () => {
  const { products, isLoading, error, refetch } = useProducts()
  const [newProducts, setNewProducts] = useState([])
  const [noResult, setNoResult] = useState("")
  const { sales } = useSales()
  const [newSales, setNewSales] = useState([])
  const [inputLoad, setInputLoad] = useState(false)

  const handleKeyUp = (event) => {
    if (event?.target?.value) {
      const searchResults = products.filter(product => product.name.toLowerCase().includes(event?.target?.value.toLowerCase()))
      // console.log(searchResults)
      if (searchResults.length !== 0) {
        setNewProducts(searchResults)
        setNoResult("")
      }
      else {
        setNoResult("No Data Found!")
        setNewProducts([])
      }
    }
    else {
      setNewProducts(products)
    }
  }
  const handleKeyUpCode = (event) => {
    const searchValue = event?.target?.value;
    
    if (searchValue) {
      const searchResults = sales.filter(product => {
        // Ensure that the reference property is a string before calling toLowerCase
        const referenceAsString = String(product.reference);
        return referenceAsString.toLowerCase().includes(searchValue.toLowerCase());
      });
  
      if (searchResults.length !== 0) {
        setNewSales(searchResults);
        setNoResult("");
      } else {
        setNoResult("No Data Found!");
        setNewSales([]);
      }
    } else {
      setNewSales(sales);
    }
  }
  const handleKeyUpCodeExpense = (event) => {
    const searchValue = event?.target?.value;
    
    if (searchValue) {
      const searchResults = products.filter(product => {
        // Ensure that the reference property is a string before calling toLowerCase
        const referenceAsString = String(product.code);
        return referenceAsString.toLowerCase().includes(searchValue.toLowerCase());
      });
  
      if (searchResults.length !== 0) {
        setNewSales(searchResults);
        setNoResult("");
      } else {
        setNoResult("No Data Found!");
        setNewSales([]);
      }
    } else {
      setNewSales(products);
    }
  }

  const deleteInput=()=>{
    setInputLoad(!inputLoad)
    setNewSales(products)
    setNewSales(sales)
  }

  return { handleKeyUp, newProducts, setNewProducts, noResult, handleKeyUpCode, newSales, setNewSales,handleKeyUpCodeExpense ,deleteInput, inputLoad};
};

export default useSearch;

