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
    // console.log(searchValue);
  
    if (searchValue) {
      const searchResults = sales?.filter(product => {
        return parseInt(product.reference) === parseInt(searchValue);
      });
      // console.log(searchResults);
  
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

  return { handleKeyUp, newProducts, setNewProducts, noResult, handleKeyUpCode, newSales, setNewSales };
};

export default useSearch;

